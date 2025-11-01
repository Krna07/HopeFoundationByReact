import { Routes, Route } from "react-router-dom";
import './App.css'
import HopeFoundation from './components/HopeFoundation'
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import About from "./components/About";
import Causes from "./components/Causes";
import Donate from "./components/Donate";
import Contact from "./components/Contact";
import Start from "./components/Start";
import Dash from "./components/Dash";
import Analytics from "./components/Analytics";
import Profile from "./components/Profile";
import NeedyLogin from "./components/NeedyLogin";
import NeedySignUp from "./components/NeedySignUp";
import NeedyDashboard from "./components/NeedyDashboard";
import NeedyList from "./components/NeedyList";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HopeFoundation />} />
        <Route path="/HopeFoundationByReact/" element={<HopeFoundation />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/loginpage" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/causes" element={<Causes />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/start" element={<Start />} />
        <Route path="/needy" element={<NeedyLogin />} />
        <Route path="/needy_sign" element={<NeedySignUp />} />

        {/* Protected Routes */}
        <Route path="/dash/:id" element={<ProtectedRoute><Dash /></ProtectedRoute>} />
        <Route path="/profile/:id" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/analytics/:id" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />

        {/* Needy Protected Routes */}
        <Route path="/needy-dashboard" element={<ProtectedRoute><NeedyDashboard /></ProtectedRoute>} />
        <Route path="/needies" element={<ProtectedRoute><NeedyList /></ProtectedRoute>} />

        {/* Remove wrong paths or add components if needed */}
        {/* <Route path="/donations/:id" element={<Dash/>} /> */}
        {/* <Route path="/impact/:id" element={<Dash/>} /> */}
        {/* <Route path="/notifications" element={<Notification/>} /> */}
      </Routes>
    </>
  )
}

export default App;
