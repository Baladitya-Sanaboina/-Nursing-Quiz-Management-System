const express = require("express");
const app = express();
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");
app.use(cors());

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
  const existedUser = `SELECT * FROM users WHERE email = ?`;
  const getData = await db.get(existedUser, email);
  if (getData === undefined) {
    const query = `
      INSERT INTO users (first_name, last_name, mobile_number, email, password) 
      VALUES (?, ?, ?, ?, ?)`;
    await db.run(
      query,
      firstName,
      lastName,
      mobileNumber,
      email,
      hashedPassword
    );
    console.log("Success");
    return res.status(200).json({ message: "Registered Successfully" });
  } else {
    res.status(400).json({ message: "Already you have an account" });
  }
});

app.get("/users", async (req, res) => {
  try {
    const query = `SELECT * FROM users`;
    const data = await db.all(query);

    if (data.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const query = `SELECT * FROM users WHERE email = ?`;
  const getData = await db.get(query, email);

  if (getData === undefined) {
    res.status(400).json({ message: "userdetails not found" });
  } else {
    const passwordMatch = await bcrypt.compare(password, getData.password);
    if (passwordMatch) {
      const payLoad = { userDetails: getData.first_name };
      const jwt_token = jwt.sign(payLoad, "3422");
      res.send({ jwtToken: jwt_token });
    } else {
      res.status(400).json({ message: "Invalid Password" });
    }
  }
});
