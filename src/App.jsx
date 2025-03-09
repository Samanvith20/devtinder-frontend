import { BrowserRouter, Route, Routes } from 'react-router-dom'; // ✅ Corrected import
import './App.css';
import Signup from './components/Signup';
import Body from './components/Body';

import Profile from './components/Profile';
import Feed from './components/Feed';
import Login from './components/login';

function App() {
  return (
    <BrowserRouter basename='/'>
      <Routes>
        <Route path="/" element={<Body />}> 
          <Route index element={<Feed />} /> {/* ✅ Set Feed as the default nested route */}
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
