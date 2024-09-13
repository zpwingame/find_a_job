// 题目描述
// 华为商城举办了一个促销活动，如果某顾客是某一秒内最早时刻下单的顾客（可能是多个人），则可以获取免单。

// 请你编程计算有多少顾客可以获取免单。

// 输入描述
// 输入为 n 行数据，每一行表示一位顾客的下单时间

// 以（年-月-日时-分-秒.毫秒） yyyy-MM-ddHH:mm:ss.fff 形式给出。

// 0<n<50000
// 2000<yyyy<2020
// 0<MM<=12
// 0<dd<=28
// 0<=HH<=23
// 0<=mm<=59
// 0<=ss<=59
// 0<=fff<=999
// 所有输入保证合法。

// 输出描述
// 输出一个整数，表示有多少顾客可以获取免单。
/**
 * 计算可以获取免单的顾客数量
 * @param {string[]} orders - 顾客下单时间数组
 * @return {number} - 可以获取免单的顾客数量
 */
function countFreeOrders(orders) {
    // 将时间字符串转换为Date对象
    const dates = orders.map(order => new Date(order));
    
    // 创建一个Map来存储每秒的最早下单时间
    const earliestOrdersPerSecond = new Map();
    
    // 遍历所有订单
    for (const date of dates) {
        // 获取订单的秒级时间戳
        const secondTimestamp = Math.floor(date.getTime() / 1000);
        console.log("🚀 ~ countFreeOrders ~ secondTimestamp:", secondTimestamp)
        
        // 如果这一秒还没有记录，或者当前订单时间更早，则更新记录
        if (!earliestOrdersPerSecond.has(secondTimestamp) || 
            date < earliestOrdersPerSecond.get(secondTimestamp)) {
            earliestOrdersPerSecond.set(secondTimestamp, date);
        }
    }
    
    // 计算免单数量
    let freeOrderCount = 0;
    
    // 再次遍历所有订单，检查是否是每秒最早的订单
    for (const date of dates) {
        const secondTimestamp = Math.floor(date.getTime() / 1000);
        if (date.getTime() === earliestOrdersPerSecond.get(secondTimestamp).getTime()) {
            freeOrderCount++;
        }
    }
    
    return freeOrderCount;
}

// 测试函数
function runTest() {
    const testCases = [
        [
            "2019-01-01 00:00:00.001",
            "2019-01-01 00:00:00.002",
            "2019-01-01 00:00:00.003",
            "2019-01-01 00:00:01.000"
        ],
        [
            "2019-01-01 08:59:00.123",
            "2019-01-01 08:59:00.123",
            "2019-01-01 08:59:00.123",
            "2019-01-01 09:00:00.001"
        ]
    ];

    testCases.forEach((testCase, index) => {
        console.log(`Test Case ${index + 1}:`);
        console.log("Input:");
        testCase.forEach(order => console.log(order));
        const result = countFreeOrders(testCase);
        console.log(`Output: ${result}`);
        console.log("---");
    });
}

// 运行测试
runTest();
