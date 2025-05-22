class Node {
   constructor(value) {
      this.value = value;
      this.next = null;
   }
}

class LinkedList {
   constructor() {
      this.head = null;
      this.tail = null;
      this.length = 0;
   }

   // Add node to the end
   append(value) {
      const newNode = new Node(value);
      if (!this.head) {
         this.head = this.tail = newNode;
      } else {
         this.tail.next = newNode;
         this.tail = newNode;
      }
      this.length++;

      console.log("head", this.head);
      console.log("tail", this.tail);
   }

   // Add node to the beginning
   prepend(value) {
      const newNode = new Node(value);
      if (!this.head) {
         this.head = this.tail = newNode;
      } else {
         newNode.next = this.head;
         this.head = newNode;
      }
      this.length++;

      console.log("head", this.head);
      console.log("tail", this.tail);
   }

   // Remove node from beginning
   removeHead() {
      if (!this.head) return null;
      const removed = this.head;
      this.head = this.head.next;
      if (!this.head) this.tail = null;
      this.length--;
      return removed.value;
   }

   // Print list values
   printList() {
      let current = this.head;
      const values = [];
      while (current) {
         values.push(current.value);
         current = current.next;
      }
      console.log(values.join(" -> "));
   }
}

const list = new LinkedList();

list.append(10);
list.append(20);
list.prepend(5);

// list.printList();

// list.append(30);

// list.printList();

// list.prepend(1);

// list.printList();
