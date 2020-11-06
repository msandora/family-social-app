import React from "react";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo//react-hooks";
// import { setContext } from "apollo-link-context";

const httpLink = createHttpLink({
  // uri: "http://localhost:5000/social-media-app-merng/us-central1/graphql",
  // uri: "https://europe-west1-social-media-app-merng.cloudfunctions.net/graphql",
//   uri: "https://whispering-badlands-31640.herokuapp.com/",
  uri: 'http://localhost:5000'
});

// const authLink = setContext(() => {
//   const token = localStorage.getItem("jwtToken");
//   return {
//     headers: {
//       Authorization: token ? `Bearer ${token}` : "",
//     },
//   };
// });

const client = new ApolloClient({
//   link: authLink.concat(httpLink),
  link: httpLink,
  cache: new InMemoryCache(),
});



function ApolloProviderWrapper({children}) {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )
}

export default ApolloProviderWrapper
