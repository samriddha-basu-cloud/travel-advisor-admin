import React, { createContext, useState, useEffect } from 'react';
import { db } from '../services/firebaseConfig';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admins, setAdmins] = useState([]);

  const fetchAdmins = async () => {
    const querySnapshot = await getDocs(collection(db, 'admins'));
    const adminList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setAdmins(adminList);
  };

  const addAdmin = async (email) => {
    await addDoc(collection(db, 'admins'), { email });
    fetchAdmins();
  };

  const removeAdmin = async (id) => {
    await deleteDoc(doc(db, 'admins', id));
    fetchAdmins();
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  return (
    <AdminContext.Provider value={{ admins, addAdmin, removeAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};