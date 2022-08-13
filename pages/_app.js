import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../theme";
import Layout from "../components/Layout";
// import { AuthProvider } from "../lib/auth.js";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </ChakraProvider>
  );
}

export default MyApp;
