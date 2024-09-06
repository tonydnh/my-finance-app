import express from "express";
import cors from "cors";
import users from "./routes/user.js";
import spending from "./routes/spending.js";
import teller from "./routes/teller.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/user", users);
app.use("/spending", spending);
app.use("/teller", teller);

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

export default app;