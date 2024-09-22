import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const jwtToken = Cookies.get("jwtToken");
  if (jwtToken === undefined) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
