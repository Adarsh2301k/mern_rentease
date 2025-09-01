import React from "react"
import {Route, Routes} from "react-router-dom"
import Home from "./pages/Home"
import Contact from "./pages/Contact"
import Login from "./pages/Login"
import Navbar from "./components/Navbar"
import Register from "./pages/Register"
import Footer from "./components/Footer"
import Aboutus from "./pages/Aboutus"
import Profile from "./pages/Profile"




export default function App() {
  return (
    <div>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Aboutus />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
         
        </Routes>
      <Footer/>
    </div>
  )
}