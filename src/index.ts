import express, { Request, Response } from "express";
import { expressMiddleware } from "@apollo/server/express4";
import createApolloGraphQlServer from "./graphql";

(async () => {
  const app = express();
  app.use(express.json());

  const PORT = Number(process.env.PORT) || 8000;

  app.get("/", (req: Request, res: Response) => {
    res.send("Hello world");
  });

  app.use("/graphql", expressMiddleware(await createApolloGraphQlServer()));

  app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
  });
})();
