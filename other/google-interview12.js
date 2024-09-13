// Reverse a doubly-linked list.
class Node {
    constructor(data) {
        this.data = data;
        this.prev = null;
        this.next = null;
    }
}

function reverseDoublyLinkedList(head) {
    if (!head || !head.next) {
        return head;
    }

    let current = head;
    let temp = null;

    // Swap next and prev for all nodes
    while (current !== null) {
        // Store the prev pointer
        temp = current.prev;

        // Swap prev and next pointers
        current.prev = current.next;
        current.next = temp;

        // Move to the next node (which is now current.prev due to swapping)
        current = current.prev;
    }

    // The last node is now the head
    return temp.prev;
}

// Helper function to create a doubly linked list for testing
function createDoublyLinkedList(arr) {
    if (arr.length === 0) return null;

    let head = new Node(arr[0]);
    let current = head;

    for (let i = 1; i < arr.length; i++) {
        let newNode = new Node(arr[i]);
        current.next = newNode;
        newNode.prev = current;
        current = newNode;
    }

    return head;
}

// Helper function to print the doubly linked list
function printDoublyLinkedList(head) {
    let result = [];
    let current = head;
    while (current !== null) {
        result.push(current.data);
        current = current.next;
    }
    console.log(result.join(' <-> '));
}

// Test the function
let list = createDoublyLinkedList([1, 2, 3, 4, 5]);
console.log("Original list:");
printDoublyLinkedList(list);

list = reverseDoublyLinkedList(list);
console.log("Reversed list:");
printDoublyLinkedList(list);
