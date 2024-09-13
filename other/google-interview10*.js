// Given two nodes, return the section of the tree between these two nodes.
class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

function findPathToNode(root, target, path = []) {
    if (!root) return null;
    
    path.push(root);
    
    if (root === target) return path;
    
    const leftPath = findPathToNode(root.left, target, [...path]);
    if (leftPath) return leftPath;
    
    const rightPath = findPathToNode(root.right, target, [...path]);
    if (rightPath) return rightPath;
    
    return null;
}

function getTreeSectionBetweenNodes(root, node1, node2) {
    const path1 = findPathToNode(root, node1);
    const path2 = findPathToNode(root, node2);
    
    if (!path1 || !path2) return null;
    
    let commonAncestor = null;
    let i = 0;
    while (i < path1.length && i < path2.length && path1[i] === path2[i]) {
        commonAncestor = path1[i];
        i++;
    }
    
    const result = [];
    for (let j = path1.length - 1; j >= i - 1; j--) {
        result.push(path1[j]);
    }
    for (let j = i; j < path2.length; j++) {
        result.push(path2[j]);
    }
    
    return result;
}

// Example usage:
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right.left = new TreeNode(6);
root.right.right = new TreeNode(7);

const node1 = root.left.left; // Node with value 4
const node2 = root.right.right; // Node with value 7

const treeSection = getTreeSectionBetweenNodes(root, node1, node2);
console.log(treeSection.map(node => node.value)); // Output: [4, 2, 1, 3, 7]
