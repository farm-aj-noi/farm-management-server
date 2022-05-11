import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";

import server from "./server";

// const { MONGO_USER, MONGO_PASSWORD, MONGO_DB, PORT } = process.env...  d

const PORT = process.env.PORT || 9000;

const createServer = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://MsUser:RgzYTMlTRknkKmBi@cst-3icgb.gcp.mongodb.net/Border?ssl=true&retryWrites=true&w=majority`,
      { useUnifiedTopology: true }
    )
    // await mongoose.connect(`mongodb://localhost:27017`);
    mongoose.set("useFindAndModify", false);

    const app = express();
    server.applyMiddleware({ app });

    app.listen({ port: PORT }, () =>
      console.log(
        `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
      )
    );
  } catch (error) {
    console.log(error);
  }
};

createServer();
