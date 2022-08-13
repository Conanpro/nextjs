import React, { useState, useContext, createContext } from "react";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  gql
} from "@apollo/client";

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();

  return (
    <authContext.Provider value={auth}>
      <ApolloProvider client={auth.createApolloClient()}>
        {children}
      </ApolloProvider>
    </authContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [authToken, setAuthToken] = useState(null);

  const getAuthHeaders = () => {
    if (!authToken) return null;

    return {
      authorization: `${authToken}`
    };
  };

  function createApolloClient() {
    const link = new HttpLink({
      uri: "https://cjwqxz.sse.codesandbox.io/",
      headers: getAuthHeaders()
    });

    return new ApolloClient({
      link,
      cache: new InMemoryCache()
    });
  }

  const signOut = () => {
    setAuthToken(null);
  };

  // const signIn = async ({ email, password }) => {
  //   const client = createApolloClient();
  //   const LoginMutation = gql`
  //     mutation signIn($email: String!, $password: String!) {
  //       signIn(email: $email, password: $password)
  //     }
  //   `;
  //   const result = await client.mutate({
  //     mutation: LoginMutation,
  //     variables: { password, email }
  //   });

  //   console.log(result);

  //   if (result?.data?.signIn) {
  //     setAuthToken(result.data.signIn);
  //   }
  // };

  // const signUp = async ({ username, password, email }) => {
  //   const client = createApolloClient();
  //   const SignUpMutation = gql`
  //     mutation signUp($username: String!, $email: String!, $password: String!) {
  //       signUp(email: $email, password: $password, username: $username)
  //     }
  //   `;
  //   const result = await client.mutate({
  //     mutation: SignUpMutation,
  //     variables: { username, password, email }
  //   });

  //   console.log(result);

  //   if (result?.data?.signUp) {
  //     setAuthToken(result.data.signUp);
  //   }
  // };

  const isSignedIn = () => {
    if (authToken) {
      return true;
    } else {
      return false;
    }
  };

  return {
    createApolloClient,
    setAuthToken,
    signOut,
    isSignedIn
  };
}
