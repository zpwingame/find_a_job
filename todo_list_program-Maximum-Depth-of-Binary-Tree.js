/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
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
function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val);
    this.left = (left===undefined ? null : left);
    this.right = (right===undefined ? null : right);
}

// Test case 1: [3,9,20,null,null,15,7]
const root1 = new TreeNode(3);
root1.left = new TreeNode(9);
root1.right = new TreeNode(20);
root1.right.left = new TreeNode(15);
root1.right.right = new TreeNode(7);
console.log(maxDepth(root1)); // Expected output: 3

// Test case 2: [1,null,2]
const root2 = new TreeNode(1);
root2.right = new TreeNode(2);
console.log(maxDepth(root2)); // Expected output: 2

// Test case 3: []
console.log(maxDepth(null)); // Expected output: 0

// 二叉树的最大深度
// 二叉树的最大深度（Maximum Depth of Binary Tree）问题解析：

// 1. 问题描述：
// 给定一个二叉树，找出其最大深度。
// 二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

// 2. 解题思路：
// 我们可以使用递归的方法来解决这个问题：
// - 如果树为空，深度为0
// - 否则，树的最大深度是其左子树和右子树的最大深度加1（当前节点）

// 3. 时间复杂度：
// - 我们访问每个节点一次，因此时间复杂度为O(n)，其中n是节点数

// 4. 空间复杂度：
// - 在最坏情况下（树完全不平衡），递归会调用n次（树的高度），因此需要O(n)的栈空间
// - 在最好情况下（树完全平衡），树的高度为log(n)，因此空间复杂度为O(log(n))

// 5. 注意事项：
// - 需要处理树为空的边界情况
// - 递归终止条件是当前节点为null

// 6. 优化方向：
// - 这个递归解法已经是最优解了，因为我们必须访问每个节点至少一次
// - 如果想要避免递归，可以使用迭代方法（如层序遍历）来解决，但时间复杂度仍然是O(n)
