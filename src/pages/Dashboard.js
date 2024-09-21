import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PieChart, BarChart, Users } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();

  const tiles = [
    {
      title: 'Manage Itineraries',
      description: 'Create, Edit, and Delete Travel Itineraries',
      icon: <PieChart size={48} />,
      gradient: 'from-emerald-400 to-cyan-500',
      path: '/itineraries'
    },
    {
      title: 'Manage Queries',
      description: 'View user-submitted queries',
      icon: <BarChart size={48} />,
      gradient: 'from-purple-400 to-pink-500',
      path: '/queries'
    },
    {
      title: 'Manage Admins',
      description: 'Assign and Remove Admin Privileges',
      icon: <Users size={48} />,
      gradient: 'from-amber-400 to-orange-500',
      path: '/admins'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 animate-fade-in">
        Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tiles.map((tile, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br ${tile.gradient} text-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer`}
            onClick={() => navigate(tile.path)}
          >
            <div className="flex items-center mb-4">
              {tile.icon}
              <h2 className="text-2xl font-bold ml-4">{tile.title}</h2>
            </div>
            <p className="mt-2 text-lg">{tile.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;