import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { getCustomerProfile, getCustomerJobs, getNotifications, verifyManualPayment } from "../../services/customerApi";
import ProfileCard from "../../components/customer/ProfileCard";
import CurrentJobCard from "../../components/customer/CurrentJobCard";
import PreviousJobsTable from "../../components/customer/PreviousJobsTable";
import NotificationsPanel from "../../components/customer/NotificationsPanel";


const CustomerDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [currentJob, setCurrentJob] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const location = useLocation();

  const fetchData = async () => {
    try {
      const [pRes, jRes, nRes] = await Promise.all([
        getCustomerProfile(),
        getCustomerJobs(),
        getNotifications()
      ]);
      setProfile(pRes.data);
      setCurrentJob(jRes.data.find(j => j.status === "inProgress"));
      setJobs(jRes.data.filter(j => j.status === "completed"));
      setNotifications(nRes.data);
    } catch (err) {
      console.error("Sync error:", err);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    
    if (params.get("payment") === "success") {
      const savedJobId = localStorage.getItem("pending_payment_jobId");
      if (savedJobId) {
        verifyManualPayment(savedJobId)
          .then(() => {
            localStorage.removeItem("pending_payment_jobId");
            window.history.replaceState({}, document.title, "/dashboard");
            fetchData();
          })
          .catch(err => console.error("Verification failed:", err));
      }
    } else {
      fetchData();
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
        
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter">
              Dashboard
            </h1>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] mt-2">
              Welcome back, {profile?.name?.split(' ')[0] || "Client"}
            </p>
          </div>
          <div className="hidden md:block">
            <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-4 py-2 rounded-full uppercase tracking-widest border border-blue-100">
              System Status: Operational
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          
          <div className="xl:col-span-3 space-y-8">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-4 h-full">
                <ProfileCard profile={profile} />
              </div>
              <div className="lg:col-span-8 h-full">
                <CurrentJobCard job={currentJob} />
              </div>
            </div>

            <div className="w-full">
              <PreviousJobsTable jobs={jobs} />
            </div>
          </div>

          <div className="xl:col-span-1 h-full">
            <div className="sticky top-10">
              <NotificationsPanel notifications={notifications} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;