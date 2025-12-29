import { BsGeoAlt } from 'react-icons/bs';

const API_WORK_TYPES = [
    'Plumbing', 
    'Electrical Wiring', 
    'Tiling', 
    'Painting', 
    'Building / Masonry', 
    'Roofing'
];

export const DefineWorkTab = ({ data, updateData }) => {
  const handleChange = (e) => updateData(e.target.name, e.target.value);

  return (
    <div>
      <h2 className="mb-6 text-2xl font-semibold text-gray-900">Step 1: Define Your Work & Location</h2>
      <form className="space-y-5">
        
        <div>
          <label htmlFor="workType" className="block mb-1 text-sm font-medium text-gray-700">Work Type *</label>
          <select 
            id="workType" 
            name="workType" 
            value={data.workType} 
            onChange={handleChange} 
            className="block w-full p-3 bg-white border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select work type</option>
            {API_WORK_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="description" className="block mb-1 text-sm font-medium text-gray-700">Work Description *</label>
          <textarea 
            id="description" 
            name="description" 
            rows="4" 
            placeholder="Be as specific as possible" 
            value={data.description} 
            onChange={handleChange} 
            className="block w-full p-3 bg-white border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          ></textarea>
        </div>
        
        <div>
          <label htmlFor="location" className="block mb-1 text-sm font-medium text-gray-700">Workplace Location *</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"><BsGeoAlt className="text-gray-400" /></div>
            <input 
              type="text" 
              id="location" 
              name="location" 
              placeholder="Enter your full address" 
              value={data.location} 
              onChange={handleChange} 
              className="block w-full p-3 pl-10 bg-white border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500" 
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="startDate" className="block mb-1 text-sm font-medium text-gray-700">
            Preferred Start Date *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            </div>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={data.startDate}
              onChange={handleChange}
              className="block w-full p-3 bg-white border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="endDate" className="block mb-1 text-sm font-medium text-gray-700">
            Preferred End Date *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            </div>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={data.endDate}
              onChange={handleChange}
              className="block w-full p-3 bg-white border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

      </form>
    </div>
  );
};