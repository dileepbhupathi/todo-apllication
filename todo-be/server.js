const express = require("express");
const app = express();
const mongoose = require("mongoose");
const TodoSchema = require("./models/todo-model");
const cors = require("cors");
app.use(express.json());
app.use(cors({ origin: "*" }));
mongoose
  .connect(
    "mongodb+srv://dileepbhupathi97:Dileep97@cluster0.znmqgls.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  )
  .then(() => {
    console.log("DB connected...");
  })
  .catch((error) => console.log(error));

// app.get("/", (req, res) => {
//   res.send("Hello Dileep !!!");
// });

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

app.listen(8000, () => {
  console.log("server running...");
});
