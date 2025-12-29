import { BsStarFill, BsTelephone, BsCalendar, BsGeoAlt, BsCheckCircle } from 'react-icons/bs';
//import { suggestedWorkers } from './SelectWorkerTab';

export const ConfirmationTab = ({ data }) => {
  const worker = data.selectedWorker || { id: 1, name: 'John Silva', rating: 4.9, reviews: 127, specialty: 'Plumbing', phone: '+1 234 567 8901', avatar: 'https://placehold.co/100x100/E2E8F0/475569?text=JS&font=sans' };

  return (
    <div>
      <h2 className="mb-6 text-2xl font-semibold text-gray-900">Step 3: Booking Confirmation</h2>
      <div className="space-y-6">
        <div className="p-6 border rounded-lg bg-white">
          <h3 className="font-semibold mb-2">Selected Professional</h3>
          <div className="flex items-center gap-4">
            <img src={worker.avatar} alt={worker.name} className="w-12 h-12 rounded-full" />
            <div>
              <h4 className="font-semibold">{worker.name}</h4>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <BsStarFill className="text-yellow-500" /> {worker.rating} ({worker.reviews})
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500"><BsTelephone /> {worker.phone}</div>
            </div>
          </div>
        </div>

        <div className="p-6 border rounded-lg bg-white">
          <h3 className="font-semibold mb-2">Work Details</h3>
          <p><strong>Type:</strong> {data.workType}</p>
          <p><strong>Description:</strong> {data.description}</p>
        </div>

        <div className="p-6 border rounded-lg bg-white">
          <h3 className="font-semibold mb-2">Schedule & Location</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2"><BsCalendar /> {data.startDate}</li>
            <li className="flex items-center gap-2"><BsGeoAlt /> {data.location}</li>
          </ul>
        </div>

        <div className="p-6 border rounded-lg bg-blue-50">
          <h3 className="font-semibold mb-2 text-blue-800">Important Notes</h3>
          <ul className="space-y-1 text-blue-700">
            <li className="flex items-start gap-2"><BsCheckCircle /> Worker will call within 24 hours to finalize details.</li>
            <li className="flex items-start gap-2"><BsCheckCircle /> Material costs not included in estimate.</li>
            <li className="flex items-start gap-2"><BsCheckCircle /> Deposit may be required to confirm booking.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};