// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require('util');
const writefileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);

let allNotes = [];


// Sets up the Express App
// =============================================================
const app = express();
// const PORT = 3001;
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static(path.join(__dirname, "./public"), {extensions: ["html"]}));
app.use(express.static(path.join(__dirname, "public"), { extensions: ["html"] }));



// Routes
// =============================================================

// Displays all notes
app.get("/api/notes", (req, res) => {
  //read json file
  readFileAsync(path.join(__dirname, "/db/db.json"), "utf-8")
    .then((data) => res.json(JSON.parse(data)))
    .catch((error) => console.error(error));

});
app.post("/api/notes", (req, res) => {
  // req.body hosts is equal to the JSON post sent from the user
  let newNote = req.body;
  readFileAsync(path.join(__dirname, "/db/db.json"), "utf-8")
    .then((data) => {
      // read current file to check for id
      allNotes = JSON.parse(data);

      // add object
      allNotes.push(newNote);

      writefileAsync(path.join(__dirname, "/db/db.json"), JSON.stringify(allNotes))
        .then(() => {
          console.log("Written successfully")
        })

      res.json(newNote);
    });
});

app.delete("/api/notes/:id", function (req, res) {
  let id = req.params.id;
  // read file json
  readFileAsync(path.join(__dirname, "./db/db.json"), "utf8")
    .then(function (data) {
      // parse data
      allNotes = JSON.parse(data);
      // use id to delete
      allNotes.splice(id, 1);
      //write to file
      writefileAsync(path.join(__dirname, "./db/db.json"), JSON.stringify(allNotes))
        .then(function () {
          console.log("Deleted successfully");
        })
    });
  res.json(id);
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
