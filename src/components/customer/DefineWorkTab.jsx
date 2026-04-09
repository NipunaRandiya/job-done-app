import React, { useState } from 'react';
import { BsGeoAlt } from 'react-icons/bs';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';

const API_WORK_TYPES = [
  'Plumbing', 
  'Electrical Wiring', 
  'Tiling', 
  'Painting', 
  'Building / Masonry', 
  'Roofing'
];

export const DefineWorkTab = ({ data, updateData }) => {
  const [markerLocation, setMarkerLocation] = useState(data.latLng || null);

  const handleChange = (e) => updateData(e.target.name, e.target.value);

  const handleMapClick = (e) => {
    const lat = e.detail.latLng.lat;
    const lng = e.detail.latLng.lng;
    const newLocation = { lat, lng };
    
    setMarkerLocation(newLocation);
    
    updateData("latLng", newLocation); 
  };

  const labelClass = "block mb-2 text-[10px] font-black uppercase tracking-widest text-slate-400";
  const inputClass = "block w-full p-4 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none";

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>Work Type *</label>
          <select name="workType" value={data.workType} onChange={handleChange} className={inputClass}>
            <option value="">Select Service</option>
            {API_WORK_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
          </select>
        </div>
        
        <div>
          <label className={labelClass}>Written Workplace Address *</label>
          <div className="relative">
            <BsGeoAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              name="location" 
              type="text" 
              placeholder="e.g. 123 Main St, Colombo" 
              value={data.location} 
              onChange={handleChange} 
              className={`${inputClass} pl-12`} 
            />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <label className={labelClass}>Pin Precise Location *</label>
        <div className="rounded-[2.5rem] overflow-hidden border-4 border-slate-50 h-80 w-full shadow-inner relative">
          <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <Map
              defaultCenter={{ lat: 6.9271, lng: 79.8612 }} 
              defaultZoom={12}
              mapId="BOOKING_MAP_ID" 
              onClick={handleMapClick}
              disableDefaultUI={true}
              gestureHandling={'greedy'}
            >
              {(markerLocation || data.latLng) && (
                <AdvancedMarker position={markerLocation || data.latLng} />
              )}
            </Map>
          </APIProvider>
        </div>
        <p className="text-[9px] text-slate-400 ml-4 font-bold italic">
          * Click on the map to mark exactly where the service is required.
        </p>
      </div>

      <div>
        <label className={labelClass}>Work Description *</label>
        <textarea name="description" rows="4" placeholder="Be specific..." value={data.description} onChange={handleChange} className={inputClass}></textarea>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>Preferred Start Date</label>
          <input name="startDate" type="date" value={data.startDate} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Preferred End Date</label>
          <input name="endDate" type="date" value={data.endDate} onChange={handleChange} className={inputClass} />
        </div>
      </div>
    </div>
  );
};