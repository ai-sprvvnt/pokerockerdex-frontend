import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router';
import CurrentUserContext from '../../contexts/CurrentUserContext.js';

function ProtectedRoute({ children, onUnauthorized }) {
  const { loggedIn, isAuthChecking } = useContext(CurrentUserContext);

  useEffect(() => {
    if (!isAuthChecking && !loggedIn) {
      onUnauthorized();
    }
  }, [isAuthChecking, loggedIn, onUnauthorized]);

  if (isAuthChecking) {
    return null;
  }

  if (!loggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
