import { mutations } from "./mutations";
import { queries } from "./queries";
import { resolvers } from "./resolver";
import { typeDef } from "./typedef";

export const Users = { typeDef, queries, resolvers, mutations };
