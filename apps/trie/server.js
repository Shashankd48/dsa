const express = require("express");
const Trie = require("./trie");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const trie = new Trie();

// Preload sample words (or you can fetch from MongoDB)
["apple", "app", "application", "banana", "bat", "bar", "bark"].forEach(
   (word) => trie.insert(word)
);

app.get("/search", (req, res) => {
   const prefix = req.query.q || "";
   const results = trie.searchPrefix(prefix.toLowerCase());
   res.json({ results });
});

app.listen(5000, () => {
   console.log("Server running on http://localhost:5000");
});
