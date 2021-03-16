import fs from "fs"
import path from "path"
import { ApolloServer } from "apollo-server-express"
import dotenv from "dotenv";
dotenv.config();

// import typeDefs from "./schema/typeDefs"
import resolvers from "./resolvers"
import getUser from "./utils/getUser"

const typeDefs = fs
  .readFileSync(path.join(__dirname, "./schema", "schema.graphql"), "utf8")
  .toString()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  engine: {    
    reportSchema: true,
    graphVariant: "current"
  },
  introspection: true,
  playground: true,
  tracing: true,
  // apollo: process.env.APOLLO_KEY,
  context: ({ req }) => {
    // Check token from headers
    const token = req.headers.authorization || ""

    // Extract userId from token
    const userId = getUser(token)

    // console.log('User ID : ',userId)

    return { userId }
  }
})

export default server
