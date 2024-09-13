/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
function lowestCommonAncestor(root, p, q) {
    // If both p and q are greater than the current node, LCA is in the right subtree
    if (p.val > root.val && q.val > root.val) {
        return lowestCommonAncestor(root.right, p, q);
    }
    // If both p and q are less than the current node, LCA is in the left subtree
    if (p.val < root.val && q.val < root.val) {
        return lowestCommonAncestor(root.left, p, q);
    }
    // If one is greater and one is smaller (or one is equal), current node is the LCA
    return root;
}

// Test cases
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

// Test case 1: [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
const root1 = new TreeNode(6);
root1.left = new TreeNode(2);
root1.right = new TreeNode(8);
root1.left.left = new TreeNode(0);
root1.left.right = new TreeNode(4);
root1.right.left = new TreeNode(7);
root1.right.right = new TreeNode(9);
root1.left.right.left = new TreeNode(3);
root1.left.right.right = new TreeNode(5);

console.log(lowestCommonAncestor(root1, root1.left, root1.right).val); // Expected output: 6

// Test case 2: [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4
console.log(lowestCommonAncestor(root1, root1.left, root1.left.right).val); // Expected output: 2

// Test case 3: [2,1], p = 2, q = 1
const root2 = new TreeNode(2);
root2.left = new TreeNode(1);

console.log(lowestCommonAncestor(root2, root2, root2.left).val); // Expected output: 2

// 二叉搜索树的最近公共祖先
// 二叉搜索树的最近公共祖先（Lowest Common Ancestor of a Binary Search Tree）问题解析：

// 1. 问题描述：
// 给定一个二叉搜索树（BST），找到该树中两个指定节点的最近公共祖先（LCA）。

// 2. 解题思路：
// 利用BST的特性（左子树的所有节点值小于根节点，右子树的所有节点值大于根节点）：
// - 如果p和q的值都小于当前节点，那么LCA在左子树中
// - 如果p和q的值都大于当前节点，那么LCA在右子树中
// - 否则，当前节点就是LCA（一个在左，一个在右，或者其中一个就是当前节点）

// 3. 时间复杂度：
// - O(h)，其中h是树的高度。在最坏情况下（树呈现为一条链），h可能为n，此时复杂度为O(n)
// - 在平衡的BST中，h = log(n)，此时复杂度为O(log n)

// 4. 空间复杂度：
// - O(h)用于递归调用栈。同样，最坏情况下可能为O(n)，平衡树情况下为O(log n)

// 5. 注意事项：
// - 确保输入的树确实是一个有效的BST
// - p和q一定存在于树中

// 6. 优化方向：
// - 当前解法已经是较优解，利用了BST的特性
// - 可以考虑使用迭代而非递归来降低空间复杂度，但时间复杂度不变
