import React from 'react';
import { Route, Routes } from 'react-router-dom';  // Do not import Router here
import { LogOut } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import Itineraries from './pages/Itineraries';
import Queries from './pages/Queries';
import Admins from './pages/Admins';
import { useAuth } from './hooks/useAuth';
import UnauthorizedPage from './pages/UnauthorizedPage';

function App() {
  const { user, handleLogin, handleLogout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      {user ? (
        <div className="max-w-7xl mx-auto">
          <div className="bg-white shadow-md rounded-lg p-4 mb-6">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <div className="flex items-center mb-4 sm:mb-0">
                <img
                  src={user.photoURL}
                  alt="User Profile"
                  className="w-12 h-12 rounded-full border-2 border-blue-500"
                />
                <div className="ml-4">
                  <h3 className="font-bold text-lg text-gray-800">{user.displayName}</h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white py-2 px-4 rounded-md flex items-center hover:bg-red-600 transition-colors duration-300"
              >
                <LogOut size={18} className="mr-2" />
                Logout
              </button>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/itineraries" element={<Itineraries />} />
              <Route path="/queries" element={<Queries />} />
              <Route path="/admins" element={<Admins />} />
              <Route path="/unauthorized" element={<UnauthorizedPage />} />
            </Routes>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Welcome Back</h2>
            <p className="mb-6 text-gray-600">Please log in to access the admin dashboard.</p>
            <button
              onClick={handleLogin}
              className="bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center mx-auto"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill="#ffffff"
                  d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2 C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                />
              </svg>
              Login with Google
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;