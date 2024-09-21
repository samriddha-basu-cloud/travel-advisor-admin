import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebaseConfig';

export const getItineraries = async () => {
  const querySnapshot = await getDocs(collection(db, 'itinerary'));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const addItinerary = async (itinerary) => {
  await addDoc(collection(db, 'itinerary'), itinerary);
};

export const updateItinerary = async (id, updatedItinerary) => {
  const docRef = doc(db, 'itinerary', id);
  await updateDoc(docRef, updatedItinerary);
};

export const deleteItinerary = async (id) => {
  const docRef = doc(db, 'itinerary', id);
  await deleteDoc(docRef);
};