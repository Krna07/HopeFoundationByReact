import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from './UserProvider';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

const Analytics = () => {
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
    { name: 'Education', value: 40, color: '#3b82f6' },
    { name: 'Healthcare', value: 30, color: '#ef4444' },
    { name: 'Environment', value: 20, color: '#10b981' },
    { name: 'Hunger Relief', value: 10, color: '#f59e0b' },
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
  }, [timeRange]);

  if (loading) {
    return (
      <div className="analytics-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <h1>Impact Analytics</h1>
        <div className="time-range-selector">
          <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
            <option value="all">All Time</option>
          </select>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon">💰</div>
          <div className="metric-content">
            <h3>Total Donated</h3>
            <p className="metric-value">$575</p>
            <span className="metric-change positive">+15% from last month</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">🎯</div>
          <div className="metric-content">
            <h3>Donations Made</h3>
            <p className="metric-value">27</p>
            <span className="metric-change positive">+8% from last month</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">👥</div>
          <div className="metric-content">
            <h3>Lives Impacted</h3>
            <p className="metric-value">338</p>
            <span className="metric-change positive">+23% from last month</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">🏆</div>
          <div className="metric-content">
            <h3>Impact Level</h3>
            <p className="metric-value">Silver</p>
            <span className="metric-change neutral">Next: Gold ($1000)</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart-container">
          <h3>Donation Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={donationTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="amount" stroke="#667eea" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3>Cause Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={causeDistribution}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {causeDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Impact Metrics */}
      <div className="impact-section">
        <h3>Your Impact by Numbers</h3>
        <div className="impact-grid">
          {impactMetrics.map((impact, index) => (
            <div key={index} className="impact-card">
              <div className="impact-icon">{impact.icon}</div>
              <div className="impact-content">
                <h4>{impact.count}</h4>
                <p>{impact.metric}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="activity-section">
        <h3>Recent Activity</h3>
        <div className="activity-list">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="activity-item">
              <div className="activity-icon">💝</div>
              <div className="activity-content">
                <h4>Donation to {activity.cause}</h4>
                <p>Amount: ${activity.amount} • {activity.date}</p>
              </div>
              <div className="activity-status completed">Completed</div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievement Badges */}
      <div className="achievements-section">
        <h3>Achievement Badges</h3>
        <div className="badges-grid">
          <div className="badge earned">
            <div className="badge-icon">🥉</div>
            <div className="badge-info">
              <h4>First Donation</h4>
              <p>Made your first donation</p>
            </div>
          </div>
          <div className="badge earned">
            <div className="badge-icon">🎯</div>
            <div className="badge-info">
              <h4>Consistent Giver</h4>
              <p>Donated for 3 consecutive months</p>
            </div>
          </div>
          <div className="badge earned">
            <div className="badge-icon">🌟</div>
            <div className="badge-info">
              <h4>Impact Maker</h4>
              <p>Helped 100+ people</p>
            </div>
          </div>
          <div className="badge locked">
            <div className="badge-icon">💎</div>
            <div className="badge-info">
              <h4>Philanthropist</h4>
              <p>Donate $1000 total</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
