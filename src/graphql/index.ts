import { ApolloServer } from "@apollo/server";
import { Users } from "./user";
interface userI {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
const createApolloGraphQlServer = async () => {
  const server = new ApolloServer({
    typeDefs: `
            type Query {
                hello : String
            }
            type Mutation {
                ${Users.mutations}
            }
        `,
    resolvers: {
      Query: {
        ...Users.resolvers.queries,
      },
      Mutation: {
        ...Users.resolvers.mutations,
      },
    },
  });
  await server.start();

  return server;
};

export default createApolloGraphQlServer;
