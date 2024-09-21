import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PieChart, BarChart as IconBarChart, Users } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { collection, query, orderBy, getDocs, where, Timestamp } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';  // Ensure this path is correct for your Firebase setup

const Dashboard = () => {
  const navigate = useNavigate();
  const [visitData, setVisitData] = useState([]);
  const [timeRange, setTimeRange] = useState('week');

  useEffect(() => {
    fetchVisitData(timeRange);
  }, [timeRange]);

  const fetchVisitData = async (range) => {
    const now = new Date();
    let startDate;
    let intervalType;

    switch (range) {
      case 'week':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
        intervalType = 'day';
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        intervalType = 'day';
        break;
      case 'year':
        startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
        intervalType = 'month';
        break;
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
        intervalType = 'day';
    }

    const q = query(
      collection(db, 'site_access_logs'),
      where('timestamp', '>=', Timestamp.fromDate(startDate)),
      orderBy('timestamp', 'asc')
    );

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => ({
      date: doc.data().timestamp.toDate(),
      visits: 1
    }));

    // Aggregate visits by day or month
    const aggregatedData = data.reduce((acc, cur) => {
      const dateKey = intervalType === 'day'
        ? cur.date.toISOString().split('T')[0] // Format: YYYY-MM-DD for days
        : `${cur.date.getFullYear()}-${(cur.date.getMonth() + 1).toString().padStart(2, '0')}`; // Format: YYYY-MM for months

      if (!acc[dateKey]) {
        acc[dateKey] = { date: dateKey, visits: 0 };
      }
      acc[dateKey].visits += cur.visits;
      return acc;
    }, {});

    // Set the visit data for the graph
    setVisitData(Object.values(aggregatedData));
  };

  const formatXAxis = (tickItem) => {
    const date = new Date(tickItem);
    if (timeRange === 'week' || timeRange === 'month') {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    }
  };

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
      icon: <IconBarChart size={48} />,
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
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6 md:mb-8 animate-fade-in">
        Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-6 md:mb-8">
        {tiles.map((tile, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br ${tile.gradient} text-white p-4 md:p-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer`}
            onClick={() => navigate(tile.path)}
          >
            <div className="flex items-center mb-3 md:mb-4">
              {tile.icon}
              <h2 className="text-xl md:text-2xl font-bold ml-3 md:ml-4">{tile.title}</h2>
            </div>
            <p className="text-sm md:text-lg">{tile.description}</p>
          </div>
        ))}
      </div>
      <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-0">Website Visits</h2>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-300 rounded-md py-1 px-2 md:py-2 md:px-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="year">Last Year</option>
          </select>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={visitData} margin={{ top: 5, right: 20, bottom: 20, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={formatXAxis}
              interval="preserveStartEnd"
              tickMargin={5}
            />
            <YAxis
              allowDecimals={false}
              tickMargin={5}
            />
            <Tooltip />
            <defs>
              <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4ade80" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0.8}/>
              </linearGradient>
            </defs>
            <Bar
              dataKey="visits"
              fill="url(#greenGradient)"
              maxBarSize={60}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;