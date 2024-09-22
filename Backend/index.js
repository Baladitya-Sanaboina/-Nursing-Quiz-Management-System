const express = require("express");
const app = express();
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const bcrypt = require("bcrypt");
let db;
const dbPath = path.join(__dirname, "quiz.db");
const intializeDbAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(4000, () => {
      console.log("port is running on 4000");
    });
  } catch (e) {
    console.log(e);
  }
};

intializeDbAndServer();
app.use(express.json());
app.get("/test", async (req, res) => {
  const response = "Hello";
  res.send(response);
});

app.post("/register", async (req, res) => {
  const { firstName, lastName, mobileNumber, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const query = `INSERT INTO users(first_name, last_name,mobile_number,email, password) VALUES(firstName, lastName, mobileNumber,password)`;
  await db.run(query, async () => {
    return res.status(200).json({ message: "Registered Succesfully" });
  });
});
