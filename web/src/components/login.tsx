import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

export function Login() {
  const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0();
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      loginWithRedirect();
      return;
    }
  }, [isAuthenticated, isLoading]);
  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return <></>;
}
