import React, { useState } from 'react';

const ItineraryCard = ({ itinerary, onEdit, onDelete, onShowMore }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Limit description to 50 words
  const words = itinerary.description.split(' ');
  const shortDescription = words.slice(0, 50).join(' ');
  const isDescriptionLong = words.length > 50;

  // Show only the first 4 images
  const imagesToShow = itinerary.images.slice(0, 4);
  const remainingImagesCount = itinerary.images.length - 4;

  return (
    <div className="bg-white p-4 shadow-md rounded-md mb-4">
      <h3 className="text-xl font-bold">{itinerary.title}</h3>

      {/* Description */}
      <p className="mt-2">
        {showFullDescription ? itinerary.description : shortDescription}
        {isDescriptionLong && !showFullDescription && (
          <button
            onClick={() => onShowMore(itinerary, 'description')}
            className="text-blue-500 ml-2"
          >
            ...Show More
          </button>
        )}
      </p>

      {/* Images */}
      {itinerary.images.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-2 relative">
          {imagesToShow.map((url, index) => (
            <div key={index} className="relative">
              <img 
                src={url} 
                alt={`Itinerary Image ${index + 1}`} 
                className="w-full h-40 object-cover rounded-md" 
              />

              {/* Only overlay the "+ more" on the last image (4th image) */}
              {index === 3 && remainingImagesCount > 0 && (
                <div
                  className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-lg font-bold cursor-pointer rounded-md"
                  onClick={() => onShowMore(itinerary, 'images')}
                >
                  +{remainingImagesCount} more
                </div>
              )}
            </div>
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