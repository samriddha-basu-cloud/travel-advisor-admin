import React from 'react';

const AdminCard = ({ admin, onDelete }) => {
  return (
    <div className="bg-white p-4 shadow-md rounded-md mb-4">
      <p className="text-lg">{admin.email}</p>
      <div className="flex justify-end mt-4">
        <button
          onClick={() => onDelete(admin.id)}
          className="bg-red-500 text-white py-2 px-4 rounded-md"
        >
          Remove Admin
        </button>
      </div>
    </div>
  );
};

export default AdminCard;