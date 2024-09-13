// You have an image on a page, write css and js so that when mouse is over the image, it rotates 180 deg with 1 sec animation.
// CSS
// const style = document.createElement('style');
// style.textContent = `
//   .rotatable-image {
//     transition: transform 1s ease;
//   }
//   .rotatable-image:hover {
//     transform: rotate(180deg);
//   }
// `;
// document.head.appendChild(style);

// // JavaScript
// document.addEventListener('DOMContentLoaded', () => {
//   const image = document.querySelector('img'); // Assuming there's an img element on the page
//   if (image) {
//     image.classList.add('rotatable-image');
//   }
// });
// Given a list of points, find out if any four of them form a square. Return 'true' if possible, else 'false'.
// Examples: [[0, 0], [2, 0], [1, 1], [0, -1], [-1, -1], [0, 2], [0, 1], [1,0]] -> true

// function isSquare(points) {
//     const n = points.length;
//     if (n < 4) return false;

//     // Function to calculate distance between two points
//     const distance = (p1, p2) => {
//         return Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2);
//     };

//     // Function to check if four points form a square
//     const checkSquare = (p1, p2, p3, p4) => {
//         const distances = [
//             distance(p1, p2), distance(p1, p3), distance(p1, p4),
//             distance(p2, p3), distance(p2, p4), distance(p3, p4)
//         ].sort((a, b) => a - b);

//         // In a square, 4 sides should be equal and 2 diagonals should be equal
//         return distances[0] === distances[1] && distances[1] === distances[2] && distances[2] === distances[3] &&
//                distances[4] === distances[5] && distances[0] > 0;
//     };

//     // Check all combinations of 4 points
//     for (let i = 0; i < n - 3; i++) {
//         for (let j = i + 1; j < n - 2; j++) {
//             for (let k = j + 1; k < n - 1; k++) {
//                 for (let l = k + 1; l < n; l++) {
//                     if (checkSquare(points[i], points[j], points[k], points[l])) {
//                         return true;
//                     }
//                 }
//             }
//         }
//     }

//     return false;
// }

// // Test the function
// console.log(isSquare([[0, 0], [2, 0], [1, 1], [0, -1], [-1, -1], [0, 2], [0, 1], [1, 0]])); // Should output: true


// Check for balanced brackets in a string.
function isBalanced(str) {
    const stack = [];
    const openBrackets = '({[';
    const closeBrackets = ')}]';
    const bracketPairs = {')': '(', '}': '{', ']': '['};

    for (let char of str) {
        if (openBrackets.includes(char)) {
            stack.push(char);
        } else if (closeBrackets.includes(char)) {
            if (stack.length === 0 || stack.pop() !== bracketPairs[char]) {
                return false;
            }
        }
    }

    return stack.length === 0;
}

// Test the function
console.log(isBalanced("({[]})"));  // true
console.log(isBalanced("([)]"));    // false
console.log(isBalanced("(("));      // false
console.log(isBalanced(""));        // true