class DoublyNode {
   constructor(value) {
      this.value = value;
      this.next = null;
      this.prev = null;
   }
}

class DoublyLinkedList {
   constructor() {
      this.head = null;
      this.tail = null;
      this.length = 0;
   }

   // Add at the end
   append(value) {
      const newNode = new DoublyNode(value);
      if (!this.tail) {
         this.head = this.tail = newNode;
      } else {
         this.tail.next = newNode;
         newNode.prev = this.tail;
         this.tail = newNode;
      }
      this.length++;
   }

   // Add at the beginning
   prepend(value) {
      const newNode = new DoublyNode(value);
      if (!this.head) {
         this.head = this.tail = newNode;
      } else {
         newNode.next = this.head;
         this.head.prev = newNode;
         this.head = newNode;
      }
      this.length++;
   }

   // Remove from end
   removeTail() {
      if (!this.tail) return null;
      const removed = this.tail;
      this.tail = this.tail.prev;
      if (this.tail) this.tail.next = null;
      else this.head = null;
      this.length--;
      return removed.value;
   }

   // Print list forward
   printForward() {
      let current = this.head;
      const result = [];
      while (current) {
         result.push(current.value);
         current = current.next;
      }
      console.log("Forward:", result.join(" <-> "));
   }

   // Print list backward
   printBackward() {
      let current = this.tail;
      const result = [];
      while (current) {
         result.push(current.value);
         current = current.prev;
      }
      console.log("Backward:", result.join(" <-> "));
   }
}

const dll = new DoublyLinkedList();
dll.append(10);
dll.append(20);
dll.prepend(5);

dll.printForward(); // Forward: 5 <-> 10 <-> 20
dll.printBackward(); // Backward: 20 <-> 10 <-> 5

dll.removeTail();
dll.printForward(); // Forward: 5 <-> 10
