/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
function middleNode(head) {
    if (!head || !head.next) return head;
    
    let slow = head;
    let fast = head;
    
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    
    return slow;
}

// Test cases
function createLinkedList(arr) {
    if (arr.length === 0) return null;
    let head = new ListNode(arr[0]);
    let current = head;
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    return head;
}

function printLinkedList(head) {
    let result = [];
    let current = head;
    while (current !== null) {
        result.push(current.val);
        current = current.next;
    }
    console.log(result.join(' -> '));
}

// Test case 1: Odd number of nodes
let head1 = createLinkedList([1, 2, 3, 4, 5]);
console.log("Original list:");
printLinkedList(head1);
let middle1 = middleNode(head1);
console.log("Middle node:");
console.log(middle1.val);

// Test case 2: Even number of nodes
let head2 = createLinkedList([1, 2, 3, 4, 5, 6]);
console.log("\nOriginal list:");
printLinkedList(head2);
let middle2 = middleNode(head2);
console.log("Middle node:");
console.log(middle2.val);

// 题目：链表的中间结点
// 给定一个头结点为 head 的非空单链表，返回链表的中间结点。
// 如果有两个中间结点，则返回第二个中间结点。

// 解题思路：
// 1. 使用快慢指针法（Floyd's Cycle-Finding Algorithm）
// 2. 设置两个指针 slow 和 fast，初始时都指向头结点
// 3. 每次迭代时，slow 向前移动一步，fast 向前移动两步
// 4. 当 fast 到达链表末尾时，slow 正好在中间位置

// 时间复杂度：O(n)，其中 n 是链表的长度。我们只遍历了链表一次。
// 空间复杂度：O(1)，我们只使用了常数级别的额外空间。

// 注意：这个解法适用于奇数和偶数长度的链表。对于偶数长度的链表，它会返回第二个中间节点。
