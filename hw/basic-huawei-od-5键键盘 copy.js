/**
 * 5键键盘问题
 * 
 * 有一个特殊的5键键盘，上面有A、Ctrl-C、Ctrl-X、Ctrl-V、Ctrl-A五个键。
 * A键在屏幕上输出一个字母A，Ctrl-C将当前选择的字母复制到剪贴板，
 * Ctrl-X将当前选择的字母复制到剪贴板并清空选择的字母，
 * Ctrl-V将当前剪贴板里的字母输出到屏幕，Ctrl-A选择当前屏幕上的所有字母。
 * 注意：
 * 1. 剪贴板初始为空，新的内容被复制到剪贴板时会覆盖原来的内容
 * 2. 当屏幕上没有字母时，Ctrl-A无效
 * 3. 当没有选择字母时，Ctrl-C和Ctrl-X无效
 * 4. 当有字母被选择时，A和Ctrl-V这两个有输出功能的键会先清空选择的字母，再进行输出
 * 
 * 给定一系列键盘输入，求屏幕上字母的数量
 * 
 * @param {number} n - 键盘操作的次数
 * @param {number[]} keys - 键盘操作序列，其中1代表A，2代表Ctrl-C，3代表Ctrl-X，4代表Ctrl-V，5代表Ctrl-A
 * @return {number} 屏幕上字母的数量
 */
function getScreenLetterCount(n, keys) {
    let screen = '';
    let clipboard = '';
    let selected = false;

    for (let i = 0; i < n; i++) {
        switch (keys[i]) {
            case 1: // A
                if (selected) {
                    screen = '';
                    selected = false;
                }
                screen += 'A';
                break;
            case 2: // Ctrl-C
                if (selected) {
                    clipboard = screen;
                }
                break;
            case 3: // Ctrl-X
                if (selected) {
                    clipboard = screen;
                    screen = '';
                    selected = false;
                }
                break;
            case 4: // Ctrl-V
                if (selected) {
                    screen = '';
                    selected = false;
                }
                screen += clipboard;
                break;
            case 5: // Ctrl-A
                if (screen.length > 0) {
                    selected = true;
                }
                break;
        }
    }

    return screen.length;
}

// 测试用例
console.log(getScreenLetterCount(5, [1, 1, 1, 1, 1])); // 输出: 5
console.log(getScreenLetterCount(7, [1, 1, 5, 2, 4, 4, 4])); // 输出: 6
