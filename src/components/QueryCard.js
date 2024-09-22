import React, { useState } from 'react';
import { db } from '../services/firebaseConfig';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { CheckCircle, XCircle, Phone, Mail, Users, Calendar, FileText, Trash2 } from 'lucide-react';

const QueryCard = ({ query, onStatusUpdate, onDelete }) => {
  const [status, setStatus] = useState(query.status || 'pending');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const toggleStatus = async () => {
    const newStatus = status === 'pending' ? 'checked' : 'pending';
    try {
      await updateDoc(doc(db, 'contactForms', query.id), {
        status: newStatus,
      });
      setStatus(newStatus);
      onStatusUpdate(query.id, newStatus);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, 'contactForms', query.id));
      onDelete(query.id);  // Notify parent component to remove the query from the list
    } catch (error) {
      console.error('Error deleting query:', error);
    }
  };

  const statusColor = status === 'checked' ? 'bg-green-500' : 'bg-yellow-500';
  const statusText = status === 'checked' ? 'Checked' : 'Pending';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4 border border-gray-200 relative">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">{query.name}</h3>
          <span className={`${statusColor} text-white text-sm font-semibold px-3 py-1 rounded-full`}>
            {statusText}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-4">
          <div className="flex items-center">
            <Mail className="mr-2 text-gray-500" size={18} />
            <a href={`mailto:${query.email}`} className="text-blue-600 hover:underline">{query.email}</a>
          </div>
          <div className="flex items-center">
            <Phone className="mr-2 text-gray-500" size={18} />
            <a href={`tel:${query.phone}`} className="text-blue-600 hover:underline">{query.phone}</a>
          </div>
          <div className="flex items-center">
            <Users className="mr-2 text-gray-500" size={18} />
            <span className="text-gray-700">{query.people} people</span>
          </div>
          <div className="flex items-center">
            <Calendar className="mr-2 text-gray-500" size={18} />
            <span className="text-gray-700">{query.days} days</span>
          </div>
        </div>
        <div className="flex items-start mb-4">
          <FileText className="mr-2 text-gray-500 mt-1" size={18} />
          <p className="text-gray-700">{query.notes}</p>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 flex justify-between">
        <button
          onClick={toggleStatus}
          className={`px-4 py-2 rounded-md text-white font-semibold transition duration-300 ease-in-out flex items-center justify-center ${
            status === 'checked'
              ? 'bg-yellow-500 hover:bg-yellow-600'
              : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          {status === 'checked' ? (
            <>
              <XCircle size={18} className="mr-2" />
              Mark as Pending
            </>
          ) : (
            <>
              <CheckCircle size={18} className="mr-2" />
              Mark as Checked
            </>
          )}
        </button>
        {/* Trash Icon */}
        <Trash2
          size={24}
          className="text-gray-500 hover:text-red-600 cursor-pointer"
          onClick={() => setShowDeleteConfirm(true)}  // Show delete confirmation
        />
      </div>

      {/* Custom Alert Box */}
      {showDeleteConfirm && (
        <div className="absolute inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <p className="text-lg font-semibold text-gray-700 mb-4">
              Are you sure you want to delete this query?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QueryCard;