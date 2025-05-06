import gql from 'graphql-tag';

export const typeDefs = gql`
  type Product {
    id: Int!
    name: String!
    description: String!
    price: Float!
    imageUrl: String!
    createdAt: String!
  }

  type Query {
    products: [Product!]!
  }

  type Mutation {
    addProduct(name: String!, description: String!, price: Float!, imageUrl: String!): Product!
  }
`;
