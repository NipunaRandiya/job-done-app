// src/pages/CustomerDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const CustomerDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [currentJob, setCurrentJob] = useState(null);
  const [reviewJob, setReviewJob] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [modal, setModal] = useState({ visible: false, title: "", message: "" });

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${apiBaseUrl}/users/profile`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setProfile(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${apiBaseUrl}/users/jobs`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const allJobs = res.data;

        // Current active job: status "scheduled" or "inProgress"
        const activeJob = allJobs.find((j) => j.status === "inProgress" || j.status === "scheduled");
        setCurrentJob(activeJob || null);

        // Job available for review: completed but not reviewed
        const reviewable = allJobs.find((j) => j.status === "completed" && !j.reviewed);
        setReviewJob(reviewable || null);

        // Previous jobs: completed jobs excluding reviewable
        const prevJobs = allJobs.filter((j) => j.status === "completed" );
        setJobs(prevJobs);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
    fetchJobs();
  }, []);

  const handleSubmitReview = async () => {
    if (!rating || !reviewText.trim()) {
      return openModal("Error", "Please provide a star rating and review text.");
    }

    // Mock backend call
    console.log({
      jobId: reviewJob._id,
      rating,
      reviewText,
    });

    openModal(
      "Review Submitted",
      `You rated ${reviewJob.workerId} ${rating} stars. Review saved.`
    );

    setReviewJob(null);
    setRating(0);
    setReviewText("");
  };

  const openModal = (title, message) => setModal({ visible: true, title, message });
  const closeModal = () => setModal({ visible: false, title: "", message: "" });

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-100 font-sans">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome back, {profile?.name || "Loading..."}!
        </h1>
        <p className="text-gray-500">Track your projects and connect with your worker.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Job */}
        <div className="lg:col-span-2">
          {currentJob && (
            <section className="bg-white rounded-xl shadow p-6 mb-6 border-t-4 border-indigo-500">
              <h2 className="text-2xl font-semibold text-indigo-700 mb-5">Current Active Job</h2>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800">{currentJob.workType}</h3>
                <p className="text-sm text-gray-500 italic">{currentJob.description}</p>

                {/* Progress */}
                <div className="grid grid-cols-2 gap-4 text-sm mt-5">
                  <div>
                    <p className="text-gray-500">Worker ID:</p>
                    <p className="font-medium text-gray-700">{currentJob.workerId}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Start Date:</p>
                    <p className="font-medium">{new Date(currentJob.startingDate).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Total Cost:</p>
                    <p className="font-medium text-green-600">LKR {currentJob.estimatedCost}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Status:</p>
                    <p className="font-medium text-blue-600">{currentJob.status}</p>
                  </div>
                </div>

                <button
                  onClick={() => openModal("Quick Message", `Message Worker: ${currentJob.workerId}`)}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg mt-6 transition-shadow"
                >
                  &#9993; Quick Message Worker
                </button>
              </div>
            </section>
          )}

          {/* Review Section */}
          {reviewJob && (
            <section className="bg-white rounded-xl shadow p-6 mb-6 border-t-4 border-amber-500">
              <h2 className="text-2xl font-semibold text-amber-700 mb-4">Leave a Review</h2>
              <p className="text-gray-600 mb-4">
                Your job is complete! Please rate <strong>{reviewJob.workerId}</strong> and write a brief review.
              </p>

              <div className="flex flex-row-reverse justify-end mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <label key={star} className="text-2xl text-gray-300 cursor-pointer hover:text-amber-400">
                    <input
                      type="radio"
                      className="hidden"
                      value={star}
                      checked={rating === star}
                      onChange={() => setRating(star)}
                    />
                    &#9733;
                  </label>
                ))}
              </div>

              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 resize-none"
                rows={4}
                maxLength={600}
                placeholder="Describe your experience with the worker..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />

              <button
                onClick={handleSubmitReview}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-2.5 rounded-lg mt-4 transition-colors"
              >
                Submit Review
              </button>
            </section>
          )}
        </div>

        {/* Previous Jobs */}
        <div className="lg:col-span-1">
          <section className="bg-white rounded-xl shadow p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Previous Jobs</h2>
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {jobs.map((job) => (
                <div key={job._id} className="bg-white rounded-xl shadow p-4 flex justify-between hover:bg-gray-50">
                  <div>
                    <p className="font-medium text-gray-800">{job.workType}</p>
                    <p className="text-xs text-gray-500">
                      Worker: {job.workerId} &bull; Completed: {new Date(job.completionDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-sm text-gray-700">LKR {job.estimatedCost}</span>
                    {job.reviewed ? (
                      <span className="text-xs text-green-600 ml-2">(Reviewed)</span>
                    ) : job.isReviewable ? (
                      <button
                        onClick={() => setReviewJob(job)}
                        className="text-xs text-amber-600 ml-2 font-semibold hover:underline"
                      >
                        Leave Review
                      </button>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Modal */}
      {modal.visible && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm">
            <h3 className="text-xl font-bold mb-4">{modal.title}</h3>
            <p className="mb-6">{modal.message}</p>
            <div className="flex justify-end">
              <button onClick={closeModal} className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg">
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerDashboard;
