

import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Signup from './components/Signup'
import Navbar from './components/Navbar'
import Body from './components/Body'
import Login from './components/login'

function App() {


  return (
    <>
      <BrowserRouter >
      <Routes>
       
          <Route path="/" element={<Body />} />
          <Route path="/login" element={<Login />} />
        
          <Route path="/signup" element={<Signup />} />
          <Route path="/navbar" element={<Navbar />} />
       
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
