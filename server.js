// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require('util');
const { readFile } = require('fs').promises

let notesArr = [];


// Sets up the Express App
// =============================================================
const app = express();
// const PORT = 3001;
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static(path.join(__dirname, "./public"), {extensions: ["html"]}));
app.use(express.static(path.join(__dirname, "public"), {extensions: ["html"]}));



// Routes
// =============================================================

// Displays all notes
app.get("/api/notes", (req, res) => {
  //read json file
   readFile(path.join(__dirname, "/db/db.json"),"utf-8")
  .then((data) => res.json(JSON.parse(data)))
  .catch((error) => console.error(error));

  });   
  app.post("/api/notes", (req, res) => {
    // req.body hosts is equal to the JSON post sent from the user
    const newNote = req.body;
  
    console.log(newNote);
  
    db.json.push(newNote);
  
    res.json(newNote);
  });

// route that sends the user notes page
app.get("/notes", (req, res) => {
  res.sendFile("/notes");
  
});
// route that sends the user base page
app.get("*", (req, res) => {
  res.sendFile("/index.html");
});



// Starts the server to begin listening
// =============================================================
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
