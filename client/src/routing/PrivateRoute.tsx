
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../store/store";


const PrivateRoute: React.FC = () => {
  const { isAuthenticated, loading } = useSelector((state: RootState)=> state.user)
  
  return (
    !isAuthenticated && !loading ? <Navigate to="/login" /> : <Outlet />
  );
};

export default PrivateRoute;
