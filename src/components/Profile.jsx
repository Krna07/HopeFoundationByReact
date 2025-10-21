import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from './UserProvider';
import { useNavigate, useParams } from 'react-router-dom';
import '../App.css';

const Profile = () => {
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    bio: ''
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        address: userData.address || '',
        bio: userData.bio || ''
      });
    }
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      // Here you would make an API call to update the profile
      console.log('Updating profile:', formData);
      setIsEditing(false);
      // Show success message
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleLogout = () => {
    setUserData(null);
    navigate('/');
  };

  if (!userData?.data) {
    return (
      <div className="profile-container">
        <div className="loading-message">
          <h2>Loading profile...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <header className="profile-header">
        <div className="profile-avatar">
          <div className="avatar-circle">
            {userData.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <button className="avatar-upload-btn">📷</button>
        </div>
        <div className="profile-info">
          <h1>{userData.name}</h1>
          <p className="member-since">Member since {new Date().getFullYear()}</p>
          <div className="profile-stats">
            <div className="stat">
              <span className="stat-number">3</span>
              <span className="stat-label">Donations</span>
            </div>
            <div className="stat">
              <span className="stat-number">$225</span>
              <span className="stat-label">Total Given</span>
            </div>
            <div className="stat">
              <span className="stat-number">Bronze</span>
              <span className="stat-label">Impact Level</span>
            </div>
          </div>
        </div>
      </header>

      <div className="profile-content">
        <div className="profile-section">
          <div className="section-header">
            <h2>Personal Information</h2>
            <button 
              className="edit-btn"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
          </div>

          <div className="profile-form">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Enter your phone number"
              />
            </div>

            <div className="form-group">
              <label>Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Enter your address"
                rows="3"
              />
            </div>

            <div className="form-group">
              <label>Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Tell us about yourself and why you support our cause..."
                rows="4"
              />
            </div>

            {isEditing && (
              <div className="form-actions">
                <button className="save-btn" onClick={handleSave}>
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="profile-section">
          <div className="section-header">
            <h2>Account Settings</h2>
          </div>

          <div className="settings-list">
            <div className="setting-item">
              <div className="setting-info">
                <h3>Change Password</h3>
                <p>Update your account password</p>
              </div>
              <button className="setting-btn">Change</button>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h3>Notification Preferences</h3>
                <p>Manage how you receive notifications</p>
              </div>
              <button className="setting-btn">Configure</button>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h3>Privacy Settings</h3>
                <p>Control your privacy and data sharing</p>
              </div>
              <button className="setting-btn">Manage</button>
            </div>

            <div className="setting-item danger">
              <div className="setting-info">
                <h3>Delete Account</h3>
                <p>Permanently delete your account and all data</p>
              </div>
              <button className="setting-btn danger">Delete</button>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-actions">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
