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
 * @return {boolean}
 */
function isSymmetric(root) {
    if (root === null) {
        return true;
    }
    
    function isMirror(left, right) {
        if (left === null && right === null) {
            return true;
        }
        if (left === null || right === null) {
            return false;
        }
        
        return (left.val === right.val) &&
               isMirror(left.left, right.right) &&
               isMirror(left.right, right.left);
    }
    
    return isMirror(root.left, root.right);
}

// Test cases
function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val);
    this.left = (left===undefined ? null : left);
    this.right = (right===undefined ? null : right);
}

// Test case 1: [1,2,2,3,4,4,3]
const root1 = new TreeNode(1);
root1.left = new TreeNode(2);
root1.right = new TreeNode(2);
root1.left.left = new TreeNode(3);
root1.left.right = new TreeNode(4);
root1.right.left = new TreeNode(4);
root1.right.right = new TreeNode(3);
console.log(isSymmetric(root1)); // Expected output: true

// Test case 2: [1,2,2,null,3,null,3]
const root2 = new TreeNode(1);
root2.left = new TreeNode(2);
root2.right = new TreeNode(2);
root2.left.right = new TreeNode(3);
root2.right.right = new TreeNode(3);
console.log(isSymmetric(root2)); // Expected output: false

// Test case 3: []
console.log(isSymmetric(null)); // Expected output: true

// 对称二叉树
// 对称二叉树（Symmetric Tree）问题解析：

// 1. 问题描述：
// 给定一个二叉树，检查它是否是镜像对称的。

// 2. 解题思路：
// 我们可以使用递归的方法来解决这个问题：
// - 如果树为空，它是对称的
// - 否则，检查左子树和右子树是否互为镜像
// - 两个树互为镜像的条件是：
//   - 它们的根节点值相等
//   - 第一棵树的左子树和第二棵树的右子树互为镜像
//   - 第一棵树的右子树和第二棵树的左子树互为镜像

// 3. 时间复杂度：
// - 我们遍历整棵树一次，因此时间复杂度为O(n)，其中n是节点数

// 4. 空间复杂度：
// - 在最坏情况下，递归调用会发生n次（树的高度），所以空间复杂度是O(n)
// - 在平衡树的情况下，空间复杂度是O(log n)

// 5. 注意事项：
// - 需要处理树为空的边界情况
// - 注意区分null节点和值为0的节点

// 6. 优化方向：
// - 这个递归解法已经是较优解了
// - 如果想要避免递归，可以使用迭代方法（如使用队列）来解决，但时间复杂度仍然是O(n)
