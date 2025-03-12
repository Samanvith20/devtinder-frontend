import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Signup from './components/Signup';
import Body from './components/Body';
import Profile from './components/Profile';
import Feed from './components/Feed';
import Login from './components/Login';
import Connections from './components/Connections';
import Requests from './components/requests';

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        {/* Wrap all routes inside Body */}
        <Route path="/" element={<Body />}>
          {/* Default Route inside Body → Feed */}
          <Route index element={<Feed />} />
          
          {/* Nested Routes under Body */}
          <Route path="profile" element={<Profile />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="connections" element={<Connections />} />
          <Route path="/requests" element={<Requests/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
