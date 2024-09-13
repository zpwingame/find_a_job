// 全球雪的生产出了问题，你被选中来查看情况。精灵们甚至给了你一张地图；他们在地图上用星星标记了最有可能出现问题的前五十个位置。

// 你已经做这个工作足够长的时间，知道要恢复雪的运作，你需要在12月25日之前检查所有五十颗星星。

// 通过解决谜题来收集星星。每天在降临节日历中会提供两个谜题；当你完成第一个谜题时，第二个谜题就会解锁。每个谜题可以获得一颗星星。祝你好运！

// 你试图询问为什么他们不能直接使用天气机器（"不够强大"），他们要把你送到哪里（"天空"），为什么你的地图看起来大部分是空白的（"你确实问了很多问题"），等等，你刚才是不是说了天空（"当然，你认为雪是从哪里来的"），这时你意识到精灵们已经在把你装进投石机（"请保持不动，我们需要把你绑好"）。

// 当他们进行最后的调整时，他们发现他们的校准文档（你的谜题输入）被一个非常年轻的精灵修改了，显然她只是想炫耀她的艺术技能。因此，精灵们在读取文档上的值时遇到了麻烦。

// 新改进的校准文档由多行文本组成；每行原本包含一个特定的校准值，精灵们现在需要恢复这些值。在每一行中，校准值可以通过组合第一个数字和最后一个数字（按照这个顺序）来形成一个两位数。

// 例如：

// 1abc2
// pqr3stu8vwx
// a1b2c3d4e5f
// treb7uchet
// 在这个例子中，这四行的校准值分别是12、38、15和77。将这些加起来得到142。

// 考虑你的整个校准文档。所有校准值的总和是多少？
const fs = require('fs');

function calculateCalibrationSum(input) {
    const lines = input.split('\n');
    let sum = 0;

    for (const line of lines) {
        const digits = line.match(/\d/g);
        if (digits) {
            const firstDigit = digits[0];
            const lastDigit = digits[digits.length - 1];
            const calibrationValue = parseInt(firstDigit + lastDigit);
            sum += calibrationValue;
        }
    }

    return sum;
}

// Read the input file
// const input = fs.readFileSync('input.txt', 'utf8');

// // Calculate and print the result
// const result = calculateCalibrationSum(input);
// console.log('The sum of all calibration values:', result);

// Test cases
console.log('--- Test Cases ---');

const testCases = [
    '1abc2\npqr3stu8vwx\na1b2c3d4e5f\ntreb7uchet',
    '1abc2\npqr3stu8vwx\na1b2c3d4e5f\ntreb7uchet\n2468\n13579',
    'abc\ndef\nghi',
    '1\n2\n3',
    'a1b\nc2d\ne3f',
    '1a2b3c\n4d5e6f\n7g8h9i'
];

testCases.forEach((testCase, index) => {
    console.log(`Test Case ${index + 1}:`);
    console.log('Input:');
    console.log(testCase);
    console.log('Output:', calculateCalibrationSum(testCase));
    console.log('---');
});

