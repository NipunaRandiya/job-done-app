import { useEffect, useState } from "react";
import { 
  HiOutlineEye, HiOutlineXMark, HiOutlineCheckCircle, 
  HiOutlineXCircle, HiChevronLeft, HiChevronRight, 
  HiOutlineCloudArrowUp, HiOutlineIdentification, HiOutlineEnvelope, HiOutlineDevicePhoneMobile 
} from "react-icons/hi2";
import { io } from "socket.io-client";
import { fetchPendingWorkers, approveWorker, rejectWorker } from "../../services/adminApi";

const socket = io(import.meta.env.VITE_API_BASE_URL);

export default function WorkerVerification() {
  const [workers, setWorkers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [toast, setToast] = useState(null);
  const workersPerPage = 6;

  useEffect(() => {
    const loadWorkers = async () => {
      try {
        const { data } = await fetchPendingWorkers();
        setWorkers(data);
      } catch (err) { console.error("Load Error", err); }
    };
    loadWorkers();

    socket.on('new-worker-application', (newWorker) => {
      setWorkers((prev) => [newWorker, ...prev]);
      setToast({ message: "New Entry Received", email: newWorker.email, type: 'info' });
      setTimeout(() => setToast(null), 4000);
    });

    return () => socket.off('new-worker-application');
  }, []);

  const indexOfLastWorker = currentPage * workersPerPage;
  const indexOfFirstWorker = indexOfLastWorker - workersPerPage;
  const currentWorkers = workers.slice(indexOfFirstWorker, indexOfLastWorker);
  const totalPages = Math.ceil(workers.length / workersPerPage);

  const handleAction = async (worker, type) => {
    try {
      if (type === 'approve') await approveWorker(worker._id);
      else await rejectWorker(worker._id);

      setWorkers(workers.filter(w => w._id !== worker._id));
      setToast({ message: type === 'approve' ? 'Credentials Verified' : 'Application Terminated', email: worker.email, type });
      setSelectedWorker(null);
      setTimeout(() => setToast(null), 3000);
    } catch (err) { console.error("Action Error", err); }
  };

  return (
    <div className="p-10 bg-[#F8FAFC] min-h-screen relative">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">Compliance</h1>
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] mt-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
            Vetting Queue: {workers.length} Pending
          </p>
        </div>
        <div className="bg-slate-900 text-white px-6 py-3 rounded-2xl flex items-center gap-4 shadow-xl shadow-slate-200">
           <HiOutlineCloudArrowUp className="text-blue-400" size={20} />
           <span className="text-[10px] font-black uppercase tracking-widest">Live Sync Active</span>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-slate-200/60 border border-slate-50">
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-y-4">
            <thead>
              <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                <th className="px-6 pb-2 text-left">Professional</th>
                <th className="px-6 pb-2 text-left">Specialization</th>
                <th className="px-6 pb-2 text-left">Submission Date</th>
                <th className="px-6 pb-2 text-left">Verification Status</th>
                <th className="px-6 pb-2 text-right">Review</th>
              </tr>
            </thead>
            <tbody>
              {currentWorkers.map((w) => (
                <tr key={w._id} className="group">
                  <td className="bg-slate-50 group-hover:bg-blue-50/50 rounded-l-[1.5rem] px-6 py-6 transition-colors">
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-slate-900">{w.name}</span>
                      <span className="text-[10px] font-bold text-slate-400 lowercase">{w.email}</span>
                    </div>
                  </td>
                  <td className="bg-slate-50 group-hover:bg-blue-50/50 px-6 py-6 transition-colors">
                    <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-lg uppercase tracking-widest">
                      {w.category}
                    </span>
                  </td>
                  <td className="bg-slate-50 group-hover:bg-blue-50/50 px-6 py-6 transition-colors">
                    <span className="text-xs font-bold text-slate-500">{w.submittedDate}</span>
                  </td>
                  <td className="bg-slate-50 group-hover:bg-blue-50/50 px-6 py-6 transition-colors">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-amber-400" />
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Awaiting Vetting</span>
                    </div>
                  </td>
                  <td className="bg-slate-50 group-hover:bg-blue-50/50 rounded-r-[1.5rem] px-6 py-6 text-right transition-colors">
                    <button 
                      onClick={() => setSelectedWorker(w)}
                      className="p-3 bg-white text-slate-900 rounded-xl shadow-sm border border-slate-100 hover:bg-slate-900 hover:text-white transition-all active:scale-90"
                    >
                      <HiOutlineEye size={18} strokeWidth={2.5} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-8 px-2">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex gap-2">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="p-3 rounded-xl border-2 border-slate-50 disabled:opacity-30 hover:bg-slate-50 transition-all"
            >
              <HiChevronLeft size={18} strokeWidth={3} />
            </button>
            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="p-3 rounded-xl border-2 border-slate-50 disabled:opacity-30 hover:bg-slate-50 transition-all"
            >
              <HiChevronRight size={18} strokeWidth={3} />
            </button>
          </div>
        </div>
      </div>

      {selectedWorker && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[150] p-4">
          <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-10">
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Vetting Profile</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-1">Ref ID: {selectedWorker._id.slice(-8).toUpperCase()}</p>
                </div>
                <button onClick={() => setSelectedWorker(null)} className="p-3 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-full transition-colors">
                  <HiOutlineXMark size={20} strokeWidth={2.5} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="bg-slate-50 p-5 rounded-[2rem] border border-slate-100">
                  <div className="flex items-center gap-3 mb-4">
                    <HiOutlineIdentification className="text-blue-600" size={20} />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Identity</span>
                  </div>
                  <p className="text-sm font-black text-slate-900">{selectedWorker.name}</p>
                </div>
                <div className="bg-slate-50 p-5 rounded-[2rem] border border-slate-100">
                  <div className="flex items-center gap-3 mb-4">
                    <HiOutlineDevicePhoneMobile className="text-blue-600" size={20} />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact Hash</span>
                  </div>
                  <p className="text-sm font-black text-slate-900">{selectedWorker.phone || "+94 71 234 5678"}</p>
                </div>
              </div>

              <div className="mb-10">
                <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em] mb-6">Credential Evidence</h4>
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="aspect-square bg-slate-50 rounded-[1.5rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center group hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer">
                      <HiOutlineEye className="text-slate-300 group-hover:text-blue-500 transition-colors" size={24} />
                      <span className="text-[8px] font-black text-slate-400 group-hover:text-blue-600 uppercase mt-2">View Doc 0{i}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => handleAction(selectedWorker, 'reject')}
                  className="flex-1 bg-white border-2 border-slate-100 text-slate-400 hover:text-red-500 hover:border-red-100 hover:bg-red-50 py-5 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] transition-all"
                >
                  Reject Entry
                </button>
                <button 
                  onClick={() => handleAction(selectedWorker, 'approve')}
                  className="flex-1 bg-slate-900 text-white hover:bg-blue-600 py-5 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-3"
                >
                  <HiOutlineCheckCircle size={18} strokeWidth={2.5} /> Verify & onboard
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className={`fixed bottom-10 right-10 bg-slate-900 text-white shadow-2xl rounded-[2rem] p-8 border border-white/10 w-96 animate-in slide-in-from-right-10 duration-500 z-[200]`}>
           <div className="flex items-start gap-5">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${toast.type === 'approve' ? 'bg-emerald-500' : 'bg-red-500'}`}>
              <HiOutlineCheckCircle className="text-white text-xl" />
            </div>
            <div>
              <h4 className="font-black text-sm uppercase tracking-widest mb-1">{toast.message}</h4>
              <p className="text-slate-400 text-xs font-bold leading-relaxed">System dispatch sent to {toast.email}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}