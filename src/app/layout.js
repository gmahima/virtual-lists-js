"use client";
import {Inter} from "next/font/google";
import "./globals.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  useQuery,
  useLazyQuery,
} from "@apollo/client";
const client = new ApolloClient({
  uri: "https://gql.hashnode.com",
  cache: new InMemoryCache(),
});
const inter = Inter({subsets: ["latin"]});

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloProvider client={client}>{children}</ApolloProvider>
      </body>
    </html>
  );
}
