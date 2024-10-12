import { MongoClient } from 'mongodb';

let db;

// create a new function
async function connectToDb(cb) {
  //find the article with that name
  const client = new MongoClient("mongodb://127.0.0.1:27017");
  await client.connect();

  db = client.db("react-blog-db");
  cb();
}

export {
    db,
    connectToDb,
}
