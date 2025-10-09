const express = require("express");
// import express from "express";

const app = express();

app.use(express.json());

const users = [];

// HTTP Methods

// GET => Retrive Data
app.get("/", (req, res) => {
  res.send("Welcome to home!");
});

app.get("/users", (req, res) => {
  if (users.length == 0) {
    res.status(404).send("No users found!");
    return;
  }
  res.status(200).send(users);
});

// POST => Create Data
app.post("/users", (req, res) => {
  const user = req.body;
  const findUser = users.find((x) => x.id === user.id);
  if (findUser) {
    res.status(400).send("User Already Exists");
    return;
  }
  users.push(user);
  res.status(201).send("Cresated");
});

// DELETE => Remove Data
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const findUserIndex = users.findIndex((x) => x.id === id);
  if (findUserIndex == -1) {
    res.status(404).send("User not found!");
    return;
  }
  users.splice(findUserIndex, 1)
  res.status(200).send('User Deleted Successful')
});

//#####################################################################
app.listen(3000, () => {
  console.log("started on port 3000");
});
