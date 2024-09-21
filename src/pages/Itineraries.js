import React, { useState, useEffect } from 'react';
import { db } from '../services/firebaseConfig';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import ItineraryModal from '../modals/ItineraryModal';
import ItineraryCard from '../components/ItineraryCard';
import { PlusCircle, Edit2, Trash2 } from 'lucide-react';

const Itineraries = () => {
  const [itineraries, setItineraries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItinerary, setSelectedItinerary] = useState(null);

  const fetchItineraries = async () => {
    const querySnapshot = await getDocs(collection(db, 'itinerary'));
    const itinerariesList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setItineraries(itinerariesList);
  };

  useEffect(() => {
    fetchItineraries();
  }, []);

  const handleAddOrEdit = async (data) => {
    if (selectedItinerary) {
      await updateDoc(doc(db, 'itinerary', selectedItinerary.id), data);
      setItineraries(itineraries.map((item) => (item.id === selectedItinerary.id ? { ...item, ...data } : item)));
    } else {
      await addDoc(collection(db, 'itinerary'), data);
      fetchItineraries();
    }
    setShowModal(false);
    setSelectedItinerary(null);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'itinerary', id));
    setItineraries(itineraries.filter((item) => item.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Itineraries</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out flex items-center"
        >
          <PlusCircle size={20} className="mr-2" />
          Add Itinerary
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {itineraries.map((itinerary) => (
          <div key={itinerary.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 ease-in-out">
            <ItineraryCard
              itinerary={itinerary}
              onEdit={() => {
                setSelectedItinerary(itinerary);
                setShowModal(true);
              }}
              onDelete={handleDelete}
              EditIcon={Edit2}
              DeleteIcon={Trash2}
            />
          </div>
        ))}
      </div>
      {showModal && (
        <ItineraryModal
          itinerary={selectedItinerary}
          onClose={() => {
            setShowModal(false);
            setSelectedItinerary(null);
          }}
          onSave={handleAddOrEdit}
        />
      )}
    </div>
  );
};

export default Itineraries;