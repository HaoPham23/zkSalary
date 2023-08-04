import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';

const PrivateRoutes = () => {
  const { auth } = useContext(AuthContext);

  return auth.token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
