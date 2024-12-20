import { useEffect, useState } from 'react'
import { BrowserRouter,Routes,Route } from "react-router-dom"
import './App.css'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Register from './components/Register'
import Login from './components/Login'


function App() {
  

  return (
    <>
      <BrowserRouter>
        
        <Routes>
          <Route index element={<Dashboard/>} />
          <Route path='/auth/' element={<Auth/>}>
            <Route path='register' element={<Register/>} />
            <Route path='login' element={<Login/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
