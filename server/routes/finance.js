import express from "express";
import db from "../db/connection.js";
import userData from "../utils/userData.js";

const router = express.Router();
const collection = await db.collection("finances");

// Add category to database
router.patch("/addCategory/:id", async (req, res) => {
  try {
    const query = { _id: req.params.id };
    const updates = {
      $push: {
        categories: req.body.category
      },
    };

    await collection.updateOne(query, updates);
    res.send("Success").status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding category to database.");
  }
});

// Save marked transactions with corresponding category to database
router.patch("/markTransactions/:id/:categoryId", async (req, res) => {
  try {
    const query = { _id: req.params.id, "categories.id": req.params.categoryId };
    const updates = {
      $set: {
        "categories.$.transactions": req.body,
      },
    }

    await collection.updateOne(query, updates);
    res.send("Success").status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving marked transactions to database");
  }
});

// Get transactions from database
router.get("/transactions/:id", async (req, res) => {
  try {
    // Save transactions into database (need to handle elsewhere)
    const transactions = userData.getTransactions();
    const query = { _id: req.params.id };
    const updates = {
      $set: {
        transactions: transactions
      },
    };
    await collection.updateOne(query, updates);

    if (transactions) {
      res.send(transactions).status(200);
    } else {
      res.status(404).send("Transactions not found.");
    }
  } catch (err) {
    console.error("Error handling transactions: " , err.message);
    res.status(500).send("Error processing transactions.");
  }
});

// Get the user's categories from the database
router.get("/categories/:id", async (req, res) => {
  const query = { _id: req.params.id };
  let result = await collection.findOne(query);

  if (result) {
    res.send(result.categories).status(200);
  } else {
    res.status(404).send("User not found");
  }
});

export default router;