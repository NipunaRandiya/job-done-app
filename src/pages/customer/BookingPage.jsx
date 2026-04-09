import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'; 
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { ProgressBar } from '../../components/customer/ProgressBar';
import { DefineWorkTab } from '../../components/customer/DefineWorkTab';
import { ConfirmationTab } from '../../components/customer/ConfirmationTab';
import { SelectWorkerTab } from '../../components/customer/SelectWorkerTab';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function BookingPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const problem = searchParams.get('problem');

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); 

  const [formData, setFormData] = useState({
    problemId: null, 
    workType: '', 
    description: '', 
    location: '', 
    startDate: '', 
    endDate: '', 
    workload: null, 
    unit: '',
    estimatedQuantity: null,
    selectedWorker: null,
    discountCode: ''
  });

  const updateData = (key, value) => setFormData(prev => ({ ...prev, [key]: value }));

  const fetchProblemDetails = async (problemDescription) => {
      setIsLoading(true);
      try {
          const res = await axios.post("http://localhost:5000/api/solve-problem", { 
              problem: problemDescription 
          });
          
          const data = res.data;

          setFormData(prev => ({
              ...prev,
              workType: data.workType,
              description: data.workBreakdown 
              ? data.workBreakdown.map(item => item.task).join(', ') 
              : problemDescription,
              workload: data.workload, 
              unit: data.unit,
              estimatedQuantity: data.estimatedQuantity,
              estimated_cost_lkr: data.estimated_cost_lkr, 
          }));
      } catch (error) {
          setError("AI Service currently unavailable.");
      } finally {
          setIsLoading(false);
      }
  };

  useEffect(() => {
    if (problem) {
      fetchProblemDetails(problem);
    } else {
      setError("Error: No initial problem description found."); 
    }
  }, [problem]); 


  const handleNextStep = () => {
    const isStep1Valid = formData.workType && 
                         formData.description && 
                         formData.location && 
                         formData.startDate &&
                         formData.endDate; 

    if (step === 1) {
      if (isLoading) {
        alert("Please wait while problem details are loaded.");
        return;
      }
      
      if (!isStep1Valid) {
        alert("Please fill out all required fields (Work Type, Description, Location, Start Date, End Date) before proceeding.");
        return;
      }
    }

    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleConfirmBooking = async () => {
    const finalBookingBody = {
        workType: formData.workType,
        totalWorkingHours: formData.workload,
        paymentMethod: "cash", 
        Unit: formData.unit,
        Location: formData.location,
        Urgency: "Normal", 
        StartDate: formData.startDate,
        completionDate: formData.endDate,
        Description: formData.description,
        workerId: formData.selectedWorker ? formData.selectedWorker._id : null,
        estimatedCost: formData.estimated_cost_lkr,
    };
    
    try {
        setIsLoading(true);
        const response = await axios.post("http://localhost:5000/api/work-orders/create", finalBookingBody);
        
        if (response.status === 201) {
            navigate("/client-register", { 
                state: { 
                    pendingOrderId: response.data._id,
                    message: "Booking submitted! Register to track your professional." 
                } 
            });
        }
    } catch (err) {
        setError(err.response?.data?.message || "Failed to create work order. Please try again.");
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-3">Book Your Service</h1>
          <p className="text-slate-500 font-medium uppercase text-[10px] tracking-[0.3em]">Complete the steps to hire a professional</p>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-100/50 border border-slate-50 overflow-hidden">
          <div className="p-8 md:p-12">
            <ProgressBar currentStep={step} />

            {isLoading && (
              <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                <p className="text-xs font-black uppercase tracking-widest text-blue-600">Processing AI Insights...</p>
              </div>
            )}

            {error && (
              <div className="p-6 rounded-3xl bg-red-50 border border-red-100 text-red-600 text-center mb-8">
                <p className="text-xs font-black uppercase tracking-widest leading-loose">⚠️ {error}</p>
              </div>
            )}
            
            {!isLoading && !error && (
              <div className="mt-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {step === 1 && <DefineWorkTab data={formData} updateData={updateData} />}
                {step === 2 && <SelectWorkerTab data={formData} updateData={updateData} />}
                {step === 3 && <ConfirmationTab data={formData} />}
              </div>
            )}

            <div className="flex justify-between mt-16 pt-8 border-t border-slate-50">
              <button 
                onClick={() => setStep(step - 1)} 
                disabled={step === 1 || isLoading} 
                className="flex items-center gap-2 px-8 py-4 rounded-2xl border border-slate-200 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 hover:bg-slate-50 disabled:opacity-30 transition-all"
              >
                <BsArrowLeft strokeWidth={1} /> Back
              </button>

              {step < 3 ? (
                <button 
                  onClick={handleNextStep} 
                  disabled={isLoading || error}
                  className="flex items-center gap-3 px-10 py-4 rounded-2xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-slate-200 hover:bg-blue-600 transition-all active:scale-95"
                >
                  Next Step <BsArrowRight strokeWidth={1} />
                </button>
              ) : (
                <button 
                  onClick={handleConfirmBooking} 
                  className="px-10 py-4 rounded-2xl bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95"
                >
                  Confirm Booking
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}