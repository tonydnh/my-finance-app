import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.ATLAS_URI || "";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1, // Specify a version
    strict: true, // Strict validation
    deprecationErrors: true,
  }
});

try {
  // Connect the client to the server
  await client.connect();
  // Send a ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });
  console.log("Pinged your deployment. You successfully conencted to MongoDB!");
} catch (err) {
  console.error(err);
}

let db = client.db("users");

export default db;