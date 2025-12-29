import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsStarFill, BsTelephone } from 'react-icons/bs';

const EstimatedCostDisplay = ({ estimate, isLoading }) => {
    const formatCurrencyLKR = (amount) => {
        if (typeof amount !== 'number' || isNaN(amount)) return 'N/A';
        return `LKR ${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    };

    if (isLoading) {
        return (
            <div className="p-6 bg-white rounded-xl shadow-md border border-blue-200 animate-pulse">
                <p className="text-lg text-blue-600 font-semibold text-center">Calculating estimate...</p>
            </div>
        );
    }

    if (!estimate || estimate.error || !estimate.TotalEstimate) {
        return (
            <div className="p-6 bg-white rounded-xl shadow-md border border-red-200">
                <p className="text-lg text-red-600 font-semibold">AI Estimate Unavailable</p>
                <p className="text-sm text-gray-500">Could not generate a cost breakdown based on the work details.</p>
            </div>
        );
    }

    return (
        <div className="p-6 bg-white rounded-xl shadow-xl mb-8">
            <div className="flex justify-between items-start mb-4 border-b pb-4">
                <h3 className="text-xl font-bold text-gray-800">
                    <span className="text-yellow-600 mr-2">⭐</span> AI-Generated Estimate
                </h3>
                <div className="text-right">
                    <p className="text-3xl font-bold text-gray-900">{formatCurrencyLKR(estimate.TotalEstimate)}</p>
                    <p className="text-sm text-gray-500">Estimated total</p>
                </div>
            </div>

            {/* Cost Breakdown */}
            <div className="space-y-3">
                <p className="font-semibold text-gray-700">Cost Breakdown</p>

                {/* Materials */}
                <div className="pl-4">
                    <p className="font-medium text-sm text-gray-600 mb-1">MATERIALS</p>
                    {estimate.MaterialBreakdown.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm py-1">
                            <span className="text-gray-600">• {item.name}</span>
                            <span className="font-medium">
                                {item.cost !== null ? formatCurrencyLKR(item.cost) : "Not calculated yet"}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Labor */}
                <div className="pl-4 pt-4">
                    <p className="font-medium text-sm text-gray-600 mb-1">LABOR</p>
                    <div className="flex justify-between text-sm py-1">
                        <span className="text-gray-600">• Professional Labor ({estimate.LaborHours.toFixed(1)} hours)</span>
                        <span className="font-medium">{formatCurrencyLKR(estimate.LaborCost)}</span>
                    </div>
                </div>

                <div className="flex justify-between text-xl font-bold text-gray-900 border-t-2 pt-4 mt-4">
                    <span>Total Estimate</span>
                    <span>{formatCurrencyLKR(estimate.TotalEstimate)}</span>
                </div>
            </div>
        </div>
    );
};

const initialSuggestedWorkers = [
    { id: 1, name: 'Kasun Perera', rating: 4.9, reviews: 127, specialty: 'Tiling', phone: '+94 77 123 4567', avatar: 'https://placehold.co/100x100/E2E8F0/475569?text=KP&font=sans' },
    { id: 2, name: 'Amal Seneviratne', rating: 4.8, reviews: 98, specialty: 'Tiling', phone: '+94 71 987 6543', avatar: 'https://placehold.co/100x100/E2E8F0/475569?text=AS&font=sans' },
    { id: 3, name: 'Saman Kumara', rating: 4.7, reviews: 85, specialty: 'Plumbing', phone: '+94 70 555 1234', avatar: 'https://placehold.co/100x100/E2E8F0/475569?text=SK&font=sans' },
    { id: 4, name: 'Nimal Bandara', rating: 4.6, reviews: 60, specialty: 'Electrical Wiring', phone: '+94 76 444 7890', avatar: 'https://placehold.co/100x100/E2E8F0/475569?text=NB&font=sans' },
];

export const SelectWorkerTab = ({ data, updateData }) => {
    const [workers, setWorkers] = useState([]);
    const [estimate, setEstimate] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const LABOR_RATE_LKR_PER_HOUR = 2500; // LKR/hour

    const predictionData = {
        Work_Type: data.workType,
        Workload_Score: data.workload,
        Work_Size: data.estimatedQuantity,
        Unit: data.unit,
        Location: data.location,
        Urgency: "Normal"
    };

    useEffect(() => {
        const fetchPredictionAndWorkers = async () => {
            if (!data.workType || !data.workload || !data.estimatedQuantity) {
                setError("Missing required work details from Step 1 for prediction.");
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            setError(null);
            
            try {
                const res = await axios.post('http://127.0.0.1:8000/predict', predictionData, {
                    headers: { 'Content-Type': 'application/json' }
                });

                const totalCostLKR = res.data.estimated_cost_lkr;
                const laborCost = totalCostLKR; // Total = labor only
                const laborHours = laborCost / LABOR_RATE_LKR_PER_HOUR;

                // Materials not calculated yet
                setEstimate({
                    TotalEstimate: laborCost,
                    MaterialSubtotal: null,
                    LaborCost: laborCost,
                    LaborHours: laborHours,
                    MaterialBreakdown: [{ name: "Materials (Not calculated yet)", cost: null }],
                });

                const requiredSpecialty = data.workType.split(' ')[0];
                const filteredWorkers = initialSuggestedWorkers.filter(
                    worker => worker.specialty.includes(requiredSpecialty)
                );
                setWorkers(filteredWorkers);
                
            } catch (err) {
                console.error("Error fetching prediction or workers:", err);
                setError("Failed to fetch estimate and worker list from the server.");
                setEstimate({ error: true });
            } finally {
                setIsLoading(false);
            }
        };

        fetchPredictionAndWorkers();
    }, [data.workType, data.workload, data.estimatedQuantity, data.unit, data.location]);

    const handleSelectWorker = (worker) => {
        updateData('selectedWorker', worker);
    };

    return (
        <div>
            <h2 className="mb-6 text-2xl font-semibold text-gray-900">Step 2: Select Worker</h2>
            
            <EstimatedCostDisplay estimate={estimate} isLoading={isLoading} />
            
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Available Professionals ({workers.length}) - Specialty: {data.workType || 'Loading...'}
            </h3>

            {error && <div className="text-red-500 p-4 border border-red-300 rounded">Error: {error}</div>}
            {isLoading && !estimate && <p className="text-center text-gray-500">Loading worker list...</p>}

            {!isLoading && workers.length > 0 ? (
                <div className="space-y-4">
                    {workers.map(worker => (
                        <div 
                            key={worker.id} 
                            onClick={() => handleSelectWorker(worker)} 
                            className={`flex justify-between items-center p-4 border rounded-lg cursor-pointer transition duration-150 ${data.selectedWorker?.id === worker.id ? 'border-blue-500 bg-blue-50 shadow-md' : 'hover:border-gray-300 hover:shadow-sm'}`}
                        >
                            <div className="flex items-center gap-4">
                                <img src={worker.avatar} alt={worker.name} className="w-12 h-12 rounded-full object-cover" />
                                <div>
                                    <h4 className="font-semibold">{worker.name}</h4>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <BsStarFill className="text-yellow-500" /> {worker.rating} ({worker.reviews})
                                        <span className="px-2 py-0.5 text-xs font-semibold text-indigo-700 bg-indigo-100 rounded">{worker.specialty}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-500"><BsTelephone /> {worker.phone}</div>
                                </div>
                            </div>
                            <button className={`px-4 py-2 rounded-md font-semibold text-sm transition duration-150 ${data.selectedWorker?.id === worker.id ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-white border border-gray-300 hover:bg-gray-50'}`}>
                                {data.selectedWorker?.id === worker.id ? 'Selected' : 'Select'}
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                !isLoading && !error && <p className="text-center p-8 text-gray-600 border rounded-lg">No specialized workers found for {data.workType}.</p>
            )}
        </div>
    );
};
