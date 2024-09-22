import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";

const App = () => {
  const location = useLocation();
  const shouldShowNavbar = location.pathname !== "/login";

  return (
    <div>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/profile" element={<ProtectedRoute />}>
          <Route index element={<Profile />} />
        </Route>
        <Route path="/dashboard" element={<ProtectedRoute />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  );
};

const MainApp = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

export default MainApp;
