import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./components/Signup";

import Body from "./components/Body";
import Profile from "./components/Profile";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/requests";
import Login from "./components/login";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        {/* Allow Signup & Login Without Authentication */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes Wrapped in Body */}
        <Route path="/" element={<Body />}>
          <Route index element={<Feed />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/connections" element={<Connections />} />
          <Route path="/requests" element={<Requests />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
