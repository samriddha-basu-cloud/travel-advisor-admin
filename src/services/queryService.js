import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';

export const getQueries = async () => {
  const querySnapshot = await getDocs(collection(db, 'contactForms'));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};