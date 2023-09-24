import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import dotenv from 'dotenv';
import express from 'express';
import http from "http";
import Resolvers from "./Resolvers";
import { Schema } from "./Schema";
import MongoDBClient from './database';
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

  // connect with DB
  try {
    // Connect the client to the server (optional starting in v4.7)
    await MongoDBClient.connect();
    // Send a ping to confirm a successful connection
    await MongoDBClient.db("local").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await MongoDBClient.close();
  }

  await server.start(); //start the GraphQL server.
  server.applyMiddleware({ app });
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve) //run the server on port 4000
  );
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
}
//in the end, run the server and pass in our Schema and Resolver.
startApolloServer(Schema, Resolvers);
