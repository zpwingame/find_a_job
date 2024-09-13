/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
function buildTree(preorder, inorder) {
    if (preorder.length === 0 || inorder.length === 0) {
        return null;
    }

    const rootVal = preorder[0];
    const root = new TreeNode(rootVal);

    const rootIndex = inorder.indexOf(rootVal);

    const leftInorder = inorder.slice(0, rootIndex);
    const rightInorder = inorder.slice(rootIndex + 1);

    const leftPreorder = preorder.slice(1, 1 + leftInorder.length);
    const rightPreorder = preorder.slice(1 + leftInorder.length);

    root.left = buildTree(leftPreorder, leftInorder);
    root.right = buildTree(rightPreorder, rightInorder);

    return root;
}

// Test cases
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

// Helper function to print the tree in-order
function inorderTraversal(root) {
    const result = [];
    function traverse(node) {
        if (node === null) return;
        traverse(node.left);
        result.push(node.val);
        traverse(node.right);
    }
    traverse(root);
    return result;
}

// Test case 1
const preorder1 = [3,9,20,15,7];
const inorder1 = [9,3,15,20,7];
const root1 = buildTree(preorder1, inorder1);
console.log(inorderTraversal(root1)); // Expected: [9,3,15,20,7]

// Test case 2
const preorder2 = [1,2];
const inorder2 = [2,1];
const root2 = buildTree(preorder2, inorder2);
console.log(inorderTraversal(root2)); // Expected: [2,1]

// 题目：重建二叉树
// 输入某二叉树的前序遍历和中序遍历的结果，请重建该二叉树。
// 假设输入的前序遍历和中序遍历的结果中都不含重复的数字。

// 解题思路：
// 1. 前序遍历的第一个元素是根节点
// 2. 在中序遍历中找到根节点的位置，左边是左子树，右边是右子树
// 3. 递归地构建左子树和右子树

// 时间复杂度：O(n^2)，其中n是树中的节点数。
// 在最坏情况下（树呈现链状），每次都需要遍历整个inorder数组来找根节点。
// 空间复杂度：O(n)，主要是递归调用栈的开销。

// 注意：这个解法假设输入是有效的。在实际应用中，可能需要添加额外的错误检查。
// 另外，可以通过使用哈希表来存储inorder中值到索引的映射，将时间复杂度优化到O(n)。
