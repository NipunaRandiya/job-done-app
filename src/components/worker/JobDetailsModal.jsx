import { FaTimes, FaMapMarkerAlt, FaClock, FaMoneyBillWave } from "react-icons/fa";

export default function JobDetailsModal({ job, onClose }) {
  if (!job) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-xl p-6 relative max-h-[90vh] overflow-y-auto">

        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <FaTimes size={22} />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 capitalize">
          {job.workType.replace("-", " ")}
        </h2>

        <p className="text-gray-700 mt-2">{job.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <Info label="Location" value={job.workplaceLocation} icon={<FaMapMarkerAlt />} />
          <Info label="Status" value={job.status} />
          <Info
            label="Starting Date"
            value={new Date(job.startingDate).toLocaleDateString()}
          />
          <Info
            label="Completion Date"
            value={new Date(job.completionDate).toLocaleDateString()}
          />
          <Info
            label="Working Hours"
            value={`${job.totalWorkingHours} hrs`}
            icon={<FaClock />}
          />
          <Info label="Payment Method" value={job.paymentMethod} icon={<FaMoneyBillWave />} />
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">Cost Breakdown</h3>
          <div className="space-y-2">
            {job.costBreakdown?.map((item, index) => (
              <div
                key={index}
                className="flex justify-between bg-gray-100 p-3 rounded-md border border-gray-200"
              >
                <span className="capitalize">{item.item}</span>
                <span>LKR {item.cost}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Materials Required</h3>
          <ul className="list-disc pl-6 text-gray-700">
            {job.materialList?.map((mat, index) => (
              <li key={index}>
                {mat.name} — {mat.quantity} {mat.unit}
              </li>
            ))}
          </ul>
        </div>

        {job.note && (
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
            <p className="text-gray-700">
              <span className="font-semibold">Note:</span> {job.note}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function Info({ label, value, icon }) {
  return (
    <div className="bg-gray-100 p-3 rounded-md border border-gray-200">
      <p className="text-xs uppercase text-gray-500 flex items-center">
        {icon && <span className="mr-2">{icon}</span>}
        {label}
      </p>
      <p className="mt-1 font-medium text-gray-800">{value}</p>
    </div>
  );
}
