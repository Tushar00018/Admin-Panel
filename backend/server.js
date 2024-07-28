const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const { ObjectId } = require("mongodb");

dotenv.config();
// const MONGO_URL = process.env.MONGO_URL;

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/adminpanel");
}
main().then(() => console.log("CONNECTED TO DATABASE"));

// Importing the employees route
const employeesRouter = require("./routes/employees");
app.use("/api/employees", employeesRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
