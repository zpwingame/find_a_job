// 题目描述
// 特定大小的停车场，数组cars[]表示，其中1表示有车，0表示没车。

// 车辆大小不一，小车占一个车位（长度1），货车占两个车位（长度2），卡车占三个车位（长度3）。

// 统计停车场最少可以停多少辆车，返回具体的数目。

// 输入描述
// 整型字符串数组cars[]，其中1表示有车，0表示没车，数组长度小于1000。

// 输出描述
// 整型数字字符串，表示最少停车数目。
/**
 * 计算停车场最少可以停多少辆车
 * @param {string[]} cars - 停车场状态数组
 * @return {string} - 最少停车数目
 */
function minParkedCars(cars) {
    let count = 0;
    let i = 0;
    
    while (i < cars.length) {
        if (cars[i] === '1') {
            // 检查是否有足够空间停卡车（3个车位）
            if (i + 2 < cars.length && cars[i+1] === '1' && cars[i+2] === '1') {
                count++;
                i += 3;
            }
            // 检查是否有足够空间停货车（2个车位）
            else if (i + 1 < cars.length && cars[i+1] === '1') {
                count++;
                i += 2;
            }
            // 停小车（1个车位）
            else {
                count++;
                i++;
            }
        } else {
            i++;
        }
    }
    
    return count.toString();
}

// 测试
function test() {
    const testCases = [
        ['1', '0', '1'],
        ['1', '1', '0', '0', '1', '1', '1', '0', '1'],
        ['1', '1', '1', '1', '1', '1', '1', '1', '1']
    ];
    
    testCases.forEach((cars, index) => {
        console.log(`Test case ${index + 1}:`);
        console.log(`Input: ${cars.join('')}`);
        console.log(`Output: ${minParkedCars(cars)}`);
        console.log('---');
    });
}

test();
