// RSA加密算法在网络安全世界中无处不在，它利用了极大整数因数分解的困难度，数据越大，安全系数越高，给定一个 32 位正整数，请对其进行因数分解，找出是哪两个素数的乘积。

// 输入描述
// 一个正整数 num 0 < num < 2147483647

// 输出描述
// 如果成功找到，以单个空格分割，从小到大输出两个素数，分解失败，请输出-1, -1

// 用例
// 输入	15
// 输出	3 5
// 输入	27
// 输出	-1 -1
function isPrime(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

function findPrimeFactors(num) {
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0 && isPrime(i) && isPrime(num / i)) {
            return [i, num / i];
        }
    }
    return [-1, -1];
}

function main(input) {
    const num = parseInt(input);
    const result = findPrimeFactors(num);
    console.log(result.join(' '));
}

// Test cases
main('15');  // Expected output: 3 5
main('27');  // Expected output: -1 -1
main('2147483647');  // Expected output: -1 -1 (this is a prime number)
main('91');  // Expected output: 7 13
