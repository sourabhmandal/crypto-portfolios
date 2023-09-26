import type { Collection, Db, MongoClient as MongoClientType } from "mongodb";
import { MongoClient, ServerApiVersion } from "mongodb";

export let cryptoPortfolioCollection: Collection;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const MongoDBClient = async (
  uri: string,
  db_name: string,
  collection_name: string
): Promise<Collection | undefined> => {
  const client: MongoClientType = new MongoClient(uri ?? "", {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    await client.connect();

    const db: Db = client.db(db_name);

    cryptoPortfolioCollection = db.collection(collection_name ?? "");

    const pingResp = await client
      .db(process.env.MONGO_DB_NAME)
      .command({ ping: 1 });

    if (pingResp.ok == 1) {
      console.log(
        `Successfully connected to database: ${db.databaseName} and collection: ${cryptoPortfolioCollection.collectionName}`
      );
    }
    return cryptoPortfolioCollection;
  } catch {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
};

export default MongoDBClient;
