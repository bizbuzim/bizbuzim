import { createClient } from "urql";

import { BaseURL } from "./../config";

export default createClient({
  url: `${BaseURL}/v1/graphql`,
});
