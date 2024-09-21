import React, { createContext, useState, useEffect } from 'react';
import { auth, provider } from '../services/firebaseConfig';
import { signInWithPopup, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();  // Initialize useNavigate for navigation

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // Check if the user is authorized (email check)
        if (user.email === 'samriddhabasu1234@gmail.com') {
          console.log('Admin user logged in:', user.email); // Debugging
          setUser(user);
        } else {
          console.log('Unauthorized user:', user.email); // Debugging
          handleLogout();  // Logout if not authorized
        }
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, [navigate]);  // Add navigate as a dependency

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      if (result.user.email === 'samriddhabasu1234@gmail.com') {
        console.log('Admin user successfully logged in:', result.user.email); // Debugging
        setUser(result.user);
        navigate('/');  // Navigate to home/dashboard after successful login
      } else {
        console.log('Unauthorized login attempt:', result.user.email); // Debugging
        await handleLogout();  // Logout unauthorized users
        navigate('/unauthorized');  // Redirect unauthorized users
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    navigate('/unauthorized');  // Navigate to /unauthorized after logout
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};