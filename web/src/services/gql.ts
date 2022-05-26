import { createClient, Client } from "urql";

import { BaseURL } from "./../config";

export default ({ token }: { token: string }): Client =>
  createClient({
    url: `${BaseURL}/v1/graphql`,
    fetchOptions: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
