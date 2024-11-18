import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({
  children,
  requiredRole,
  isAuthenticatedRequired = false,
}) => {
  const { isAuthenticated, role } = useSelector((state) => state.user);

  if (isAuthenticatedRequired && !isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
