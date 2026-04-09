import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsStarFill, BsCheckCircleFill, BsShieldCheck } from 'react-icons/bs';

export const SelectWorkerTab = ({ data, updateData }) => {
    const [workers, setWorkers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const getWorkerId = (w) => {
        if (!w) return null;
        const id = w._id || w.id;
        return id ? String(id) : null; 
    };

    const selectedId = getWorkerId(data.selectedWorker);

    useEffect(() => {
        const fetchRecommendations = async () => {
            if (!data.latLng || !data.workType) {
                setError("Location coordinates or work type missing from Step 1.");
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            setError(null);
            
            try {
                const workerRes = await axios.get('http://localhost:5000/api/users/recommend', {
                    params: {
                        lat: data.latLng.lat,
                        lng: data.latLng.lng,
                        type: data.workType
                    }
                });
                setWorkers(workerRes.data);
            } catch (err) {
                console.error("Worker Recommendation Error:", err);
                setError("We couldn't find any professionals in your immediate area.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecommendations();
    }, [data.workType, data.latLng]);

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="relative overflow-hidden bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/20 blur-[80px] rounded-full" />
                <div className="relative z-10">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-2">Service Estimate</p>
                            <h3 className="text-3xl font-black tracking-tight">
                                LKR {Number(data.estimated_cost_lkr).toLocaleString()}
                            </h3>
                            <p className="text-slate-400 text-xs mt-1 font-medium">Based on {data.workType} market rates</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                            <BsShieldCheck className="text-blue-400 text-xl" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between mt-8 px-2">
                <h3 className="text-xl font-black text-slate-900">Recommended for You</h3>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    {workers.length} Pros Nearby
                </span>
            </div>

            {error && (
                <div className="bg-red-50 border-2 border-red-100 p-6 rounded-[2rem] text-center">
                    <p className="text-red-600 font-bold text-sm">{error}</p>
                </div>
            )}

            <div className="grid grid-cols-1 gap-4">
                {isLoading ? (
                    [1, 2, 3].map(i => (
                        <div key={i} className="h-28 bg-slate-100 animate-pulse rounded-[2rem]" />
                    ))
                ) : (
                    workers.map(worker => {
                        const currentId = getWorkerId(worker);
                        const isSelected = selectedId !== null && currentId === selectedId;

                        return (
                            <button
                                key={currentId}
                                type="button"
                                onClick={() => updateData('selectedWorker', worker)}
                                className={`
                                    flex items-center justify-between p-6 border-2 rounded-[2.5rem] transition-all text-left
                                    ${isSelected 
                                        ? 'border-blue-600 bg-blue-50/50 shadow-xl scale-[1.02]' 
                                        : 'border-slate-100 bg-white hover:border-slate-300 hover:shadow-md'}
                                `}
                            >
                                <div className="flex items-center gap-5">
                                    <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center font-black text-white text-2xl shadow-lg transition-colors duration-300 ${isSelected ? 'bg-blue-600' : 'bg-slate-900'}`}>
                                        {worker.name?.charAt(0)}
                                    </div>
                                    
                                    <div>
                                        <h4 className="font-black text-slate-900 text-lg leading-tight">{worker.name}</h4>
                                        <div className="flex items-center gap-3 mt-1 text-[11px] font-bold text-slate-400">
                                            <span className="flex items-center gap-1 text-yellow-500">
                                                <BsStarFill /> {worker.rating || 'New'}
                                            </span>
                                            <span className="w-1 h-1 bg-slate-200 rounded-full" />
                                            <span>{(worker.distanceInMeters / 1000).toFixed(1)} km away</span>
                                        </div>
                                    </div>
                                </div>

                                {isSelected ? (
                                    <div className="bg-blue-600 p-2 rounded-full shadow-lg animate-in zoom-in duration-300">
                                        <BsCheckCircleFill className="text-white" size={20} />
                                    </div>
                                ) : (
                                    <div className="px-5 py-2 rounded-xl bg-slate-50 text-[10px] font-black uppercase text-slate-400 tracking-widest hover:bg-slate-900 hover:text-white transition-all">
                                        Select
                                    </div>
                                )}
                            </button>
                        );
                    })
                )}

                {!isLoading && workers.length === 0 && !error && (
                    <div className="text-center p-12 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No local pros found for this work type</p>
                    </div>
                )}
            </div>
        </div>
    );
};