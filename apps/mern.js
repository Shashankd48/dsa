// 📁 Full MERN Stack Project Snippets Using Advanced Data Structures

/*
Overview:
This sample project is a simplified MERN-based application for a blogging platform
with autocomplete search, file upload caching, and background email queueing.

We'll demonstrate:
1. LRU Cache (for file upload optimization)
2. Trie (for search suggestions)
3. Queue (for background email job processing)
4. Set (for filtering tags)
5. Graph (representing user connections)
*/

// ========================
// 📦 Backend: Node + Express
// ========================

// 1. LRU Cache for File Uploads
const LRU = require("lru-cache");
const fileUploadCache = new LRU({ max: 100, maxAge: 1000 * 60 * 5 }); // 5 minutes

function uploadFile(file) {
   if (fileUploadCache.has(file.hash)) {
      return fileUploadCache.get(file.hash); // return cached result
   }
   const result = cloudStorage.upload(file);
   fileUploadCache.set(file.hash, result);
   return result;
}

// 2. Queue for Email Job (Bull + Redis)
const Queue = require("bull");
const emailQueue = new Queue("emails");

emailQueue.process(async (job) => {
   const { to, subject, body } = job.data;
   await sendEmail(to, subject, body);
});

function queueWelcomeEmail(user) {
   emailQueue.add({
      to: user.email,
      subject: "Welcome!",
      body: "Thanks for signing up.",
   });
}

// 3. Graph Representation of Users (Friend Connections)
class Graph {
   constructor() {
      this.adjacencyList = new Map();
   }

   addUser(userId) {
      if (!this.adjacencyList.has(userId)) {
         this.adjacencyList.set(userId, new Set());
      }
   }

   addFriendship(user1, user2) {
      this.adjacencyList.get(user1).add(user2);
      this.adjacencyList.get(user2).add(user1);
   }

   getFriends(userId) {
      return Array.from(this.adjacencyList.get(userId) || []);
   }
}

const userGraph = new Graph();
userGraph.addUser("u1");
userGraph.addUser("u2");
userGraph.addFriendship("u1", "u2");

// ========================
// 🧠 Frontend: React + Trie
// ========================

// 4. Trie for Search Suggestions
class TrieNode {
   constructor() {
      this.children = {};
      this.isEnd = false;
   }
}

class Trie {
   constructor() {
      this.root = new TrieNode();
   }

   insert(word) {
      let node = this.root;
      for (let char of word) {
         if (!node.children[char]) node.children[char] = new TrieNode();
         node = node.children[char];
      }
      node.isEnd = true;
   }

   suggest(prefix) {
      let node = this.root;
      for (let char of prefix) {
         if (!node.children[char]) return [];
         node = node.children[char];
      }
      return this._dfs(node, prefix);
   }

   _dfs(node, prefix) {
      let results = [];
      if (node.isEnd) results.push(prefix);
      for (let char in node.children) {
         results = results.concat(
            this._dfs(node.children[char], prefix + char)
         );
      }
      return results;
   }
}

const searchTrie = new Trie();
["react", "redux", "relay", "router"].forEach((word) =>
   searchTrie.insert(word)
);
console.log(searchTrie.suggest("re")); // ["react", "redux", "relay"]

// 5. Set to Manage Unique Tags in Posts
const tags = new Set();
function addPost(title, postTags) {
   postTags.forEach((tag) => tags.add(tag));
   console.log([...tags]);
}

addPost("Intro to React", ["react", "frontend"]);
addPost("State Management", ["redux", "react"]);

/*
These examples demonstrate how complex data structures map to real features in
modern web apps. In full MERN stack apps, these are abstracted or used through
libraries but having fundamental knowledge helps with custom logic and optimization.
*/
