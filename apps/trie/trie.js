class TrieNode {
   constructor() {
      this.children = {};
      this.isEndOfWord = false;
   }
}

class Trie {
   constructor() {
      this.root = new TrieNode();
   }

   insert(word) {
      let node = this.root;
      for (const char of word) {
         if (!node.children[char]) node.children[char] = new TrieNode();
         node = node.children[char];
      }
      node.isEndOfWord = true;
   }

   searchPrefix(prefix) {
      let node = this.root;
      for (const char of prefix) {
         if (!node.children[char]) return [];
         node = node.children[char];
      }
      return this._collectAllWords(node, prefix);
   }

   _collectAllWords(node, prefix, results = []) {
      if (node.isEndOfWord) results.push(prefix);
      for (const char in node.children) {
         this._collectAllWords(node.children[char], prefix + char, results);
      }
      return results;
   }
}

module.exports = Trie;
