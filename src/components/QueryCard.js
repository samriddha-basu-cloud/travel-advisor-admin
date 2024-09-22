import React, { useState } from 'react';
import { db } from '../services/firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';
import { CheckCircle, XCircle, Phone, Mail, Users, Calendar, FileText } from 'lucide-react';

const QueryCard = ({ query, onStatusUpdate }) => {
  const [status, setStatus] = useState(query.status || 'pending');

  const toggleStatus = async () => {
    const newStatus = status === 'pending' ? 'checked' : 'pending';
    try {
      await updateDoc(doc(db, 'contactForms', query.id), {
        status: newStatus
      });
      setStatus(newStatus);
      onStatusUpdate(query.id, newStatus);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const statusColor = status === 'checked' ? 'bg-green-500' : 'bg-yellow-500';
  const statusText = status === 'checked' ? 'Checked' : 'Pending';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4 border border-gray-200">
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
      <div className="bg-gray-50 px-4 py-3 text-right">
        <button
          onClick={toggleStatus}
          className={`px-4 py-2 rounded-md text-white font-semibold transition duration-300 ease-in-out flex items-center justify-center ml-auto ${
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
      </div>
    </div>
  );
};

export default QueryCard;