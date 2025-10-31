import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from './UserProvider';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

const Analytics = () => {
  // --- No Logic Change: All state, context, and data are identical ---
  const { userData } = useContext(UserContext);
  const [timeRange, setTimeRange] = useState('6months');
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  const donationTrends = [
    { month: 'Jan', amount: 50, donations: 2 },
    { month: 'Feb', amount: 75, donations: 3 },
    { month: 'Mar', amount: 100, donations: 4 },
    { month: 'Apr', amount: 125, donations: 5 },
    { month: 'May', amount: 150, donations: 6 },
    { month: 'Jun', amount: 175, donations: 7 },
  ];

  const causeDistribution = [
    { name: 'Education', value: 40, color: '#3b82f6' }, // Blue-500
    { name: 'Healthcare', value: 30, color: '#ef4444' }, // Red-500
    { name: 'Environment', value: 20, color: '#10b981' }, // Green-500
    { name: 'Hunger Relief', value: 10, color: '#f59e0b' }, // Amber-500
  ];

  const impactMetrics = [
    { metric: 'Children Fed', count: 150, icon: '🍽️' },
    { metric: 'Students Educated', count: 45, icon: '📚' },
    { metric: 'Medical Treatments', count: 23, icon: '🏥' },
    { metric: 'Trees Planted', count: 120, icon: '🌳' },
  ];

  const recentActivity = [
    { id: 1, type: 'donation', amount: 50, cause: 'Education', date: '2025-01-15', status: 'completed' },
    { id: 2, type: 'donation', amount: 75, cause: 'Healthcare', date: '2025-01-10', status: 'completed' },
    { id: 3, type: 'donation', amount: 25, cause: 'Environment', date: '2025-01-05', status: 'completed' },
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1000);
  }, [timeRange]); // Logic preserved

  // --- Styled Loading State ---
  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <h2 className="text-2xl font-semibold mb-2">Loading analytics... ⏳</h2>
        <p>Crunching the numbers on your impact.</p>
      </div>
    );
  }

  // --- Styled Analytics Page ---
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen p-4 md:p-8 text-gray-900 dark:text-gray-200">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold">Impact Analytics</h1>
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="w-full md:w-auto px-4 py-2 text-sm rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
            <option value="all">All Time</option>
          </select>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="metric-card bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex items-center space-x-4">
            <div className="metric-icon p-3 bg-blue-100 dark:bg-blue-900 rounded-full text-2xl">💰</div>
            <div className="metric-content">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Total Donated</h3>
              <p className="metric-value text-2xl font-bold">$575</p>
              <span className="metric-change text-sm text-green-600 dark:text-green-400">+15% from last month</span>
            </div>
          </div>

          <div className="metric-card bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex items-center space-x-4">
            <div className="metric-icon p-3 bg-green-100 dark:bg-green-900 rounded-full text-2xl">🎯</div>
            <div className="metric-content">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Donations Made</h3>
              <p className="metric-value text-2xl font-bold">27</p>
              <span className="metric-change text-sm text-green-600 dark:text-green-400">+8% from last month</span>
            </div>
          </div>

          <div className="metric-card bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex items-center space-x-4">
            <div className="metric-icon p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full text-2xl">👥</div>
            <div className="metric-content">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Lives Impacted</h3>
              <p className="metric-value text-2xl font-bold">338</p>
              <span className="metric-change text-sm text-green-600 dark:text-green-400">+23% from last month</span>
            </div>
          </div>

          <div className="metric-card bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex items-center space-x-4">
            <div className="metric-icon p-3 bg-indigo-100 dark:bg-indigo-900 rounded-full text-2xl">🏆</div>
            <div className="metric-content">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Impact Level</h3>
              <p className="metric-value text-2xl font-bold">Silver</p>
              <span className="metric-change text-sm text-gray-500 dark:text-gray-400">Next: Gold ($1000)</span>
            </div>
          </div>
          
        </div>

        {/* Charts Section */}
        <div className="charts-section grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="chart-container lg:col-span-3 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Donation Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={donationTrends} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                <XAxis dataKey="month" fontSize="12px" />
                <YAxis fontSize="12px" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                    borderRadius: '8px', 
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    border: 'none',
                    color: '#000'
                  }}
                />
                <Line type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-container lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Cause Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={causeDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  // No Logic Change: Original label function preserved
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                  className="text-xs"
                >
                  {causeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                    borderRadius: '8px', 
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    border: 'none',
                    color: '#000'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Impact Metrics */}
        <div className="impact-section bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Your Impact by Numbers</h3>
          <div className="impact-grid grid grid-cols-2 md:grid-cols-4 gap-4">
            {impactMetrics.map((impact, index) => (
              <div key={index} className="impact-card flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="impact-icon text-4xl">{impact.icon}</div>
                <div className="impact-content text-center mt-2">
                  <h4 className="text-2xl font-bold">{impact.count}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{impact.metric}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity & Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Recent Activity */}
          <div className="activity-section bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
            <div className="activity-list space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="activity-item flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="activity-icon text-2xl">💝</div>
                  <div className="activity-content flex-1">
                    <h4 className="font-semibold">Donation to {activity.cause}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Amount: ${activity.amount} • {activity.date}</p>
                  </div>
                  <div className="activity-status text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 px-2.5 py-0.5 rounded-full">Completed</div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievement Badges */}
          <div className="achievements-section bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Achievement Badges</h3>
            <div className="badges-grid grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="badge flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="badge-icon p-2 bg-yellow-200 dark:bg-yellow-800 rounded-full text-2xl">🥉</div>
                <div className="badge-info">
                  <h4 className="font-semibold">First Donation</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Made your first donation</p>
                </div>
              </div>

              <div className="badge flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="badge-icon p-2 bg-blue-200 dark:bg-blue-800 rounded-full text-2xl">🎯</div>
                <div className="badge-info">
                  <h4 className="font-semibold">Consistent Giver</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">3 consecutive months</p>
                </div>
              </div>

              <div className="badge flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="badge-icon p-2 bg-purple-200 dark:bg-purple-800 rounded-full text-2xl">🌟</div>
                <div className="badge-info">
                  <h4 className="font-semibold">Impact Maker</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Helped 100+ people</p>
                </div>
              </div>

              <div className="badge flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg opacity-50">
                <div className="badge-icon p-2 bg-gray-200 dark:bg-gray-600 rounded-full text-2xl">💎</div>
                <div className="badge-info">
                  <h4 className="font-semibold">Philanthropist</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Donate $1000 total</p>
                </div>
              </div>
              
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Analytics;