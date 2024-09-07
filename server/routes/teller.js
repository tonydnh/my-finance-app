// import axios from "axios";
import fs from "fs";
import dotenv from "dotenv";
import express from "express";
import https from "https";
import axios from "axios";
import userData from "../utils/userData.js";
dotenv.config();

const router = express.Router();

// Teller certificate and private key
const certPath = process.env.CERT_PATH;
const keyPath = process.env.KEY_PATH;
const agent = new https.Agent({
  cert: fs.readFileSync(certPath),
  key: fs.readFileSync(keyPath),
});

// Get bank account details
async function getAccountDetails() {
  try {
    const response = await axios.get('https://api.teller.io/accounts', {
      headers: {
        'Authorization': `Basic ${Buffer.from(`${userData.getAccessToken()}:`).toString('base64')}`
      },
      httpsAgent: agent,
    });

    userData.setBankData(response.data[1]);
  } catch (err) {
    console.error("Error fetching account details: ", err.message);
  }
}

// Get bank transactions
async function getTransactions() {
  try {
    const response = await axios.get(userData.getBankData().links.transactions, {
      headers: {
        'Authorization': `Basic ${Buffer.from(`${userData.getAccessToken()}:`).toString('base64')}`
      },
      httpsAgent: agent,
    });

    userData.setTransactions(response.data);
  } catch (err) {
    console.error("Error fetching transactions: ", err.message);
  }
}

// Get the Teller enrollment object from the frontend
router.post('/enrollment', async (req, res) => {
  userData.setAccessToken(req.body.accessToken);
  await getAccountDetails();
  await getTransactions();
  res.send("good").status(200);
})

export default router;