import React, { useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';
import QueryCard from '../components/QueryCard';
import { MessageSquare, RefreshCw, User, Phone, Mail, ChevronDown, ChevronUp } from 'lucide-react';

const Queries = () => {
  const [queries, setQueries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedGroups, setExpandedGroups] = useState({});

  const fetchQueries = async () => {
    setIsLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'contactForms'));
      const queriesList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setQueries(queriesList);
    } catch (error) {
      console.error('Error fetching queries:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  const handleStatusUpdate = (id, newStatus) => {
    setQueries((prevQueries) =>
      prevQueries.map((query) => (query.id === id ? { ...query, status: newStatus } : query))
    );
  };

  const handleDelete = (id) => {
    setQueries((prevQueries) => prevQueries.filter((query) => query.id !== id));
  };

  const groupByEmail = (queries) => {
    return queries.reduce((groups, query) => {
      const { email } = query;
      if (!groups[email]) {
        groups[email] = [];
      }
      groups[email].push(query);
      return groups;
    }, {});
  };

  const groupedQueries = groupByEmail(queries);

  const toggleGroup = (email) => {
    setExpandedGroups((prev) => ({ ...prev, [email]: !prev[email] }));
  };

  const allQueriesChecked = (queries) => {
    return queries.every((query) => query.status === 'checked');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center mb-4 sm:mb-0">
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
      ) : Object.keys(groupedQueries).length > 0 ? (
        <div className="space-y-6">
          {Object.entries(groupedQueries).map(([email, queries]) => (
            <div key={email} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div
                className="p-4 bg-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center cursor-pointer"
                onClick={() => toggleGroup(email)}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-2 sm:mb-0">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2 ${allQueriesChecked(queries) ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
                    <User className="mr-1 text-gray-600" size={20} />
                    <span className="text-xl font-semibold text-gray-800">{queries[0].name}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="mr-1" size={16} />
                    <span className="text-sm">{queries[0].phone}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Mail className="text-gray-600 mr-1" size={20} />
                    <span className="text-sm">{email}</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="mr-2 text-sm text-gray-600">{queries.length} queries</span>
                  {expandedGroups[email] ? (
                    <ChevronUp className="text-gray-600" size={20} />
                  ) : (
                    <ChevronDown className="text-gray-600" size={20} />
                  )}
                </div>
              </div>
              {expandedGroups[email] && (
                <div className="p-4 space-y-4">
                  {queries.map((query) => (
                    <QueryCard
                      key={query.id}
                      query={query}
                      onStatusUpdate={handleStatusUpdate}
                      onDelete={handleDelete}  // Pass onDelete prop to handle deletion
                    />
                  ))}
                </div>
              )}
            </div>
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