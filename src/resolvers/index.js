import { GraphQLDateTime } from "graphql-iso-date"

import Query from "./query/index"
// import Mutation from "./mutation"
import Mutation from "./mutation/index"

const resolvers = {
  Query,
  Mutation,
  Date: GraphQLDateTime
}

export default resolvers
