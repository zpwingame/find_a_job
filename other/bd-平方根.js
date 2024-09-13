// x 的平方根 
// 使用二分查找法实现
function mySqrt(x) {
    if (x === 0 || x === 1) return x;
    
    let left = 1;
    let right = Math.floor(x / 2);
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const square = mid * mid;
        
        if (square === x) {
            return mid;
        } else if (square < x) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return right;
}
// 计算平方根并保留两位小数
function mySqrtWithPrecision(x) {
    if (x === 0 || x === 1) return x;
    
    let left = 0;
    let right = x;
    let precision = 0.001; // 精度为0.001，以确保两位小数的准确性
    
    while (right - left > precision) {
        let mid = (left + right) / 2;
        let square = mid * mid;
        
        if (Math.abs(square - x) < precision) {
            return Number(mid.toFixed(2));
        } else if (square < x) {
            left = mid;
        } else {
            right = mid;
        }
    }
    
    return Number(left.toFixed(2));
}

// 测试
console.log(mySqrtWithPrecision(2));  // 输出: 1.41
console.log(mySqrtWithPrecision(8));  // 输出: 2.83
console.log(mySqrtWithPrecision(10)); // 输出: 3.16
