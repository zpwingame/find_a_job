// 从一组无序的路径集合中生成一棵二叉树

// [[D,G],[B,C],[F,I],[B,D],[C,E],[A,B],[D,F],[G,J],[E,H]]
class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

function buildTree(paths) {
    const nodeMap = new Map();

    // Create nodes for all unique values
    for (const [parent, child] of paths) {
        if (!nodeMap.has(parent)) nodeMap.set(parent, new TreeNode(parent));
        if (!nodeMap.has(child)) nodeMap.set(child, new TreeNode(child));
    }

    // Connect nodes based on the paths
    for (const [parent, child] of paths) {
        const parentNode = nodeMap.get(parent);
        const childNode = nodeMap.get(child);

        if (!parentNode.left) {
            parentNode.left = childNode;
        } else if (!parentNode.right) {
            parentNode.right = childNode;
        }
        // If both left and right are occupied, we ignore this path
    }

    // Find the root (node with no parent)
    const childSet = new Set(paths.map(path => path[1]));
    const root = Array.from(nodeMap.keys()).find(node => !childSet.has(node));

    return nodeMap.get(root);
}

// Test the function
const paths = [['D','G'],['B','C'],['F','I'],['B','D'],['C','E'],['A','B'],['D','F'],['G','J'],['E','H']];
const root = buildTree(paths);

// Helper function to print the tree (in-order traversal)
function printTree(node) {
    if (!node) return;
    printTree(node.left);
    console.log(node.val);
    printTree(node.right);
}

console.log("The built tree (in-order traversal):");
printTree(root);
