const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Trie = require("./trie");
const Word = require("./models/Word");

const app = express();
app.use(cors());
app.use(express.json());

const trie = new Trie();

// 🔗 Connect MongoDB
mongoose.connect("mongodb://localhost:27017/triedb", {
   useNewUrlParser: true,
   useUnifiedTopology: true,
});

// 🔃 Load all words from DB into Trie
const loadTrieFromDB = async () => {
   const words = await Word.find({});
   words.forEach(({ text }) => trie.insert(text.toLowerCase()));
   console.log(`🔠 Loaded ${words.length} words into Trie`);
};

loadTrieFromDB();

// 🌐 GET /search?q=prefix
app.get("/search", (req, res) => {
   const prefix = req.query.q || "";
   const results = trie.searchPrefix(prefix.toLowerCase());
   res.json({ results });
});

// ➕ POST /add { text: "newword" }
app.post("/add", async (req, res) => {
   const { text } = req.body;
   if (!text) return res.status(400).json({ error: "Word is required" });

   const lower = text.toLowerCase();
   trie.insert(lower);
   try {
      await Word.updateOne(
         { text: lower },
         { $setOnInsert: { text: lower } },
         { upsert: true }
      );
      res.status(201).json({ message: "Word added to Trie and DB" });
   } catch (err) {
      res.status(500).json({ error: "Failed to add word" });
   }
});

app.listen(5000, () =>
   console.log("🚀 Server running at http://localhost:5000")
);
