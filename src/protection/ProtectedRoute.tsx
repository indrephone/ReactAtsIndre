import { useContext, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import UsersContext from '../contexts/UsersContext'; // Update the file path for the module import

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const usersContext = useContext(UsersContext);

  if (!usersContext || !usersContext.loggedInUser) {

    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
