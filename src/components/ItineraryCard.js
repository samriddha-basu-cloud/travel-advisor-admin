import React from 'react';

const ItineraryCard = ({ itinerary, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-4 shadow-md rounded-md mb-4">
      <h3 className="text-xl font-bold">{itinerary.title}</h3>
      <p className="mt-2">{itinerary.description}</p>

      {/* Render uploaded images */}
      {itinerary.images && itinerary.images.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-2">
          {itinerary.images.map((url, index) => (
            <img key={index} src={url} alt={`Itinerary Image ${index + 1}`} className="w-full h-40 object-cover rounded-md" />
          ))}
        </div>
      )}

      <div className="flex justify-end space-x-2 mt-4">
        <button
          onClick={() => onEdit(itinerary)}
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(itinerary.id)}
          className="bg-red-500 text-white py-2 px-4 rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ItineraryCard;