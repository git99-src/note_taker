// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");




// Sets up the Express App
// =============================================================
const app = express();
// const PORT = 3001;
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "./public"), {extensions: ["html"]}));


// Routes
// =============================================================

// route that sends the user notes page
app.get("/notes", (req, res) => {
  res.sendFile("/notes");
  
});
// route that sends the user base page
app.get("/", (req, res) => {
  res.sendFile("/index.html");
});

// Displays all notes
app.get("/api/notes", (req, res) => {
    fs.readFile('db.json', (err, data) => {
      return res.json(data);
      })
  });   


// Starts the server to begin listening
// =============================================================
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
