import React, { useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';
import QueryCard from '../components/QueryCard';
import { MessageSquare, RefreshCw } from 'lucide-react';

const Queries = () => {
  const [queries, setQueries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchQueries = async () => {
    setIsLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'contactForms'));
      const queriesList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setQueries(queriesList);
    } catch (error) {
      console.error("Error fetching queries:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center">
          <MessageSquare className="mr-2" size={32} />
          User Queries
        </h1>
        <button
          onClick={fetchQueries}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out flex items-center"
          disabled={isLoading}
        >
          <RefreshCw className={`mr-2 ${isLoading ? 'animate-spin' : ''}`} size={20} />
          Refresh
        </button>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : queries.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {queries.map((query) => (
            <QueryCard key={query.id} query={query} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-500 text-lg">No queries available at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default Queries;