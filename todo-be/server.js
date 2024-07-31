require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const TodoSchema = require("./models/todo-model");
const cors = require("cors");
const port = process.env.PORT || 8000;
app.use(express.json());
app.use(express.static("public"));
// app.use(cors({ origin: "*" }));
app.use(
  cors({
    origin: "*",
    methods: ["Get", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("DB connected...");
  })
  .catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.send("Hello Dileep !!!");
});

app.post("/addTodo", async (req, res) => {
  const { todo } = req.body;
  try {
    const newData = new TodoSchema({
      todo: todo,
    });
    await newData.save();
    return res.json(await TodoSchema.find());
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/todoList", async (req, res) => {
  try {
    return res.json(await TodoSchema.find());
  } catch (error) {
    console.log(error.message);
  }
});

app.put("/editTodo/:id", async (req, res) => {
  try {
    await TodoSchema.findByIdAndUpdate(req.params.id, req.body);
    return res.json(await TodoSchema.find());
  } catch (error) {
    console.log(error.message);
  }
});

app.delete("/deleteTodo/:id", async (req, res) => {
  try {
    await TodoSchema.findByIdAndDelete(req.params.id);
    return res.json(await TodoSchema.find());
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(port, () => {
  console.log(`server running on port ${port}...`);
});
