// 题目描述
// 宝宝和妈妈参加亲子游戏，在一个二维矩阵（N*N）的格子地图上，宝宝和妈妈抽签决定各自的位置，地图上每个格子有不同的糖果数量，部分格子有障碍物。

// 游戏规则是妈妈必须在最短的时间（每个单位时间只能走一步）到达宝宝的位置，路上的所有糖果都可以拿走，不能走障碍物的格子，只能上下左右走。

// 请问妈妈在最短到达宝宝位置的时间内最多拿到多少糖果（优先考虑最短时间到达的情况下尽可能多拿糖果）。

// 输入描述
// 第一行输入为 N，N 表示二维矩阵的大小

// 之后 N 行，每行有 N 个值，表格矩阵每个位置的值，其中：

// -3：妈妈
// -2：宝宝
// -1：障碍
// ≥0：糖果数（0表示没有糖果，但是可以走）
// 输出描述
// 输出妈妈在最短到达宝宝位置的时间内最多拿到多少糖果，行末无多余空格

// 备注
// 地图最大 50*50
/**
 * 亲子游戏
 * @param {number[][]} matrix - 游戏地图矩阵
 * @returns {number} - 最短时间内能拿到的最多糖果数
 */
function parentChildGame(matrix) {
    const n = matrix.length;
    let momPos, babyPos;

    // 找到妈妈和宝宝的位置
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] === -3) momPos = [i, j];
            if (matrix[i][j] === -2) babyPos = [i, j];
        }
    }

    // BFS队列
    const queue = [[...momPos, 0, 0]]; // [x, y, 时间, 糖果数]
    const visited = new Set();
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];

    while (queue.length > 0) {
        const [x, y, time, candies] = queue.shift();

        // 到达宝宝位置
        if (x === babyPos[0] && y === babyPos[1]) {
            return candies;
        }

        for (const [dx, dy] of directions) {
            const nx = x + dx;
            const ny = y + dy;

            if (nx >= 0 && nx < n && ny >= 0 && ny < n && matrix[nx][ny] !== -1) {
                const key = `${nx},${ny},${time + 1}`;
                if (!visited.has(key)) {
                    visited.add(key);
                    const newCandies = candies + Math.max(0, matrix[nx][ny]);
                    queue.push([nx, ny, time + 1, newCandies]);
                }
            }
        }
    }

    return 0; // 如果无法到达宝宝位置
}

// 测试
function test() {
    const testCases = [
        [
            [-3, 1, 0],
            [2, -1, 1],
            [0, 1, -2]
        ],
        [
            [-3, 1, 0, 0],
            [2, -1, 0, 1],
            [0, 1, 0, 0],
            [0, 0, 2, -2]
        ]
    ];

    testCases.forEach((matrix, index) => {
        console.log(`Test case ${index + 1}:`);
        console.log(parentChildGame(matrix));
    });
}

test();
