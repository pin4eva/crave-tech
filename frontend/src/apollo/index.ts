import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import Cookies from "js-cookie";
import { SERVER_URL, TOKEN_NAME } from "utils/constants";

const uri = `${SERVER_URL}/graphql`;

export const apollo: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
  credentials: "include",
  headers: {
    Authorization: Cookies.get(TOKEN_NAME) || " ",
  },
});
