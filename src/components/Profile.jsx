import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from './UserProvider';
import { useNavigate, useParams } from 'react-router-dom';
// Removed: import '../App.css'; // No longer needed

// --- SVG Icons for UI ---
const EditIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /></svg>;
const CancelIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>;
const CameraIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-white"><path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" /></svg>;
const ChevronRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>;


const Profile = () => {
  // --- No Logic Change: All state and hooks are identical ---
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
      // Note: This logic is preserved. It assumes userData is {name, email,...}
      // This may conflict with Login.js's {data: {name, email,...}}
      // This is an existing logic inconsistency that is being preserved.
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
      console.log('Updating profile:', formData);
      // Here you would make an API call to update the profile
      setIsEditing(false);
      // Show success message
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleLogout = () => {
    setUserData(null);
    localStorage.removeItem("token"); // Recommended to clear token on logout
    navigate('/');
  };

  // --- Styled Loading State ---
  // Note: This check for `!userData?.data` is preserved from the original,
  // even though the useEffect above uses `userData.name`.
  if (!userData?.data) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <h2 className="text-2xl font-semibold mb-2">Loading profile...</h2>
      </div>
    );
  }

  // --- Styled Profile Page ---
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen p-4 md:p-8 text-gray-900 dark:text-gray-200">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* --- Profile Header Card --- */}
        <header className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <img
                className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover"
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${formData.name || 'U'}`}
                alt="Profile Avatar"
              />
              <button className="absolute bottom-2 right-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800 hover:bg-blue-700 transition">
                <CameraIcon />
              </button>
            </div>
            
            {/* Info & Stats */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold">{formData.name}</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Member since {new Date().getFullYear()}
              </p>
              <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-4">
                <div className="text-center px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <span className="stat-number block text-xl font-bold text-blue-600 dark:text-blue-400">3</span>
                  <span className="stat-label text-sm text-gray-500 dark:text-gray-400">Donations</span>
                </div>
                <div className="text-center px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <span className="stat-number block text-xl font-bold text-blue-600 dark:text-blue-400">$225</span>
                  <span className="stat-label text-sm text-gray-500 dark:text-gray-400">Total Given</span>
                </div>
                <div className="text-center px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <span className="stat-number block text-xl font-bold text-blue-600 dark:text-blue-400">Bronze</span>
                  <span className="stat-label text-sm text-gray-500 dark:text-gray-400">Impact Level</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* --- Main Content Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* --- Personal Info Form Card (Left) --- */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold">Personal Information</h2>
              <button 
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md transition-colors text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? <CancelIcon /> : <EditIcon />}
                {isEditing ? 'Cancel' : 'Edit'}
              </button>
            </div>
            
            {/* Form Fields - using <div> as in original, not <form> */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="form-group md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                  <input
                    type="text" name="name" value={formData.name} onChange={handleInputChange} disabled={!isEditing}
                    className="mt-1 w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500
                               disabled:bg-gray-100 dark:disabled:bg-gray-700 dark:disabled:text-gray-400"
                  />
                </div>
                
                <div className="form-group md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                  <input
                    type="email" name="email" value={formData.email} onChange={handleInputChange} disabled={!isEditing}
                    className="mt-1 w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500
                               disabled:bg-gray-100 dark:disabled:bg-gray-700 dark:disabled:text-gray-400"
                  />
                </div>
                
                <div className="form-group md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                  <input
                    type="tel" name="phone" value={formData.phone} onChange={handleInputChange} disabled={!isEditing}
                    placeholder="Enter your phone number"
                    className="mt-1 w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500
                               disabled:bg-gray-100 dark:disabled:bg-gray-700 dark:disabled:text-gray-400"
                  />
                </div>
                
                <div className="form-group md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
                  <textarea
                    name="address" value={formData.address} onChange={handleInputChange} disabled={!isEditing}
                    placeholder="Enter your address" rows="3"
                    className="mt-1 w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500
                               disabled:bg-gray-100 dark:disabled:bg-gray-700 dark:disabled:text-gray-400"
                  />
                </div>
                
                <div className="form-group md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Bio</label>
                  <textarea
                    name="bio" value={formData.bio} onChange={handleInputChange} disabled={!isEditing}
                    placeholder="Tell us about yourself and why you support our cause..." rows="4"
                    className="mt-1 w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500
                               disabled:bg-gray-100 dark:disabled:bg-gray-700 dark:disabled:text-gray-400"
                  />
                </div>

                {isEditing && (
                  <div className="form-actions md:col-span-2 text-right">
                    <button 
                      className="save-btn px-6 py-2.5 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-colors" 
                      onClick={handleSave}
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* --- Account Settings Card (Right) --- */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-semibold">Account Settings</h2>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                
                <div className="setting-item p-6 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="setting-info">
                    <h3 className="font-medium">Change Password</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Update your account password</p>
                  </div>
                  <button className="setting-btn p-2 rounded-md"><ChevronRightIcon /></button>
                </div>
                
                <div className="setting-item p-6 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="setting-info">
                    <h3 className="font-medium">Notification Preferences</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Manage notifications</p>
                  </div>
                  <button className="setting-btn p-2 rounded-md"><ChevronRightIcon /></button>
                </div>

                <div className="setting-item p-6 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="setting-info">
                    <h3 className="font-medium">Privacy Settings</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Control your data sharing</p>
                  </div>
                  <button className="setting-btn p-2 rounded-md"><ChevronRightIcon /></button>
                </div>

                <div className="setting-item danger p-6 flex justify-between items-center">
                  <div className="setting-info">
                    <h3 className="font-medium text-red-600 dark:text-red-400">Delete Account</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Permanently delete your account</p>
                  </div>
                  <button className="setting-btn text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300">Delete</button>
                </div>
                
              </div>
            </div>

            {/* Logout Button (as in original structure) */}
            <div className="profile-actions">
              <button 
                className="logout-btn w-full py-3 px-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors" 
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;