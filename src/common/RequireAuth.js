import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { supabase } from "../supabaseConfig";

const RequireAuth = () => {
  const user = supabase.auth.user();
  const location = useLocation();
  const { is_doctor } = useSelector((state) => state.user);
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  } else if (is_doctor) {
    return <Navigate to="/dashboard" state={{ from: location }} />;
  }

  return <Outlet />;
};

export default RequireAuth;
