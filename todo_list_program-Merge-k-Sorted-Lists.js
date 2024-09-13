/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
function mergeKLists(lists) {
    if (!lists || lists.length === 0) return null;
    
    // Helper function to merge two sorted lists
    function mergeTwoLists(l1, l2) {
        let dummy = new ListNode(0);
        let current = dummy;
        
        while (l1 && l2) {
            if (l1.val < l2.val) {
                current.next = l1;
                l1 = l1.next;
            } else {
                current.next = l2;
                l2 = l2.next;
            }
            current = current.next;
        }
        
        if (l1) current.next = l1;
        if (l2) current.next = l2;
        
        return dummy.next;
    }
    
    // Merge lists using divide and conquer
    while (lists.length > 1) {
        let mergedLists = [];
        for (let i = 0; i < lists.length; i += 2) {
            let l1 = lists[i];
            let l2 = i + 1 < lists.length ? lists[i + 1] : null;
            mergedLists.push(mergeTwoLists(l1, l2));
        }
        lists = mergedLists;
    }
    
    return lists[0];
}

// Test cases
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

function createList(arr) {
    let dummy = new ListNode(0);
    let current = dummy;
    for (let val of arr) {
        current.next = new ListNode(val);
        current = current.next;
    }
    return dummy.next;
}

function printList(head) {
    let result = [];
    while (head) {
        result.push(head.val);
        head = head.next;
    }
    console.log(result);
}

let lists1 = [
    createList([1,4,5]),
    createList([1,3,4]),
    createList([2,6])
];
printList(mergeKLists(lists1)); // Expected output: [1,1,2,3,4,4,5,6]

let lists2 = [];
printList(mergeKLists(lists2)); // Expected output: []

let lists3 = [createList([])];
printList(mergeKLists(lists3)); // Expected output: []

// 合并K个升序链表
// 合并K个升序链表（Merge k Sorted Lists）问题解析：

// 1. 问题描述：
// 给你一个链表数组，每个链表都已经按升序排列。
// 请你将所有链表合并到一个升序链表中，返回合并后的链表。

// 2. 解题思路：
// 我们使用分治法（Divide and Conquer）来解决这个问题：
// - 将k个链表配对并将同一对中的链表合并。
// - 第一轮合并以后，k个链表被合并成了k/2个链表，平均长度为2n/k。
// - 重复这一过程，直到我们得到了最终的有序链表。

// 3. 时间复杂度：
// - 假设每个链表的平均长度是n，共有k个链表。
// - 每一轮合并的时间复杂度是O(kn)，我们需要进行log(k)轮。
// - 因此总时间复杂度是O(kn * log(k))。

// 4. 空间复杂度：
// - 我们需要O(1)的额外空间来合并两个链表。
// - 递归调用会使用O(log(k))的栈空间。
// - 因此总空间复杂度是O(log(k))。

// 5. 注意事项：
// - 需要处理边界情况，如空链表数组或只包含空链表的数组。
// - 合并两个有序链表是这个问题的子问题，可以单独实现为一个辅助函数。

// 6. 优化方向：
// - 可以使用优先队列（最小堆）来进一步优化，时间复杂度可以降低到O(N*log(k))，
//   其中N是所有节点的总数。但这需要额外的O(k)空间来存储堆。
// - 当k很大时，优先队列的方法会更有效率。
