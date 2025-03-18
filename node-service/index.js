require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { User } = require("./models");

const app = express();
app.use(cors());
app.use(bodyParser.json());


app.get("/", (req, res) => {
    res.json({ message: "Node.js Project is Running!", port: PORT });
});

// Create User
app.post("/users", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Users
app.get("/users", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

// Get Single User
app.get("/users/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

// Update User
app.put("/users/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });

  await user.update(req.body);
  res.json(user);
});

// Delete User
app.delete("/users/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });

  await user.destroy();
  res.json({ message: "User deleted" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Node.js service running on port ${PORT}`));
