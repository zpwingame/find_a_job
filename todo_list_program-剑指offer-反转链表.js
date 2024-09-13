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
function reverseList(head) {
    let prev = null;
    let current = head;
    
    while (current !== null) {
        let nextTemp = current.next;
        current.next = prev;
        prev = current;
        current = nextTemp;
    }
    
    return prev;
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

// Test case 1
let head1 = createLinkedList([1, 2, 3, 4, 5]);
console.log("Original list:");
printLinkedList(head1);
let reversed1 = reverseList(head1);
console.log("Reversed list:");
printLinkedList(reversed1);

// Test case 2
let head2 = createLinkedList([]);
console.log("\nOriginal list (empty):");
printLinkedList(head2);
let reversed2 = reverseList(head2);
console.log("Reversed list (empty):");
printLinkedList(reversed2);

// 题目：反转链表
// 定义一个函数，输入一个链表的头节点，反转该链表并输出反转后链表的头节点。

// 解题思路：
// 1. 使用三个指针：prev, current, 和 nextTemp
// 2. 遍历链表，每次迭代时：
//    - 保存 current 的下一个节点到 nextTemp
//    - 将 current 的 next 指向 prev
//    - 将 prev 和 current 都向前移动一步
// 3. 遍历结束后，prev 将指向新的头节点（原链表的尾节点）

// 时间复杂度：O(n)，其中 n 是链表的长度。我们需要遍历每个节点一次。
// 空间复杂度：O(1)，我们只使用了常数级别的额外空间。

// 注意：这个解法会修改原链表的结构。如果需要保持原链表不变，可以考虑在反转的过程中创建新的节点。
