import express from "express";
import db from "../db/connection.js";
// This will help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

const router = express.Router();

// Create a new user in the database
router.post("/addUser", async (req, res) => {
  try {
    let newDocument = {
      _id: req.body.userId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    };
    let collection = await db.collection("users");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  } catch (err) {
    console.err(err);
    res.status(500).send("Error adding record");
  }
});

// Get a user by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("users");
  let query = {_id: req.params.id};
  let result = await collection.findOne(query);

  if (!result) {
    res.send("Not found").status(404);
  } else {
    res.send(result).status(200);
  }
});

export default router