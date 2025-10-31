import React, { useContext, useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { UserContext } from './UserProvider';
// Removed: import '../App.css'; // No longer needed

// --- SVG Icons for Professional UI ---

const BellIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.017 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275" />
  </svg>
);

// Icons for Sidebar
const LayoutDashboardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25a2.25 2.25 0 0 1-2.25-2.25v-2.25Z" /></svg>;
const UserCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>;
const ChartBarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 0 1 9.75 19.875V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" /></svg>;
const GiftIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a.75.75 0 0 1-.75.75H3.75a.75.75 0 0 1-.75-.75v-8.25M12 15v3.75m0 0A1.5 1.5 0 0 1 10.5 21v-2.25M12 15V9.75M12 15a1.5 1.5 0 0 1 1.5 1.5v2.25m-1.5-3.75a1.5 1.5 0 0 0-1.5 1.5v2.25M3 11.25a9 9 0 0 1 18 0v-1.5c0-.478-.38-." /></svg>;
const TargetIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.82m5.84-2.56a18.36 18.36 0 0 1-5.84 0M15.59 14.37a6 6 0 0 0 6.32-3.11M15.59 14.37a18.36 18.36 0 0 1-5.84 0M12 12a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" /></svg>;
const CreditCardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h6m3-3.75l-3.75-3.75M14.25 8.625l3.75 3.75" /></svg>;
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.725A7.466 7.466 0 0 0 12 15.75a7.466 7.466 0 0 0-6 3m12 0a9 9 0 1 1-12 0m12 0a9 9 0 0 1-12 0m9-9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6 20.25a9 9 0 1 1 12 0M6 20.25a9 9 0 0 1 12 0" /></svg>;
const SettingsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.59 15.17A6.996 6.996 0 0 0 12 16.5a6.996 6.996 0 0 0 2.41-.33m-4.82 0A6.996 6.996 0 0 1 12 7.5a6.996 6.996 0 0 1 2.41 9.67m-4.82 0A6.996 6.996 0 0 0 7.5 12c0-1.503.468-2.9 1.258-4.03m1.152 4.03A6.97 6.97 0 0 1 12 7.5m0 0a2.25 2.25 0 0 1 2.25 2.25m-2.25 0a2.25 2.25 0 0 0-2.25 2.25M12 7.5a2.25 2.25 0 0 1 2.25 2.25m-2.25 0a2.25 2.25 0 0 0-2.25 2.25" /></svg>;
const LogOutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" /></svg>;

// Hero/Feature Icons
const GiftIconLarge = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-blue-600 dark:text-blue-400"><path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a.75.75 0 0 1-.75.75H3.75a.75.75 0 0 1-.75-.75v-8.25M12 15v3.75m0 0A1.5 1.5 0 0 1 10.5 21v-2.25M12 15V9.75M12 15a1.5 1.5 0 0 1 1.5 1.5v2.25m-1.5-3.75a1.5 1.5 0 0 0-1.5 1.5v2.25M3 11.25a9 9 0 0 1 18 0v-1.5c0-.478-.38-." /></svg>;
const BookIconLarge = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-blue-600 dark:text-blue-400"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25a8.987 8.987 0 0 1 6-3.75c1.052 0 2.062.18 3 .512a8.987 8.987 0 0 1 6 3.75v-14.25a8.967 8.967 0 0 0-6-2.292Z" /></svg>;
const HeartIconLarge = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-blue-600 dark:text-blue-400"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.015-4.5-4.5-4.5S12 5.765 12 8.25c0 2.485-2.015 4.5-4.5 4.5S3 10.735 3 8.25c0-2.485 2.015-4.5 4.5-4.5S12 5.765 12 8.25Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 21.75v-3.75m0 0a8.954 8.954 0 0 1 5.982-2.275M12 18v-3.75a8.954 8.954 0 0 0-5.982 2.275" /></svg>;


