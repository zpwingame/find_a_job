// 题目描述
// 某业务需要根据终端的IP地址获取该终端归属的城市，可以根据公开的IP地址池信息查询归属城市。

// 地址池格式如下：

// 城市名=起始IP,结束IP

// 起始和结束地址按照英文逗号分隔，多个地址段采用英文分号分隔。比如：

// City1=1.1.1.1,1.1.1.2;City1=1.1.1.11,1.1.1.16;City2=3.3.3.3,4.4.4.4;City3=2.2.2.2,6.6.6.6

// 一个城市可以有多个IP段，比如City1有2个IP段。

// 城市间也可能存在包含关系，如City3的IP段包含City2的IP段范围。

// 现在要根据输入的IP列表，返回最佳匹配的城市列表。

// 注：最佳匹配即包含待查询IP且长度最小的IP段，比如例子中3.4.4.4最佳匹配是City2=3.3.3.3,4.4.4.4，5.5.5.5的最佳匹配是City3=2.2.2.2,6.6.6.6

// 输入描述
// 输入共2行。

// 第一行为城市的IP段列表，多个IP段采用英文分号 ';' 分隔，IP段列表最大不超过500000。城市名称只包含英文字母、数字和下划线。最多不超过100000个。IP段包含关系可能有多层，但不超过100层。

// 第二行为查询的IP列表，多个IP采用英文逗号 ',' 分隔，最多不超过10000条。

// 输出描述
// 最佳匹配的城市名列表，采用英文逗号 ',' 分隔，城市列表长度应该跟查询的IP列表长度一致。

// 备注
// 无论是否查到匹配正常都要输出分隔符。举例：假如输入IP列表为IPa,IPb，两个IP均未有匹配城市，此时输出为","，即只有一个逗号分隔符，两个城市均为空；
// 可以假定用例中的所有输入均合法，IP地址均为合法的ipv4地址，满足 (1~255).(0~255).(0~255)​​​​​​​.(0~255​​​​​​​) 的格式，且可以假定用例中不会出现组播和广播地址；
function findCityByIP(cityIPRanges, queryIPs) {
    // 解析城市IP范围
    const parsedRanges = parseCityIPRanges(cityIPRanges);
    
    // 查询每个IP
    const results = queryIPs.map(ip => findBestMatch(ip, parsedRanges));
    
    return results.join(',');
}

function parseCityIPRanges(cityIPRanges) {
    const ranges = [];
    cityIPRanges.split(';').forEach(range => {
        const [city, ipRange] = range.split('=');
        const [start, end] = ipRange.split(',');
        ranges.push({
            city,
            start: ipToNumber(start),
            end: ipToNumber(end),
            range: ipToNumber(end) - ipToNumber(start)
        });
    });
    return ranges.sort((a, b) => a.range - b.range);
}

function ipToNumber(ip) {
    return ip.split('.').reduce((total, octet) => (total << 8) + parseInt(octet), 0) >>> 0;
}

function findBestMatch(ip, ranges) {
    const ipNum = ipToNumber(ip);
    for (const range of ranges) {
        if (ipNum >= range.start && ipNum <= range.end) {
            return range.city;
        }
    }
    return '';
}

// 测试函数
function runTests() {
    const testCases = [
        {
            cityIPRanges: "City1=1.1.1.1,1.1.1.2;City1=1.1.1.11,1.1.1.16;City2=3.3.3.3,4.4.4.4;City3=2.2.2.2,6.6.6.6",
            queryIPs: "1.1.1.1,3.4.4.4,5.5.5.5,1.1.1.12",
            expected: "City1,City2,City3,City1"
        },
        {
            cityIPRanges: "CityA=1.1.1.1,2.2.2.2;CityB=3.3.3.3,4.4.4.4",
            queryIPs: "1.1.1.1,3.3.3.3,5.5.5.5",
            expected: "CityA,CityB,"
        }
    ];

    testCases.forEach((testCase, index) => {
        console.log(`Test Case ${index + 1}:`);
        console.log(`City IP Ranges: ${testCase.cityIPRanges}`);
        console.log(`Query IPs: ${testCase.queryIPs}`);
        const result = findCityByIP(testCase.cityIPRanges, testCase.queryIPs.split(','));
        console.log(`Result: ${result}`);
        console.log(`Expected: ${testCase.expected}`);
        console.log(`Test ${result === testCase.expected ? 'PASSED' : 'FAILED'}`);
        console.log('---');
    });
}

// 运行测试
runTests();
