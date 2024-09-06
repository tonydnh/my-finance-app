// import axios from "axios";
import fs from "fs";
import dotenv from "dotenv";
import express from "express";
import https from "https";
dotenv.config();

const router = express.Router();

let accessToken;

// Teller certificate and private key
const certPath = process.env.CERT_PATH;
const keyPath = process.env.KEY_PATH;

const agent = new https.Agent({
  cert: fs.readFileSync(certPath),
  key: fs.readFileSync(keyPath),
  rejectUnauthorized: true,
});

async function callTellerAPI() {

}

// Get the Teller enrollment object from the frontend
router.post('/enrollment', async (req, res) => {
  accessToken = req.accessToken;
  res.send("good").status(200);
})

export default router;