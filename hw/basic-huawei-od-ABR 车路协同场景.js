/**
 * ABR 车路协同场景
 * @param {string} input - 输入字符串，格式为 "A={a1,a2,...,am},B={b1,b2,...,bn},R=r"
 * @returns {string} - 输出结果，格式为 "(a1,b1),(a2,b2),..."
 */
function findPairs(input) {
    // 解析输入
    const [aStr, bStr, rStr] = input.split(',');
    const A = aStr.slice(3, -1).split(',').map(Number);
    const B = bStr.slice(3, -1).split(',').map(Number);
    const R = parseInt(rStr.slice(2));

    const result = [];
    let j = 0;

    for (let i = 0; i < A.length; i++) {
        let minDiff = Infinity;
        let closestB = -1;

        while (j < B.length && B[j] <= A[i] + R) {
            const diff = Math.abs(B[j] - A[i]);
            if (diff <= R && B[j] >= A[i]) {
                if (diff < minDiff) {
                    minDiff = diff;
                    closestB = B[j];
                }
            }
            j++;
        }

        if (closestB !== -1) {
            result.push(`(${A[i]},${closestB})`);
        } else {
            // 如果没有找到合适的 B，查找距离 A[i] 最近的 B
            for (let k = 0; k < B.length; k++) {
                const diff = Math.abs(B[k] - A[i]);
                if (diff < minDiff && B[k] >= A[i]) {
                    minDiff = diff;
                    closestB = B[k];
                }
            }
            if (closestB !== -1) {
                result.push(`(${A[i]},${closestB})`);
            }
        }
    }

    return result.join(',');
}

// 测试
console.log(findPairs("A={1,3,5},B={2,4,6},R=1")); // 输出: (1,2),(3,4),(5,6)
console.log(findPairs("A={1,3,5},B={2,4,6},R=2")); // 输出: (1,2),(3,4),(5,6)
console.log(findPairs("A={1,3,5},B={3,4,6},R=1")); // 输出: (1,3),(3,3),(5,6)
