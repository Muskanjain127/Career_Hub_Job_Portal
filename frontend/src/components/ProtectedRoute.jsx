
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import LoadingSpinner from "./LoadingSpinner";

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  // Wait until authentication is checked
  if (loading) {
    return (
      <main className="ui-loading-screen">
        <LoadingSpinner size={48} label="Checking your session" />
      </main>
    );
  }

  // User is not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Role restriction
  if (role && user.role !== role) {
    if (user.role === "recruiter") {
      return <Navigate to="/recruiter-dashboard" replace />;
    }

    return <Navigate to="/candidate-dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;


