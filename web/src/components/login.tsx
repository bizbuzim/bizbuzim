import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";

export const Login: React.FC = () => {
  const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0();
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      loginWithRedirect();
      return;
    }
  }, [isAuthenticated, isLoading, loginWithRedirect]);
  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return <></>;
};
