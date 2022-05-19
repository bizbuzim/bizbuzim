const {
  REACT_APP_HASURA_HOST,
  REACT_APP_HASURA_PORT,
  REACT_APP_AUTH0_DOMAIN,
  REACT_APP_AUTH0_CLIENT_ID,
} = process.env;

export const BaseURL =
  "https://" + REACT_APP_HASURA_HOST + ":" + REACT_APP_HASURA_PORT;
export const Auth0Domain = REACT_APP_AUTH0_DOMAIN;
export const Auth0ClientId = REACT_APP_AUTH0_CLIENT_ID;
