import { ApolloClient, gql } from "@apollo/client";
import { cache } from './cache';

export const typeDefs = gql`
  extend type Query {
    bookmarks: [ID!]!
  }
`;

const client = new ApolloClient({
    uri: "https://api.spacex.land/graphql",
    cache,
    typeDefs,
});

export default client;