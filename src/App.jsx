import { Routes, Route, Link } from "react-router-dom";
import './App.css'
import HopeFoundation from './components/HopeFoundation'

import SignUp from "./components/SignUp";
import Login from "./components/Login";


function App() {

  return (
    <>
      <Routes>
        <Route path="/SignUp" element={<SignUp/>} />
         <Route path="/" element={<HopeFoundation />} />
        <Route path="/:id" element={<HopeFoundation/>} />
        <Route path="/loginpage" element={<Login/>}></Route>
      </Routes>
    </>
  )
}

export default App
