import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'; 
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { ProgressBar } from '../../components/customer/ProgressBar';
import { DefineWorkTab } from '../../components/customer/DefineWorkTab';
import { ConfirmationTab } from '../../components/customer/ConfirmationTab';
import { SelectWorkerTab } from '../../components/customer/SelectWorkerTab';
import axios from 'axios';

export default function BookingPage() {
  const [searchParams] = useSearchParams();
  
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
    if (!problemDescription) return;

    setError(null);
    setIsLoading(true);
    
    try {
      const res = await axios.post("http://localhost:5000/api/solve-problem", { problem: problemDescription }, {
        headers: { "Content-Type": "application/json" }
      });

      const data = res.data;

      try {
        const cleaned = data.result
          .replace(/^```json\s*/, '')
          .replace(/\s*```$/, '');

        const parsed = JSON.parse(cleaned);

        setFormData(prev => ({
          ...prev,
          problemId: parsed.problemId || prev.problemId,
          workType: parsed.workType || prev.workType,
          description: parsed.workBreakdown.join(', ') || problemDescription, 
          workload: parsed.workload,        
          unit: parsed.unit,                
          estimatedQuantity: parsed.estimatedQuantity, 
        }));
        
      } catch (err) {
        console.error("Failed to parse result as JSON:", data.result, err);
        setError("Failed to process problem details from server. Please check the API response format.");
      }

    } catch (error) {
      console.error("Error solving problem:", error);
      setError("Error fetching problem details. Please check your network or server endpoint.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (problem) {
      fetchProblemDetails(problem);
    } else {
      // NOTE: This will now only show if there's no 'problem' param.
      // If the API fails to load data (workType, etc.) a different error will show.
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

  const handleConfirmBooking = () => {
    // 💡 Generate the final structured body here before submission
    const finalBookingBody = {
        Work_Type: formData.workType,
        Workload_Score: formData.workload,
        Work_Size: formData.estimatedQuantity,
        Unit: formData.unit,
        Location: formData.location,
        Urgency: "Normal", // Assuming default urgency for now
        StartDate: formData.startDate,
        EndDate: formData.endDate,
        Description: formData.description,
        WorkerId: formData.selectedWorker ? formData.selectedWorker.id : null,
        // Include other fields like discountCode as needed for the backend
    };
    
    // Final booking submission logic here
    alert("Booking Confirmed! Details: " + JSON.stringify(finalBookingBody, null, 2));
    // Replace alert with actual POST request to your booking endpoint
    // try {
    //    await axios.post("http://localhost:5000/api/book-service", finalBookingBody);
    //    // navigate('/confirmation-page');
    // } catch (e) {
    //    alert("Booking failed: " + e.message);
    // }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-2">Book Your Service</h1>
        <p className="mb-6 text-gray-500">Complete the steps below to hire a professional.</p>

        <ProgressBar currentStep={step} />

        {/* Display Loading/Error State */}
        {isLoading && (
          <div className="p-4 text-center text-blue-600 font-semibold">
            Processing your request...
          </div>
        )}
        {error && (
          <div className="p-4 text-center text-red-600 bg-red-100 border border-red-300 rounded-md mb-4">
            ⚠️ {error}
          </div>
        )}
        
        {/* Render Tabs */}
        {!isLoading && !error && (
            <>
              {step === 1 && <DefineWorkTab data={formData} updateData={updateData} />}
              {step === 2 && <SelectWorkerTab data={formData} updateData={updateData} />}
              {step === 3 && <ConfirmationTab data={formData} />}
            </>
        )}

        <div className="flex justify-between mt-10">
          <button 
            onClick={() => setStep(step - 1)} 
            disabled={step === 1 || isLoading} 
            className="flex items-center gap-2 px-5 py-2 rounded-md border font-semibold text-sm hover:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200"
          >
            <BsArrowLeft /> Back
          </button>

          {step < 3 ? (
            <button 
              onClick={handleNextStep} 
              disabled={isLoading || error} // The validation is now inside handleNextStep
              className={`flex items-center gap-2 px-5 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 ${isLoading || error ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              Next <BsArrowRight />
            </button>
          ) : (
            <button 
              onClick={handleConfirmBooking} 
              className="px-5 py-2 rounded-md bg-green-600 text-white font-semibold hover:bg-green-700"
            >
              Confirm Booking
            </button>
          )}
        </div>
      </div>
    </div>
  );
}