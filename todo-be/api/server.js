require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const TodoSchema = require("../models/todo-model");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("DB connected..."))
  .catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.send("Hello Dileep !!!");
});

app.post("/addTodo", async (req, res) => {
  const { todo } = req.body;
  try {
    const newData = new TodoSchema({ todo });
    await newData.save();
    return res.json(await TodoSchema.find());
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

app.get("/todoList", async (req, res) => {
  try {
    return res.json(await TodoSchema.find());
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

app.put("/editTodo/:id", async (req, res) => {
  try {
    await TodoSchema.findByIdAndUpdate(req.params.id, req.body);
    return res.json(await TodoSchema.find());
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

app.delete("/deleteTodo/:id", async (req, res) => {
  try {
    await TodoSchema.findByIdAndDelete(req.params.id);
    return res.json(await TodoSchema.find());
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});

module.exports = app; // Export the app to be used by Vercel's serverless function
