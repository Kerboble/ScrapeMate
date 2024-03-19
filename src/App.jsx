import { useContext, useState } from 'react'
import Register from './pages/Register'
import Login from './pages/Login'
import './App.scss'
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import Home from './pages/Home'
import { AuthContext } from './context/AuthContext'
function App() {

 const {currentUser} = useContext(AuthContext);
 console.log(currentUser)


  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/">
        <Route index element={<Home/>}/> 
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        </Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
