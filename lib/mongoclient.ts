// lib/mongoclient.ts
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
if (!uri) throw new Error("MONGODB_URI is not defined");

// Extend NodeJS global to include _mongoClient
declare global {
  var _mongoClient: MongoClient | undefined;
}

let client = global._mongoClient;
let clientPromise: Promise<MongoClient>;

if (!client) {
  client = new MongoClient(uri);
  global._mongoClient = client;
  clientPromise = client.connect();
} else {
  clientPromise = Promise.resolve(client);
}

export default clientPromise;
