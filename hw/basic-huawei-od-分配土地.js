// 题目描述
// 从前有个村庄，村民们喜欢在各种田地上插上小旗子，旗子上标识了各种不同的数字。

// 某天集体村民决定将覆盖相同数字的最小矩阵形的土地分配给村里做出巨大贡献的村民，请问此次分配土地，做出贡献的村民种最大会分配多大面积?

// 输入描述
// 第一行输入 m 和 n，

// m 代表村子的土地的长
// n 代表土地的宽
// 第二行开始输入地图上的具体标识

// 输出描述
// 此次分配土地，做出贡献的村民种最大会分配多大面积

// 备注
// 旗子上的数字为1~500，土地边长不超过500
// 未插旗子的土地用0标识
function maxLandArea(m, n, land) {
    let maxArea = 0;
    const numbers = new Set();

    // Find all unique numbers in the land
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (land[i][j] !== 0) {
                numbers.add(land[i][j]);
            }
        }
    }

    // For each unique number, find the maximum area
    for (const num of numbers) {
        let left = n, right = 0, top = m, bottom = 0;

        // Find the boundaries of the land with the current number
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                if (land[i][j] === num) {
                    left = Math.min(left, j);
                    right = Math.max(right, j);
                    top = Math.min(top, i);
                    bottom = Math.max(bottom, i);
                }
            }
        }

        // Calculate the area
        const area = (right - left + 1) * (bottom - top + 1);
        maxArea = Math.max(maxArea, area);
    }

    return maxArea;
}

// Test function
function runTests() {
    const testCases = [
        {
            input: [4, 4, [
                [1, 0, 1, 1],
                [1, 1, 0, 1],
                [1, 1, 0, 0],
                [1, 1, 0, 1]
            ]],
            expected: 9
        },
        {
            input: [3, 3, [
                [1, 2, 3],
                [1, 2, 3],
                [1, 2, 3]
            ]],
            expected: 3
        }
    ];

    testCases.forEach((testCase, index) => {
        console.log(`Test Case ${index + 1}:`);
        console.log(`Input: m = ${testCase.input[0]}, n = ${testCase.input[1]}`);
        console.log("Land:");
        testCase.input[2].forEach(row => console.log(row.join(' ')));
        const result = maxLandArea(testCase.input[0], testCase.input[1], testCase.input[2]);
        console.log(`Output: ${result}`);
        console.log(`Expected: ${testCase.expected}`);
        console.log(`Result: ${result === testCase.expected ? 'PASS' : 'FAIL'}`);
        console.log('---');
    });
}

// Run the tests
runTests();
