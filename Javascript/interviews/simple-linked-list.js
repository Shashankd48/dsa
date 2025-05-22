class Node {
   constructor(value) {
      this.value = value;
      this.next = null;
      this.prev = null;
   }

   addNext(node) {
      this.next = node;
   }

   addPrev(node) {
      this.prev = node;
   }
}

const node1 = new Node(10);
const node2 = new Node(20);
const node3 = new Node(30);

node1.addNext(node2);
node2.addNext(node3);
node2.addPrev(node1);

let currentNode = node1;
while (currentNode) {
   console.log(currentNode.value, " -> ");
   currentNode = currentNode.next;
}
