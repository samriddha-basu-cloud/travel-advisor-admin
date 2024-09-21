import React, { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../services/firebaseConfig';
import { Trash2 } from 'lucide-react';

const ItineraryModal = ({ itinerary, onClose, onSave }) => {
  const [title, setTitle] = useState(itinerary ? itinerary.title : '');
  const [description, setDescription] = useState(itinerary ? itinerary.description : '');
  
  // State for existing images
  const [existingImages, setExistingImages] = useState(itinerary && itinerary.images ? itinerary.images : []);

  // State for new images to upload
  const [newImages, setNewImages] = useState([]);
  
  const [uploading, setUploading] = useState(false);

  // Handle new image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages(files); // Add new images to the array
  };

  // Remove an existing image from the current list
  const handleRemoveExistingImage = (index) => {
    const updatedImages = [...existingImages];
    updatedImages.splice(index, 1); // Remove image by index
    setExistingImages(updatedImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    // Upload new images if any
    const uploadedImagesUrls = await Promise.all(
      newImages.map(async (image) => {
        try {
          const storageRef = ref(storage, `itineraryImages/${Date.now()}_${image.name}`);
          const uploadTask = await uploadBytesResumable(storageRef, image);
          const downloadURL = await getDownloadURL(uploadTask.ref); // Get download URL
          return downloadURL; // Return URL of the uploaded image
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      })
    );

    // Combine existing and new images
    const allImages = [...existingImages, ...uploadedImagesUrls];

    // Save the updated itinerary data
    onSave({ title, description, images: allImages }); // Pass the combined image URLs to the save handler

    setUploading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-y-auto">
      <div className="bg-white p-6 rounded-lg shadow-lg max-h-screen w-full sm:w-3/4 lg:w-3/4 relative overflow-y-auto">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-0 right-0 m-4 bg-red-500 text-white py-2 px-4 rounded-md">
          Close
        </button>

        {/* Modal Header */}
        <h2 className="text-2xl font-bold mb-4">{itinerary ? 'Edit Itinerary' : 'Add Itinerary'}</h2>
        
        {/* Modal Form */}
        <form onSubmit={handleSubmit}>
          {/* Title Input */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="border p-2 w-full mb-4"
          />
          
          {/* Description Input */}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="border p-2 w-full mb-4 h-56"
          />

          {/* Display already uploaded images */}
          {existingImages.length > 0 && (
            <div className="mb-4">
              <h4 className="font-bold">Uploaded Images:</h4>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {existingImages.map((url, index) => (
                  <div key={index} className="relative">
                    <img src={url} alt={`Uploaded Image ${index + 1}`} className="w-full h-40 object-cover rounded-md" />
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                      onClick={() => handleRemoveExistingImage(index)}
                    >
                      <Trash2 />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* File input for selecting multiple new images */}
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="border p-2 w-full mb-4"
          />

          {/* Submit and Cancel buttons */}
          <div className="flex justify-end space-x-2">
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded-md"
              disabled={uploading}  // Disable the button while uploading
            >
              {uploading ? 'Uploading...' : 'Save'}
            </button>
            <button onClick={onClose} className="bg-gray-500 text-white py-2 px-4 rounded-md">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItineraryModal;