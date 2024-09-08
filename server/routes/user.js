import express from "express";
import db from "../db/connection.js";

const router = express.Router();

// Create a new user in the database
router.post("/addUser", async (req, res) => {
  try {
    let newDocument = {
      _id: req.body.userId,
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    };
    let collection = await db.collection("users");
    let userResult = await collection.insertOne(newDocument);

    // Create document for transactions/categories
    newDocument = {
      _id: req.body.userId,
      categories: [],
      transactions: [],
    }
    collection = await db.collection("finances");
    let financeResult = await collection.insertOne(newDocument);
    
    res.status(201).json({
      userResult: userResult,
      financeResult: financeResult,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding user");
  }
});

// Get a user by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("users");
  let query = { _id: req.params.id };
  let result = await collection.findOne(query);

  if (result) {
    res.send(result).status(200);
  } else {
    res.status(404).send("User not found");
  }
});

// Update a user's record
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: req.params.id };
    const updates = {
      $set: req.body
    };

    let collection = await db.collection("users");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating user record.");
  }
});

export default router;