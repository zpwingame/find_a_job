
// 给你单链表的头指针head和两个整数left和right，其中left<=right。请你反转从位置 left到位置right的链表节点，返回反转后的链表 。
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function(head, left, right) {
    // If left and right are the same, no need to reverse
    if (left === right) return head;
    
    let dummy = new ListNode(0);
    dummy.next = head;
    let prev = dummy;
    
    // Move to the node just before the reversal starts
    for (let i = 0; i < left - 1; i++) {
        prev = prev.next;
    }
    
    let current = prev.next;
    let nextNode;
    
    // Reverse the sublist
    for (let i = 0; i < right - left; i++) {
        nextNode = current.next;
        current.next = nextNode.next;
        nextNode.next = prev.next;
        prev.next = nextNode;
    }
    
    return dummy.next;
};

// Helper function to create a linked list from an array
function createLinkedList(arr) {
    let dummy = new ListNode(0);
    let current = dummy;
    for (let val of arr) {
        current.next = new ListNode(val);
        current = current.next;
    }
    return dummy.next;
}

// Helper function to convert a linked list to an array
function linkedListToArray(head) {
    let result = [];
    while (head) {
        result.push(head.val);
        head = head.next;
    }
    return result;
}

// Test cases
let head1 = createLinkedList([1,2,3,4,5]);
console.log(linkedListToArray(reverseBetween(head1, 2, 4))); // Expected: [1,4,3,2,5]

let head2 = createLinkedList([5]);
console.log(linkedListToArray(reverseBetween(head2, 1, 1))); // Expected: [5]
