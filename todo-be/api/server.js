require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Todo = require("../models/todo-model");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["https://todo-apllication-web.vercel.app" || "*"],
  }),
);

mongoose
  .connect(
    "mongodb+srv://dileepbhupathi97:Dileep97@cluster0.znmqgls.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )
  .then(() => console.log("DB connected..."))
  .catch((error) => console.log("DB connection error:", error));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/addTodo", async (req, res) => {
  const { todo } = req.body;
  try {
    const newTodo = new Todo({ todo });
    await newTodo.save();
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    console.error("Error adding todo:", error);
    res.status(500).send("Server error");
  }
});

app.get("/todoList", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).send("Server error");
  }
});

app.put("/editTodo/:id", async (req, res) => {
  try {
    await Todo.findByIdAndUpdate(req.params.id, req.body);
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    console.error("Error editing todo:", error);
    res.status(500).send("Server error");
  }
});

app.delete("/deleteTodo/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).send("Server error");
  }
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
