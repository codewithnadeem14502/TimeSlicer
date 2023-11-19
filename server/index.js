const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TodoModel = require("./models/Todo");
require("dotenv").config();
const app = express();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("DataBase is connected "));

app.use(cors());
app.use(express.json());

app.post("/add", (req, res) => {
  const task = req.body.task;
  TodoModel.create({
    task: task,
  })
    .then((result) => res.json(result))
    .catch((error) => res.json(error));
});

app.get("/get", (req, res) => {
  TodoModel.find({})
    .then((result) => res.json(result))
    .catch((error) => res.json(error));
});

app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  TodoModel.findById(id)
    .then((todo) => {
      const updatedDone = !todo.done;

      TodoModel.findByIdAndUpdate(
        { _id: id },
        { done: updatedDone },
        { new: true }
      )
        .then((result) => res.json(result))
        .catch((error) => res.json(error));
    })
    .catch((error) => res.json(error));
});

app.put("/edit/:id", (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndUpdate({ _id: id }, { task: req.body.task })
    .then((result) => res.json(result))
    .catch((error) => res.json(error));
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndDelete({ _id: id })
    .then((result) => res.json(result))
    .catch((error) => res.json(error));
});

app.listen(5000, () => {
  console.log("Server  is working on 5000");
});
