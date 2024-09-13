// 给定一个单链表，把所有的奇数节点和偶数节点分别排在一起。请注意，这里的奇数节 点和偶数节点指的是节点编号的奇偶性，而不是节点的值的奇偶性。
// 请尝试使用原地算法完成。你的算法的空间复杂度应为 O(1)，时间复杂度应为 O(nodes)，nodes 为节点总数。
// 示例 1:
// 入: 1->2->3->4->5->NULL 输出: 1->3->5->2->4->NULL
// 说明:
// 输入: 2->1->3->5->6->4->7->NULL 输出: 2->3->6->7->1->5->4->NULL
// 应当保持奇数节点和偶数节点的相对顺序。 链表的第一个节点视为奇数节点，第二个节点视为偶数节点，以此类推。
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var oddEvenList = function(head) {
    if (!head || !head.next) {
        return head;
    }
    
    let odd = head;
    let even = head.next;
    let evenHead = even;
    
    while (even && even.next) {
        odd.next = even.next;
        odd = odd.next;
        even.next = odd.next;
        even = even.next;
    }
    
    odd.next = evenHead;
    
    return head;
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
    console.log(result.join('->'));
}

// Test case 1
let head1 = createLinkedList([1,2,3,4,5]);
console.log("Input:");
printLinkedList(head1);
let result1 = oddEvenList(head1);
console.log("Output:");
printLinkedList(result1);

// Test case 2
let head2 = createLinkedList([2,1,3,5,6,4,7]);
console.log("\nInput:");
printLinkedList(head2);
let result2 = oddEvenList(head2);
console.log("Output:");
printLinkedList(result2);
