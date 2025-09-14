import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { UserContext } from './UserProvider';
import '../App.css';

const Dash = () => {
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    if (!userData && id) {
      const fetchDataOnRefresh = async () => {
        try {
          const res = await fetch('http://localhost:5000/dash', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
          });
          const response = await res.json();
          if (response.message === 'found') {
            setUserData(response);
          } else {
            navigate('/loginpage');
          }
        } catch (err) {
          console.error('Error fetching user data:', err);
          navigate('/loginpage');
        }
      };
      fetchDataOnRefresh();
    }
  }, [id, userData, setUserData, navigate]);

  const userStats = {
    totalDonated: 225.0,
    causesSupported: 3,
    impactLevel: 'Bronze Supporter',
  };

  const recentDonations = [
    { id: 1, date: '2025-08-15', cause: 'Educate a Child', amount: 50.0, status: 'Completed' },
    { id: 2, date: '2025-07-22', cause: 'Feed the Hungry', amount: 75.0, status: 'Completed' },
    { id: 3, date: '2025-06-05', cause: 'Medical Help', amount: 100.0, status: 'Completed' },
  ];

  const handleLogout = () => {
    setUserData(null);
    navigate('/');
  };

  if (!userData || !userData.data) {
    return (
      <div className="dashboard-container centered-message">
        <h2>Loading user data... ⏳</h2>
        <p>
          If you are not redirected, please <Link to="/loginpage">log in</Link>.
        </p>
      </div>
    );
  }

  return (
    <>
      <header className="header">
        <h1 className="logo"></h1>
        <div className="nav">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/causes">Causes</Link>
          <Link to="/donate">Donate</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="auth-buttons">
          <div className="notification-bell" onClick={() => setDropdownVisible((prev) => !prev)}>
            🔔
            <span className="badge">3</span>
          </div>
          {dropdownVisible && (
            <div className="notification-dropdown show">
              <ul>
                <li>🎉 Thank you for your recent donation!</li>
                <li>📢 New campaign launched: Medical Aid</li>
                <li>💡 Your impact is growing every day!</li>
              </ul>
            </div>
          )}
          <div className="profile-icon">
            {/* <span>{userData.data.name}</span> */}
          </div>
        </div>
      </header>

      <div className="dashboard-container">
        <aside className="dashboard-sidebar">
          <div className="sidebar-header">
            <h3>Dashboard Menu</h3>
          </div>
          <nav className="sidebar-nav">
            <ul>
              <li className="active">
                <Link to={`/dash/${id}`}>Dashboard</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/donations">My Donations</Link>
              </li>
              <li>
                <Link to="/settings">Settings</Link>
              </li>
            </ul>
          </nav>
          <div className="sidebar-footer">
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        </aside>

        <main className="dashboard-main">
          <header className="dashboard-header">
            <h1>Welcome back, {userData.data.name}!</h1>
            <p>Here's a summary of your impactful contributions.</p>
          </header>

          <section className="hero" style={{ margin: '2rem 0' }}>
            <div className="hero-content">
              <h2>Together, We Can Make a Difference</h2>
              <p>Your small help can bring big change to someone's life.</p>
              <Link to="/donate">
                <button>Donate Now</button>
              </Link>
            </div>
          </section>

          <section className="features">
            <div className="feature-box">
              <Link to="/causes/feed">
                <h3>Feed the Hungry</h3>
              </Link>
            </div>
            <div className="feature-box">
              <Link to="/causes/educate">
                <h3>Educate a Child</h3>
              </Link>
            </div>
            <div className="feature-box">
              <Link to="/causes/medical">
                <h3>Medical Help</h3>
              </Link>
            </div>
          </section>

          <section className="summary-cards">
            <div className="card">
              <div className="card-icon">💰</div>
              <div className="card-info">
                <h4>Total Donated</h4>
                <p>${userStats.totalDonated.toFixed(2)}</p>
              </div>
            </div>
            <div className="card">
              <div className="card-icon">❤️</div>
              <div className="card-info">
                <h4>Causes Supported</h4>
                <p>{userStats.causesSupported}</p>
              </div>
            </div>
            <div className="card">
              <div className="card-icon">🏆</div>
              <div className="card-info">
                <h4>Impact Level</h4>
                <p>{userStats.impactLevel}</p>
              </div>
            </div>
          </section>

          <section className="recent-donations">
            <h2>Recent Donations</h2>
            <div className="donation-list">
              {recentDonations.map((donation, idx) => (
                <div key={donation.id} className="donation-item">
                  <p>
                    <strong>{idx + 1}.</strong>
                  </p>
                  <p>Date: {donation.date}</p>
                  <p>Cause: {donation.cause}</p>
                  <p>Amount: ${donation.amount.toFixed(2)}</p>
                  <p>Status: {donation.status}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="testimonials">
            <h2>Voices of Hope</h2>
          </section>

          <section className="quick-actions">
            <h2>Quick Actions</h2>
          </section>
        </main>
      </div>

      <footer className="footer">
        <p>© 2025 1% Impact. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Dash;
