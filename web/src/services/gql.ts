import { createClient } from "urql";

import { BaseURL } from "./../config";

export default createClient({
  url: `${BaseURL}/api/v1/graphql`,
});
