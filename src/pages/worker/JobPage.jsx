import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiBriefcase, FiFilter } from "react-icons/fi";
import JobCard from "../../components/worker/JobCard";
import JobDetailsModal from "../../components/worker/JobDetailsModal";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function JobsPage() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login"); return; }

    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${apiBaseUrl}/workers/jobs`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJobs(res.data);
      } catch (error) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    };
    fetchJobs();
  }, [navigate]);

  return (
    <div className="flex-1 p-6 lg:p-10 bg-[#f8fafc] min-h-screen font-sans">
      <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Assigned Jobs</h1>
          <p className="text-slate-500 text-sm font-medium mt-1">Manage and track your active work orders.</p>
        </div>
        <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
          <FiFilter size={16} /> Filter
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatSummary label="Total Jobs" count={jobs.length} color="blue" />
        <StatSummary label="Pending" count={jobs.filter(j => j.status === 'pending').length} color="amber" />
        <StatSummary label="Ongoing" count={jobs.filter(j => j.status === 'ongoing').length} color="green" />
        <StatSummary label="Completed" count={jobs.filter(j => j.status === 'completed').length} color="slate" />
      </div>

      {jobs.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} onClick={() => setSelectedJob(job)} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2rem] border border-dashed border-slate-200">
          <FiBriefcase size={40} className="text-slate-200 mb-4" />
          <p className="text-slate-400 font-bold">No jobs assigned yet.</p>
        </div>
      )}

      {selectedJob && (
        <JobDetailsModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </div>
  );
}

function StatSummary({ label, count, color }) {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    amber: "bg-amber-50 text-amber-600",
    green: "bg-emerald-50 text-emerald-600",
    slate: "bg-slate-50 text-slate-600"
  };
  return (
    <div className={`${colors[color]} p-4 rounded-2xl border border-white shadow-sm`}>
      <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">{label}</p>
      <p className="text-xl font-bold mt-1">{count}</p>
    </div>
  );
}