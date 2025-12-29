import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaStar, FaRegStar } from "react-icons/fa";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function ProfileManagement() {

  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const res = await axios.get(`${apiBaseUrl}/workers/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDashboardData(res.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchData();
  }, []);

  if (!dashboardData) {
    return (
      <div className="flex-1 p-8 bg-gray-50/50">
        <p className="text-center text-gray-500">Loading...</p>
      </div>
    );
  }

  const {
    name,
    category,
    email,
    telephone,
    address,
    memberSince,
    profileImage,
    rating,
    totalReviews,
    ratingBreakdown
  } = dashboardData;

  return (
    <div className="flex-1 p-8 bg-gray-50/50">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Profile Management</h1>
        <p className="text-gray-500 mt-1">Update your professional profile and grow your business.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left: Personal Information */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Personal Information</h2>
          <p className="text-sm text-gray-500">Your basic details and contact information</p>

          <div className="mt-6 flex items-center space-x-6">
            <div className="relative">
              <img
                src={profileImage || "https://placehold.co/128x128/E2E8F0/4A5568?text=U"}
                alt="Profile"
                className="w-32 h-32 rounded-full"
              />
            </div>

            <div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors">
                Change Photo
              </button>
              <p className="text-xs text-gray-400 mt-2">JPG, PNG or GIF. Max 2MB</p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <label className="block text-gray-500 font-medium">Full Name</label>
              <p className="text-gray-800 mt-1">{name}</p>
            </div>

            <div>
              <label className="block text-gray-500 font-medium">Category</label>
              <p className="text-blue-600 font-semibold mt-1">{category}</p>
            </div>

            <div>
              <label className="block text-gray-500 font-medium">Email Address</label>
              <p className="text-gray-800 mt-1">{email}</p>
            </div>

            <div>
              <label className="block text-gray-500 font-medium">Phone Number</label>
              <p className="text-gray-800 mt-1">{telephone}</p>
            </div>

            <div>
              <label className="block text-gray-500 font-medium">Location</label>
              <p className="text-gray-800 mt-1">{address}</p>
            </div>

            <div>
              <label className="block text-gray-500 font-medium">Member Since</label>
              <p className="text-gray-800 mt-1">
                {new Date(memberSince).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-6">
            <button className="bg-blue-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Right: Rating */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Rating & Reviews</h2>

            <div className="text-center my-6">
              <p className="text-6xl font-bold text-gray-800">{rating}</p>

              <div className="flex justify-center mt-2">
                {[...Array(5)].map((_, i) =>
                  i < rating ? (
                    <FaStar key={i} className="w-6 h-6 text-yellow-400" />
                  ) : (
                    <FaRegStar key={i} className="w-6 h-6 text-gray-300" />
                  )
                )}
              </div>

              <p className="text-sm text-gray-500 mt-2">Based on {totalReviews} reviews</p>
            </div>

            {/* Rating Breakdown */}
            <div className="space-y-3 text-sm">
              {[5, 4, 3].map(star => (
                <div key={star} className="flex items-center">
                  <span className="text-gray-500">{star} ★</span>

                  <div className="w-full bg-gray-200 rounded-full h-1.5 mx-3">
                    <div
                      className="bg-blue-500 h-1.5 rounded-full"
                      style={{ width: `${ratingBreakdown?.[star] || 0}%` }}
                    />
                  </div>

                  <span className="text-gray-500 w-8 text-right">
                    {ratingBreakdown?.[star] || 0}%
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
