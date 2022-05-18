import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";

export const Login: React.FC<{ onJWTReceived(jwt: string): void }> = ({
  onJWTReceived,
}) => {
  const { isLoading, isAuthenticated, loginWithRedirect, getIdTokenClaims } =
    useAuth0();
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      loginWithRedirect();
      return;
    }
    getIdTokenClaims().then((t) => onJWTReceived(t?.__raw || ""));
  }, [
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    getIdTokenClaims,
    onJWTReceived,
  ]);
  if (isLoading) {
    return <div>Loading ...</div>;
  }
  if (!isAuthenticated) {
    alert("not authenticated");
  }
  return <></>;
};
