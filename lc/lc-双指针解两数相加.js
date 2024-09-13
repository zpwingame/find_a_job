// 给你两个非空的链表，表示两个非负的整数。它们每位数字都是按照逆序的方式存储 的，并且每个节点只能存储一位数字。请你将两个数相加，并以相同形式返回一个表示 和的链表。
// 你可以假设除了数字0之外，这两个数都不会以0开头。
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    let dummyHead = new ListNode(0);
    let current = dummyHead;
    let carry = 0;
    
    while (l1 !== null || l2 !== null) {
        const x = l1 !== null ? l1.val : 0;
        const y = l2 !== null ? l2.val : 0;
        const sum = carry + x + y;
        carry = Math.floor(sum / 10);
        current.next = new ListNode(sum % 10);
        current = current.next;
        
        if (l1 !== null) l1 = l1.next;
        if (l2 !== null) l2 = l2.next;
    }
    
    if (carry > 0) {
        current.next = new ListNode(carry);
    }
    
    return dummyHead.next;
};

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
    while (head) {
        result.push(head.val);
        head = head.next;
    }
    console.log(result.join(' -> '));
}

// Test case 1
let l1 = createLinkedList([2,4,3]);
let l2 = createLinkedList([5,6,4]);
console.log("Input:");
printLinkedList(l1);
printLinkedList(l2);
let result = addTwoNumbers(l1, l2);
console.log("Output:");
printLinkedList(result);

// Test case 2
l1 = createLinkedList([0]);
l2 = createLinkedList([0]);
console.log("\nInput:");
printLinkedList(l1);
printLinkedList(l2);
result = addTwoNumbers(l1, l2);
console.log("Output:");
printLinkedList(result);

// Test case 3
l1 = createLinkedList([9,9,9,9,9,9,9]);
l2 = createLinkedList([9,9,9,9]);
console.log("\nInput:");
printLinkedList(l1);
printLinkedList(l2);
result = addTwoNumbers(l1, l2);
console.log("Output:");
printLinkedList(result);
