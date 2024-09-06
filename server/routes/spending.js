import express from "express";
import db from "../db/connection.js";

const router = express.Router();

// Add category to database
router.patch("/:id/addCategory", async (req, res) => {
  try {
    const query = { _id: req.params.id };
    const updates = {
      $push: {
        categories: req.body.category
      },
    };

    let collection = await db.collection("spending");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding category to database.");
  }
});

export default router;