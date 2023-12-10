import express, { Request, Response } from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { prismaClient } from "./lib/db";

interface userI {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

(async () => {
  const app = express();
  app.use(express.json());

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
  const PORT = Number(process.env.PORT) || 8000;

  app.get("/", (req: Request, res: Response) => {
    res.send("Hello world");
  });

  app.use("/graphql", expressMiddleware(server));

  app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
  });
})();
