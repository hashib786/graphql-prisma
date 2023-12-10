import express, { Request, Response } from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

(async () => {
  const app = express();
  app.use(express.json());

  const server = new ApolloServer({
    typeDefs: "",
    resolvers: {},
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
