/**
 * @param {number} n
 * @return {string[]}
 */
function generateParenthesis(n) {
    const result = [];
    
    function backtrack(current, open, close) {
        if (current.length === 2 * n) {
            result.push(current);
            return;
        }
        
        if (open < n) {
            backtrack(current + '(', open + 1, close);
        }
        
        if (close < open) {
            backtrack(current + ')', open, close + 1);
        }
    }
    
    backtrack('', 0, 0);
    return result;
}

// Test cases
console.log(generateParenthesis(3));
// Output: ["((()))","(()())","(())()","()(())","()()()"]

console.log(generateParenthesis(1));
// Output: ["()"]
