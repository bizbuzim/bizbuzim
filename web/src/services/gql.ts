import { ApolloClient, InMemoryCache } from "@apollo/client";
import {BaseURL} from './../config'

export default new ApolloClient({
    cache: new InMemoryCache(),
    uri: `${BaseURL}/api/v1/graphql`,
});
