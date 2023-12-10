import { ApolloServer } from "@apollo/server";
import { prismaClient } from "../lib/db";
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
              createUser(firstName : String!, lastName : String!, email : String!, password : String!, salt : String!) : Boolean
            }
        `,
    resolvers: {
      Query: {
        hello: () => "Hey Hashib",
      },
      Mutation: {
        createUser: async (
          _,
          { firstName, lastName, email, password }: userI
        ) => {
          await prismaClient.user.create({
            data: {
              firstName,
              lastName,
              email,
              password,
              salt: "Something",
            },
          });

          return true;
        },
      },
    },
  });
  await server.start();

  return server;
};

export default createApolloGraphQlServer;
