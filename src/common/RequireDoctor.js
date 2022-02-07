import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { supabase } from '../supabaseConfig';

const RequireDoctor = () => {
  const user = supabase.auth.user();
  const { is_doctor } = useSelector((state) => state.user);
  const location = useLocation();
  console.log(user);
  if (!user) {
    return <Navigate to='/login' state={{ from: location }} />;
  } else if (!is_doctor) {
    return <Navigate to='/profile' state={{ from: location }} />;
  }

  return <Outlet />;
};

export default RequireDoctor;
