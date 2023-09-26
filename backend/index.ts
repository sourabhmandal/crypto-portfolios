import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import dotenv from 'dotenv';
import express from 'express';
import http from "http";
import mongoose from "mongoose";
import Resolvers from "./Resolvers";
import { Schema } from "./Schema";
//For env File
dotenv.config();

async function startApolloServer(schema: any, resolvers: any) {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    //tell Express to attach GraphQL functionality to the server
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  }) as any;

  try {
    mongoose.connect(process.env.MONGO_URI ?? "");
  } catch (error) {
    console.error(error);
    mongoose.connection.useDb(process.env.MONGO_DB_NAME ?? "").close(true);
  }

  mongoose.connection.on("error", (err) => {
    console.error(err);
  });

  await server.start(); //start the GraphQL server.
  server.applyMiddleware({ app });
  await new Promise<void>(
    (resolve) => httpServer.listen({ port: 4000 }, resolve) //run the server on port 4000
  );

  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
}
//in the end, run the server and pass in our Schema and Resolver.
startApolloServer(Schema, Resolvers);
