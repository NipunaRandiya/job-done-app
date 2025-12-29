import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

export default function JobCard({ job, onClick }) {
  return (
    <div
      onClick={onClick}
      className="p-5 bg-white shadow rounded-xl cursor-pointer hover:shadow-lg transition border border-gray-200"
    >
      <h2 className="text-xl font-semibold text-gray-800 capitalize">
        {job.workType.replace("-", " ")}
      </h2>

      <p className="text-gray-600 mt-2 line-clamp-2">{job.description}</p>

      <div className="mt-4 space-y-2">

        <div className="flex items-center text-gray-600 text-sm">
          <FaMapMarkerAlt className="mr-2 text-blue-500" />
          {job.workplaceLocation}
        </div>

        <div className="flex items-center text-gray-600 text-sm">
          <FaCalendarAlt className="mr-2 text-green-600" />
          Start: {new Date(job.startingDate).toLocaleDateString()}
        </div>
      </div>

      <span className="inline-block mt-3 px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700 capitalize">
        {job.status}
      </span>
    </div>
  );
}
