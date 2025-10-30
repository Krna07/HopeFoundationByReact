import { Routes, Route, Link } from "react-router-dom";
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



function App() {

  return (
    <>
      <Routes>
        <Route path="/SignUp" element={<SignUp/>} />
         <Route path="/" element={<HopeFoundation />} />
         <Route path="/HopeFoundationByReact/" element={<HopeFoundation />} />
         <Route path="/about" element={<About/>} />
         <Route path="/causes" element={<Causes/>} />
         <Route path="/donate" element={<Donate/>} />
         <Route path="/contact" element={<Contact/>} />
         <Route path="/start" element={<Start/>} />
        <Route path="/dash/:id" element={<Dash/>} />
        <Route path="/profile/:id" element={<Profile/>} />
        <Route path="/analytics/:id" element={<Analytics/>} />
        <Route path="/donations/:id" element={<Dash/>} />
        <Route path="/impact/:id" element={<Dash/>} />
        <Route path="notifications" element={<Notification/>} />
        {/* <Route path="/dash/:id" element={<DashboardView/>} /> */}
        <Route path="/loginpage" element={<Login/>}></Route>
        <Route path="/needy" element={<NeedyLogin/>}></Route>
        <Route path="/needy_sign" element={<NeedySignUp/>}></Route>
        <Route path="/needy-dashboard" element={<NeedyDashboard/>}></Route>
        <Route path="/needies" element={<NeedyList/>}></Route>
      </Routes>
    </>
  )
}

export default App
