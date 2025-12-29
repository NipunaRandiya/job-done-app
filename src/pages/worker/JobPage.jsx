import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import JobCard from "../../components/worker/JobCard";
import JobDetailsModal from "../../components/worker/JobDetailsModal";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function JobsPage() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${apiBaseUrl}/workers/jobs`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJobs(res.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="flex-1 p-8 bg-gray-50/50">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Jobs</h1>
        <p className="text-gray-500 mt-1">View your assigned work orders.</p>
      </div>

      {/* Job Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} onClick={() => setSelectedJob(job)} />
        ))}
      </div>

      {/* MODAL */}
      {selectedJob && (
        <JobDetailsModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </div>
  );
}
