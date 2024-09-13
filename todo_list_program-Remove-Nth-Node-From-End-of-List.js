/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
function removeNthFromEnd(head, n) {
    // Create a dummy node to handle edge cases
    let dummy = new ListNode(0);
    dummy.next = head;
    
    let first = dummy;
    let second = dummy;
    
    // Advance first pointer by n+1 steps
    for (let i = 0; i <= n; i++) {
        first = first.next;
    }
    
    // Move first to the end, maintaining the gap
    while (first !== null) {
        first = first.next;
        second = second.next;
    }
    
    // Remove the target node
    second.next = second.next.next;
    
    return dummy.next;
}

// Test cases
function createLinkedList(arr) {
    let dummy = new ListNode(0);
    let current = dummy;
    for (let val of arr) {
        current.next = new ListNode(val);
        current = current.next;
    }
    return dummy.next;
}

function printLinkedList(head) {
    let result = [];
    while (head !== null) {
        result.push(head.val);
        head = head.next;
    }
    console.log(result.join(' -> '));
}

// Test case 1
let head1 = createLinkedList([1,2,3,4,5]);
console.log("Original:");
printLinkedList(head1);
let result1 = removeNthFromEnd(head1, 2);
console.log("After removing 2nd node from the end:");
printLinkedList(result1);

// Test case 2
let head2 = createLinkedList([1]);
console.log("\nOriginal:");
printLinkedList(head2);
let result2 = removeNthFromEnd(head2, 1);
console.log("After removing 1st node from the end:");
printLinkedList(result2);

// Test case 3
let head3 = createLinkedList([1,2]);
console.log("\nOriginal:");
printLinkedList(head3);
let result3 = removeNthFromEnd(head3, 1);
console.log("After removing 1st node from the end:");
printLinkedList(result3);
