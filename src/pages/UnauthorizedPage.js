import React from 'react';
import { useNavigate } from 'react-router-dom';

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold text-red-600">Unauthorized Access</h1>
      <p className="mt-4">Sorry, you do not have permission to access this page.</p>
      <button
        onClick={() => navigate('/')}
        className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg"
      >
        Go to Home
      </button>
    </div>
  );
};

export default UnauthorizedPage;