import React from "react"
import {Route, Routes} from "react-router-dom"
import Home from "./pages/Home"
import Items from "./pages/Items"
import Login from "./pages/Login"
import Navbar from "./components/Navbar"
import Register from "./pages/Register"
import Footer from "./components/Footer"
import Aboutus from "./pages/Aboutus"
import Profile from "./pages/Profile"
import AddItem from "./pages/Additems"
// import Product from "./pages/Product"
import UpdateProfile from "./pages/UpdateProfile"
import PrivateRoute from "./lib/PrivateRouting"
import UpdateItem from "./pages/UpdateItem"
import ItemDetails from "./pages/ItemDetails"





export default function App() {
  return (
    <div>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Aboutus />} />
          <Route path="/items" element={<Items />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/addItem" element={<PrivateRoute><AddItem /></PrivateRoute>} />
          <Route path="/itemdetails/:id" element={<ItemDetails />} />
          <Route path="/updateProfile"  element={<PrivateRoute><UpdateProfile /></PrivateRoute>} />
          <Route path="/updateItem/:id"  element={<PrivateRoute><UpdateItem /></PrivateRoute>} />
        </Routes>
      <Footer/>
    </div>
  )
}