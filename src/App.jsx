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


function App() {

  return (
    <>
      <Routes>
        <Route path="/SignUp" element={<SignUp/>} />
         <Route path="/" element={<HopeFoundation />} />
         <Route path="/about" element={<About/>} />
         <Route path="/causes" element={<Causes/>} />
         <Route path="/donate" element={<Donate/>} />
         <Route path="/contact" element={<Contact/>} />
         <Route path="/start" element={<Start/>} />
        <Route path="/dash/:id" element={<Dash/>} />
        <Route path="/loginpage" element={<Login/>}></Route>
      </Routes>
    </>
  )
}

export default App
