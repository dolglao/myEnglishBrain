import * as data from '../JSON/myBrain.json' assert { type: 'json' };
import { MongoClient } from 'mongodb';

const values = Object.values(data)[0];


async function insertDocuments() {
  const client = new MongoClient('mongodb+srv://root:root@cluster0.ct8tftd.mongodb.net/myEnglishBrain?retryWrites=true&w=majority');

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Make the appropriate DB calls
    const db = client.db("myEnglishBrain");
    const collection = db.collection("myBrain");
    let count = 1
    for (const value of values) {
      const result = await collection.insertMany([value]);
      console.log(`${count}/3000 documents were inserted.`);
      count += 1;
    }
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

insertDocuments();