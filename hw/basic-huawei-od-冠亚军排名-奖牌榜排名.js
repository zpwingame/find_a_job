// 题目描述
//  2012伦敦奥运会即将到来，大家都非常关注奖牌榜的情况，现在我们假设奖牌榜的排名规则如下:

// 首先gold medal数量多的排在前面
// 其次silver medal数量多的排在前面
// 然后bronze medal数量多的排在前面
// 若以上三个条件仍无法区分名次，则以国家名称的字典顺序排定。
// 我们假设国家名称不超过二十个字符，各类奖牌数不超过100，且大于0.

// 输入描述
// 第一行输入一个整数N（0<N<21），代表国家数量，

// 然后接下来的N行，每行包含：

// 一个字符串Name表示各个国家的名称和三个整数Gi,Si,Bi表示每个获得的gold medal,silver medal,bronze medal的数量，以空格隔开，如(China 51 20 21),

// 具体见样例输入。

// 5
// China 32 28 34
// England 12 34 22
// France 23 33 2
// Japan 12 34 25
// Rusia 23 43 0

// 输出描述
// 输出奖牌榜的依次顺序，只输出国家名称，各占一行，具体见样例输出。

// China
// Rusia
// France
// Japan
// England
/**
 * 对国家进行排名
 * @param {string} input - 输入字符串
 * @return {string} - 排序后的国家名称列表
 */
function rankCountries(input) {
    const lines = input.trim().split('\n');
    const N = parseInt(lines[0]);
    const countries = [];

    for (let i = 1; i <= N; i++) {
        const [name, gold, silver, bronze] = lines[i].split(' ');
        countries.push({
            name,
            gold: parseInt(gold),
            silver: parseInt(silver),
            bronze: parseInt(bronze)
        });
    }

    countries.sort((a, b) => {
        if (a.gold !== b.gold) return b.gold - a.gold;
        if (a.silver !== b.silver) return b.silver - a.silver;
        if (a.bronze !== b.bronze) return b.bronze - a.bronze;
        return a.name.localeCompare(b.name);
    });

    return countries.map(country => country.name).join('\n');
}

// 测试函数
function runTests() {
    const testCases = [
        {
            input: `5
China 32 28 34
England 12 34 22
France 23 33 2
Japan 12 34 25
Rusia 23 43 0`,
            expected: `China
Rusia
France
Japan
England`
        },
        {
            input: `4
USA 39 41 33
China 38 32 18
Japan 27 14 17
Britain 22 21 22`,
            expected: `USA
China
Japan
Britain`
        }
    ];

    testCases.forEach((testCase, index) => {
        console.log(`Test Case ${index + 1}:`);
        console.log("Input:");
        console.log(testCase.input);
        const result = rankCountries(testCase.input);
        console.log("Output:");
        console.log(result);
        console.log(`Expected:`);
        console.log(testCase.expected);
        console.log(`Result: ${result === testCase.expected ? 'PASS' : 'FAIL'}`);
        console.log('---');
    });
}

// 运行测试
runTests();
