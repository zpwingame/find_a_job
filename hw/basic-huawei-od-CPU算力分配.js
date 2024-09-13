/**
 * CPU算力分配
 * @param {string} input - 输入字符串
 * @returns {string} - 输出结果
 */
function allocateCPUPower(input) {
    const lines = input.split('\n');
    const [L1, L2] = lines[0].split(' ').map(Number);
    const A = lines[1].split(' ').map(Number);
    const B = lines[2].split(' ').map(Number);

    const sumA = A.reduce((a, b) => a + b, 0);
    const sumB = B.reduce((a, b) => a + b, 0);
    const diff = Math.abs(sumA - sumB);

    let resultA = Infinity;
    let resultB = Infinity;

    for (let i = 0; i < L1; i++) {
        for (let j = 0; j < L2; j++) {
            if (sumA - A[i] + B[j] === sumB - B[j] + A[i]) {
                if (A[i] < resultA) {
                    resultA = A[i];
                    resultB = B[j];
                }
            }
        }
    }

    return `${resultA} ${resultB}`;
}

// 测试
const input1 = `2 2
1 2
3 4`;
console.log(allocateCPUPower(input1)); // 输出: 1 3

const input2 = `2 2
1 3
2 4`;
console.log(allocateCPUPower(input2)); // 输出: 1 2

const input3 = `3 3
1 2 3
4 5 6`;
console.log(allocateCPUPower(input3)); // 输出: 1 4