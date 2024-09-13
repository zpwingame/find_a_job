/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * @param {TreeNode} root
 * @return {number}
 */
function maxDepth(root) {
    if (root === null) {
        return 0;
    }
    
    const leftDepth = maxDepth(root.left);
    const rightDepth = maxDepth(root.right);
    
    return Math.max(leftDepth, rightDepth) + 1;
}

// Test cases
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

// Test case 1: Normal binary tree
let root1 = new TreeNode(3);
root1.left = new TreeNode(9);
root1.right = new TreeNode(20);
root1.right.left = new TreeNode(15);
root1.right.right = new TreeNode(7);
console.log(maxDepth(root1)); // Expected output: 3

// Test case 2: Single node tree
let root2 = new TreeNode(1);
console.log(maxDepth(root2)); // Expected output: 1

// Test case 3: Empty tree
console.log(maxDepth(null)); // Expected output: 0

// 题目：二叉树的深度
// 输入一棵二叉树的根节点，求该树的深度。
// 从根节点到叶节点依次经过的节点（含根、叶节点）形成树的一条路径，最长路径的长度为树的深度。

// 解题思路：
// 1. 使用递归方法解决这个问题
// 2. 如果树为空（root === null），深度为 0
// 3. 否则，分别计算左子树和右子树的深度
// 4. 树的深度是左右子树深度的较大值加 1（当前节点）

// 时间复杂度：O(n)，其中 n 是树中的节点数。我们每个节点只访问一次。
// 空间复杂度：O(h)，其中 h 是树的高度。递归调用的栈空间取决于树的高度。
// 在最坏情况下（树呈现链状），空间复杂度为 O(n)。

// 注意：这个解法使用了递归，它简洁且易于理解。
// 对于非常深的树，可能会导致栈溢出。在这种情况下，可以考虑使用迭代方法（如层次遍历）来解决问题。
