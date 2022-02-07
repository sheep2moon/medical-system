import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { supabase } from '../supabaseConfig';

const RequireAuth = () => {
  const user = supabase.auth.user();
  const location = useLocation();
  console.log(user);
  if (!user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return <Outlet />;
};

export default RequireAuth;
