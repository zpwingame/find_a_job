/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
function kthLargest(root, k) {
    let count = 0;
    let result = null;

    function inorderTraversal(node) {
        if (node === null || result !== null) return;

        inorderTraversal(node.right);
        
        count++;
        if (count === k) {
            result = node.val;
            return;
        }

        inorderTraversal(node.left);
    }

    inorderTraversal(root);
    return result;
}

// Test cases
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

// Helper function to create a binary search tree from an array
function createBST(arr) {
    if (arr.length === 0) return null;
    const root = new TreeNode(arr[0]);
    for (let i = 1; i < arr.length; i++) {
        insertIntoBST(root, arr[i]);
    }
    return root;
}

function insertIntoBST(root, val) {
    if (val < root.val) {
        if (root.left === null) {
            root.left = new TreeNode(val);
        } else {
            insertIntoBST(root.left, val);
        }
    } else {
        if (root.right === null) {
            root.right = new TreeNode(val);
        } else {
            insertIntoBST(root.right, val);
        }
    }
}

// Test case 1
let root1 = createBST([3,1,4,null,2]);
console.log(kthLargest(root1, 1)); // Expected output: 4

// Test case 2
let root2 = createBST([5,3,6,2,4,null,null,1]);
console.log(kthLargest(root2, 3)); // Expected output: 4

// 题目：二叉搜索树的第k大节点
// 给定一棵二叉搜索树，请找出其中第k大的节点。

// 解题思路：
// 1. 利用二叉搜索树的特性：中序遍历的逆序就是从大到小的顺序
// 2. 进行逆序中序遍历（右-根-左），同时计数
// 3. 当计数等于k时，我们就找到了第k大的节点

// 时间复杂度：O(n)，其中n是树中的节点数。在最坏情况下，我们可能需要访问所有节点。
// 空间复杂度：O(h)，其中h是树的高度。这是由于递归调用栈的开销。
//            在最坏情况下（树呈现链状），空间复杂度为O(n)。

// 注意：这个解法假设k是有效的（即k不大于树中节点的数量）。
// 如果需要处理无效的k值，可以在函数开始时添加相应的检查。