const Dash = () => {
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null); // Ref for dropdown

  const API_URL = import.meta.env.VITE_API_URL;

  // --- No Logic Change: This useEffect is identical ---
  useEffect(() => {
    if (id && (!userData || !userData.data)) {
      const fetchDataOnRefresh = async () => {
        try {
          const res = await fetch(`${API_URL}/dash`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
          });
          const response = await res.json();
          if (response.message === 'found') {
            setUserData(response.data); // This logic is kept as is
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
  }, [id, userData, setUserData, navigate, API_URL]); // Added API_URL to dependency array

  // --- Click outside to close dropdown ---
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // --- No Logic Change: Hardcoded data identical ---
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
  // --- End Hardcoded data ---

  // --- No Logic Change: Logout handler identical ---
  const handleLogout = () => {
    setUserData(null);
    localStorage.removeItem("token"); // Also clear token on logout
    navigate('/');
  };

  // --- Styled Loading State ---
  if (!userData || !userData.data) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <h2 className="text-2xl font-semibold mb-2">Loading user data... ⏳</h2>
        <p>
          If you are not redirected, please{' '}
          <Link to="/loginpage" className="text-blue-600 hover:underline">
            log in
          </Link>.
        </p>
      </div>
    );
  }

  // --- Styled Dashboard ---
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-200">
      
      {/* --- Consistent Top Header --- */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8"> {/* Full width */}
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                Hope Foundation
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="font-medium text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">Home</Link>
              <Link to="/about" className="font-medium text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">About</Link>
              <Link to="/causes" className="font-medium text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">Causes</Link>
              <Link to="/donate" className="font-medium text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">Donate</Link>
              <Link to="/contact" className="font-medium text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">Contact</Link>
            </nav>
            <div className="flex items-center space-x-3">
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownVisible((prev) => !prev)}
                  className="p-2 rounded-full text-gray-500 hover:text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 transition-colors relative"
                >
                  <BellIcon />
                  <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-900"></span>
                </button>
                {dropdownVisible && (
                  <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-md shadow-lg overflow-hidden border dark:border-gray-700">
                    <ul className="divide-y divide-gray-100 dark:divide-gray-700">
                      <li className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"><p className="font-medium">🎉 Thank you for your donation!</p></li>
                      <li className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"><p className="font-medium">📢 New campaign launched</p></li>
                      <li className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"><p className="font-medium">💡 Your impact is growing!</p></li>
                    </ul>
                  </div>
                )}
              </div>
              <button
                onClick={() => navigate(`/dash/${userData?.data._id}`)} // Assumes login sets userData.data
                className="p-2 rounded-full text-gray-500 hover:text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 transition-colors"
              >
                <UserIcon />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* --- Dashboard Layout (Sidebar + Main) --- */}
      <div className="flex">
        
        {/* --- Styled Sidebar --- */}
        <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg h-[calc(100vh-4rem)] sticky top-16 flex flex-col">
          <div className="p-4 border-b dark:border-gray-700">
            <h3 className="text-lg font-semibold text-center">Dashboard Menu</h3>
          </div>
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            
            {/* Helper function for nav links */}
            {[
              { to: `/dash/${id}`, icon: <LayoutDashboardIcon />, label: 'Dashboard', active: true }, // 'active' is hardcoded as in original
              { to: `/profile/${id}`, icon: <UserCircleIcon />, label: 'Profile' },
              { to: `/analytics/${id}`, icon: <ChartBarIcon />, label: 'Analytics' },
              { to: `/donations/${id}`, icon: <GiftIcon />, label: 'My Donations' },
              { to: `/impact/${id}`, icon: <TargetIcon />, label: 'Impact Tracker' },
              { to: '/donate', icon: <CreditCardIcon />, label: 'Donate Now' },
              { to: '/needies', icon: <UsersIcon />, label: 'Registered Needies' },
              { to: '/settings', icon: <SettingsIcon />, label: 'Settings' },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center space-x-3 px-4 py-2.5 rounded-md font-medium text-sm transition-colors ${
                  link.active
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t dark:border-gray-700">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center px-4 py-2.5 rounded-md font-medium text-sm bg-red-500 text-white hover:bg-red-600 transition-colors"
            >
              <LogOutIcon />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* --- Styled Main Content --- */}
        <main className="flex-1 p-8 overflow-y-auto h-[calc(100vh-4rem)]">
          <header className="mb-8">
            {/* This access `userData.data.name` is per your original code */}
            <h1 className="text-3xl font-bold">Welcome back, {userData?.data.name}!</h1> 
            <p className="text-lg text-gray-600 dark:text-gray-400">Here's a summary of your impactful contributions.</p>
          </header>

          {/* --- Styled Hero Section (Re-used) --- */}
          <section className="bg-blue-600 dark:bg-blue-800 rounded-xl shadow-lg my-8">
            <div className="py-12 px-8 text-center text-white">
              <h2 className="text-3xl font-bold">Together, We Can Make a Difference</h2>
              <p className="mt-4 text-lg text-blue-100 max-w-xl mx-auto">
                Your small help can bring big change to someone's life.
              </p>
              <Link to="/donate">
                <button className="mt-6 px-6 py-3 text-base font-bold text-white bg-green-600 rounded-full hover:bg-green-700 transform transition-all hover:scale-105 shadow-lg">
                  Donate Now
                </button>
              </Link>
            </div>
          </section>

          {/* --- Styled Summary Cards --- */}
          <section className="grid md:grid-cols-3 gap-6 my-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex items-center space-x-4">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                <span className="text-3xl">💰</span>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Total Donated</h4>
                <p className="text-2xl font-bold">${userStats.totalDonated.toFixed(2)}</p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex items-center space-x-4">
              <div className="p-3 bg-red-100 dark:bg-red-900 rounded-full">
                <span className="text-3xl">❤️</span>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Causes Supported</h4>
                <p className="text-2xl font-bold">{userStats.causesSupported}</p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex items-center space-x-4">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                <span className="text-3xl">🏆</span>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Impact Level</h4>
                <p className="text-2xl font-bold">{userStats.impactLevel}</p>
              </div>
            </div>
          </section>

          {/* --- Styled Recent Donations --- */}
          <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg my-8">
            <h2 className="text-2xl font-semibold mb-4">Recent Donations</h2>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {recentDonations.map((donation) => (
                <div key={donation.id} className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="mb-2 sm:mb-0">
                    <p className="font-semibold text-lg text-blue-600 dark:text-blue-400">{donation.cause}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{donation.date}</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="font-bold text-xl text-green-600">${donation.amount.toFixed(2)}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full inline-block">
                      {donation.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* --- Styled Features Section (Re-used) --- */}
          <section className="my-8">
            <div className="grid md:grid-cols-3 gap-8">
              <Link to="/causes/feed" className="block p-8 bg-white dark:bg-gray-800 rounded-xl shadow-md transform transition-all hover:shadow-lg hover:-translate-y-1">
                <div className="flex justify-center mb-4"><GiftIconLarge /></div>
                <h3 className="text-xl font-semibold text-center mb-2">Feed the Hungry</h3>
              </Link>
              <Link to="/causes/educate" className="block p-8 bg-white dark:bg-gray-800 rounded-xl shadow-md transform transition-all hover:shadow-lg hover:-translate-y-1">
                <div className="flex justify-center mb-4"><BookIconLarge /></div>
                <h3 className="text-xl font-semibold text-center mb-2">Educate a Child</h3>
              </Link>
              <Link to="/causes/medical" className="block p-8 bg-white dark:bg-gray-800 rounded-xl shadow-md transform transition-all hover:shadow-lg hover:-translate-y-1">
                <div className="flex justify-center mb-4"><HeartIconLarge /></div>
                <h3 className="text-xl font-semibold text-center mb-2">Medical Help</h3>
              </Link>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
};

export default Dash;