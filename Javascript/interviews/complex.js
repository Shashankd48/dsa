// 1. Stack
class Stack {
   constructor() {
      this.items = [];
   }
   push(element) {
      this.items.push(element);
   }
   pop() {
      return this.items.pop();
   }
   peek() {
      return this.items[this.items.length - 1];
   }
   isEmpty() {
      return this.items.length === 0;
   }
}

// 2. Queue
class Queue {
   constructor() {
      this.items = [];
   }
   enqueue(element) {
      this.items.push(element);
   }
   dequeue() {
      return this.items.shift();
   }
   front() {
      return this.items[0];
   }
   isEmpty() {
      return this.items.length === 0;
   }
}

// 3. Deque
class Deque {
   constructor() {
      this.items = [];
   }
   addFront(el) {
      this.items.unshift(el);
   }
   addRear(el) {
      this.items.push(el);
   }
   removeFront() {
      return this.items.shift();
   }
   removeRear() {
      return this.items.pop();
   }
}

// 4. Linked List (Singly)
class ListNode {
   constructor(val) {
      this.val = val;
      this.next = null;
   }
}

// 5. Doubly Linked List -> See previous doc

// 6. Hash Table
class HashTable {
   constructor() {
      this.table = new Array(127);
   }
   hash(key) {
      let hash = 0;
      for (let char of key) hash += char.charCodeAt(0);
      return hash % this.table.length;
   }
   set(key, value) {
      this.table[this.hash(key)] = value;
   }
   get(key) {
      return this.table[this.hash(key)];
   }
}

// 7. Set
const mySet = new Set();
mySet.add(1);
mySet.add(2);

// 8. Map
const myMap = new Map();
myMap.set("a", 1);

// 9. Binary Tree
class TreeNode {
   constructor(val) {
      this.val = val;
      this.left = null;
      this.right = null;
   }
}

// 10. Binary Search Tree
class BST {
   constructor() {
      this.root = null;
   }
   insert(val) {
      const newNode = new TreeNode(val);
      if (!this.root) this.root = newNode;
      else this.#insertNode(this.root, newNode);
   }
   #insertNode(node, newNode) {
      if (newNode.val < node.val) {
         if (!node.left) node.left = newNode;
         else this.#insertNode(node.left, newNode);
      } else {
         if (!node.right) node.right = newNode;
         else this.#insertNode(node.right, newNode);
      }
   }
}

// 11. Heap (MinHeap)
class MinHeap {
   constructor() {
      this.heap = [];
   }
   insert(val) {
      this.heap.push(val);
      let i = this.heap.length - 1;
      while (i > 0) {
         let parent = Math.floor((i - 1) / 2);
         if (this.heap[parent] <= val) break;
         [this.heap[i], this.heap[parent]] = [this.heap[parent], this.heap[i]];
         i = parent;
      }
   }
}

// 12. Trie
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
      for (let char of word) {
         if (!node.children[char]) node.children[char] = new TrieNode();
         node = node.children[char];
      }
      node.isEndOfWord = true;
   }
}

// 13. Graph (Adjacency List)
class Graph {
   constructor() {
      this.adjList = new Map();
   }
   addVertex(v) {
      this.adjList.set(v, []);
   }
   addEdge(v, w) {
      this.adjList.get(v).push(w);
   }
}

// 14. Disjoint Set (Union-Find)
class DisjointSet {
   constructor(n) {
      this.parent = Array(n)
         .fill(0)
         .map((_, i) => i);
   }
   find(x) {
      if (this.parent[x] !== x) this.parent[x] = this.find(this.parent[x]);
      return this.parent[x];
   }
   union(x, y) {
      const rootX = this.find(x);
      const rootY = this.find(y);
      if (rootX !== rootY) this.parent[rootX] = rootY;
   }
}

// ... (to be continued with next 15 structures)
// 15. Segment Tree
class SegmentTree {
   constructor(arr) {
      this.n = arr.length;
      this.tree = Array(2 * this.n);
      for (let i = 0; i < this.n; i++) this.tree[this.n + i] = arr[i];
      for (let i = this.n - 1; i > 0; --i)
         this.tree[i] = this.tree[i << 1] + this.tree[(i << 1) | 1];
   }
   query(l, r) {
      let res = 0;
      for (l += this.n, r += this.n; l < r; l >>= 1, r >>= 1) {
         if (l & 1) res += this.tree[l++];
         if (r & 1) res += this.tree[--r];
      }
      return res;
   }
}

// 16. Fenwick Tree (Binary Indexed Tree)
class FenwickTree {
   constructor(size) {
      this.tree = Array(size + 1).fill(0);
   }
   update(i, delta) {
      while (i < this.tree.length) {
         this.tree[i] += delta;
         i += i & -i;
      }
   }
   query(i) {
      let sum = 0;
      while (i > 0) {
         sum += this.tree[i];
         i -= i & -i;
      }
      return sum;
   }
}

// 17. Priority Queue (MinHeap-based)
class PriorityQueue {
   constructor() {
      this.heap = [];
   }
   enqueue(val) {
      this.insert(val);
   }
   dequeue() {
      return this.remove();
   }
   insert(val) {
      this.heap.push(val);
      let i = this.heap.length - 1;
      while (i > 0 && this.heap[Math.floor((i - 1) / 2)] > this.heap[i]) {
         [this.heap[i], this.heap[Math.floor((i - 1) / 2)]] = [
            this.heap[Math.floor((i - 1) / 2)],
            this.heap[i],
         ];
         i = Math.floor((i - 1) / 2);
      }
   }
   remove() {
      const top = this.heap[0];
      const end = this.heap.pop();
      if (this.heap.length > 0) {
         this.heap[0] = end;
         this.sinkDown(0);
      }
      return top;
   }
   sinkDown(i) {
      const length = this.heap.length;
      const element = this.heap[i];
      while (true) {
         let left = 2 * i + 1,
            right = 2 * i + 2,
            swap = null;
         if (left < length && this.heap[left] < element) swap = left;
         if (
            right < length &&
            this.heap[right] < (swap === null ? element : this.heap[left])
         )
            swap = right;
         if (swap === null) break;
         [this.heap[i], this.heap[swap]] = [this.heap[swap], this.heap[i]];
         i = swap;
      }
   }
}
