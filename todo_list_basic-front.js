// TCP三次握手和四次挥手

// 三次握手（建立连接）：
// 1. 客户端发送SYN包到服务器，进入SYN_SENT状态
//    - SYN = 1, seq = x（x为随机数）
// 2. 服务器收到SYN包，回复SYN+ACK包，进入SYN_RECEIVED状态
//    - SYN = 1, ACK = 1, seq = y（y为随机数）, ack = x + 1
// 3. 客户端收到SYN+ACK包，回复ACK包，双方进入ESTABLISHED状态
//    - ACK = 1, seq = x + 1, ack = y + 1

// 四次挥手（断开连接）：
// 1. 客户端发送FIN包，进入FIN_WAIT_1状态
//    - FIN = 1, seq = u
// 2. 服务器收到FIN包，发送ACK包，进入CLOSE_WAIT状态
//    - ACK = 1, seq = v, ack = u + 1
// 3. 服务器发送FIN包，进入LAST_ACK状态
//    - FIN = 1, ACK = 1, seq = w, ack = u + 1
// 4. 客户端收到FIN包，发送ACK包，进入TIME_WAIT状态
//    - ACK = 1, seq = u + 1, ack = w + 1
//    客户端等待2MSL（最大报文生存时间）后，若无重传，则关闭连接

// 注意：
// - 三次握手确保双方都有发送和接收的能力
// - 四次挥手是因为TCP是全双工的，每个方向都需要单独关闭
// - TIME_WAIT状态是为了确保最后一个ACK能够到达服务器，防止旧连接的数据包影响新连接

// 事件循环（Event Loop）中的微任务和宏任务

// 1. 宏任务（Macrotasks）：
// - 定义：宏任务是由宿主环境（如浏览器、Node.js）提供的任务
// - 常见例子：
//   - setTimeout, setInterval
//   - I/O操作
//   - UI渲染
//   - setImmediate (Node.js)
//   - requestAnimationFrame (浏览器)
// - 特点：每次事件循环只会执行一个宏任务

// 2. 微任务（Microtasks）：
// - 定义：微任务是由JavaScript引擎提供的任务
// - 常见例子：
//   - Promise的then、catch、finally回调
//   - MutationObserver回调
//   - process.nextTick (Node.js)
//   - queueMicrotask
// - 特点：在当前宏任务执行完后，事件循环会清空微任务队列

// 事件循环执行顺序：
// 1. 执行同步代码（这是一个宏任务）
// 2. 执行所有微任务
// 3. 执行一个宏任务
// 4. 再次执行所有微任务
// 5. 重复步骤3和4

// 示例：
// console.log('1'); // 同步代码
// setTimeout(() => console.log('2'), 0); // 宏任务
// Promise.resolve().then(() => console.log('3')); // 微任务
// console.log('4'); // 同步代码

// 输出顺序：1, 4, 3, 2

// 注意事项：
// - 微任务优先级高于宏任务
// - 新创建的微任务会被添加到当前微任务队列的末尾，并在当前事件循环中执行
// - 新创建的微任务会被添加到当前微任务队列的末尾，并在当前事件循环中执行
// - 不同环境（浏览器、Node.js）可能有细微差异
// - 理解事件循环对于编写高效、非阻塞的JavaScript代码至关重要


// 使用requestAnimationFrame实现每次改变1万个节点而不卡顿

function updateNodes(nodes, startIndex, chunkSize) {
    const endIndex = Math.min(startIndex + chunkSize, nodes.length);
    
    for (let i = startIndex; i < endIndex; i++) {
        // 这里是更新节点的逻辑
        // 例如：改变节点的样式、内容等
        nodes[i].textContent = `Updated Node ${i}`;
        nodes[i].style.backgroundColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
    }
    
    if (endIndex < nodes.length) {
        requestAnimationFrame(() => {
            updateNodes(nodes, endIndex, chunkSize);
        });
    }
}

function updateManyNodesWithoutFreezing() {
    const totalNodes = 100000; // 总共10万个节点
    const chunkSize = 10000; // 每次更新1万个节点
    
    // 创建节点
    const container = document.createElement('div');
    for (let i = 0; i < totalNodes; i++) {
        const node = document.createElement('div');
        node.textContent = `Node ${i}`;
        container.appendChild(node);
    }
    document.body.appendChild(container);
    
    // 开始更新节点
    requestAnimationFrame(() => {
        updateNodes(container.children, 0, chunkSize);
    });
}

// 调用函数开始更新
// updateManyNodesWithoutFreezing();



function debounce(fn, time) {
    let d;

    return function (...args) {
        clearTimeout(d)
        d = setTimeout(() => {
            // fn(params)
            fn.apply(this, args)
        }, time);
    }
    
}
function throttle(fn, time) {

    return  function name(...args) {
        let date1 = Date.getTime();
        if(date1 - lasTime < time) {
            return ;
        }
        lasTime = Date.getTime();

        setTimeout(() => {
            time1 = Date.now();

            fn.apply(this, args)
        }, time);
    }
}

function curry(fn) {
    return function name(...args) {
        if(args.length >= fn.length) {
            return fn.apply(this, args)
        } else {
            return function (...params1) {
                return name.apply(this, args.concat(params1))
            }
        }
    }
    
}

// function curry(fn) {
//     return function curried(...args) {
//         if (args.length >= fn.length) {
//             return fn.apply(this, args);
//         } else {
//             return function(...moreArgs) {
//                 return curried.apply(this, args.concat(moreArgs));
//             }
//         }
//     }
// }

// // Example usage:
// function add(a, b, c) {
//     return a + b + c;
// }

// const curriedAdd = curry(add);

// console.log(curriedAdd(1)(2)(3));  // 6
// console.log(curriedAdd(1, 2)(3));  // 6
// console.log(curriedAdd(1)(2, 3));  // 6
// console.log(curriedAdd(1, 2, 3));  // 6


// 前端练习小编程题目

// 1. 编写一个函数，在不使用内置reverse()方法的情况下反转字符串。
// 示例：reverseString("hello") 应返回 "olleh"

function reverseString(params) {
    let stack = []
    for(let i of params) {
        stack.push(i)
    }
    let result = ''
    while(stack.length) {
        result += stack.pop()
    }
    return result
}
// console.log(reverseString('abc'))

// 2. 创建一个函数，统计字符串中每个字符的出现次数。
// 示例：charCount("hello") 应返回 {h: 1, e: 1, l: 2, o: 1}

function charCount(params) {
    let map = {};
    for(s of params) {
        map[s] = map[s] ? ++map[s] : 1
    }
    return map
}
// console.log(charCount('hello'))

// 3. 实现一个简单的防抖函数。
// 该函数应延迟执行，直到自上次调用后经过一定时间。

// 4. 编写一个函数，将嵌套数组扁平化。
// 示例：flatten([1, [2, [3, 4], 5]]) 应返回 [1, 2, 3, 4, 5]
function flatten(params) {
    // let result = []
    // for(s of params) {
    //     if(Array.isArray(s)) {
    //         result.push(...flatten(s))
    //     } else {
    //         result.push(s)
    //     }
    // }
    // return result;

    return params.reduce((accr, cur) => {
        // params.reduce((acc, cur) => acc.concat(Array.isArray(cur) ? flatten(cur) : cur), []);
        return accr.concat(Array.isArray(cur) ? flatten(cur) : cur)
    }, [])


    // return params.flat(Infinity)
}
console.log(flatten([1, [2, [3, 4], 5]]))

// 5. 创建一个函数，检查给定的字符串是否为回文。
// 示例：isPalindrome("racecar") 应返回 true，isPalindrome("hello") 应返回 false
function isPalindrome(params) {
    let first = 0;
    let last = params.length - 1;
    
    while(first <= last) {
        if(params[first] !== params[last] ) {
            return false
        }
        first++;
        last--
    }
    return true
}
console.log(isPalindrome("racecar"))
// 6. 实现一个函数，返回斐波那契数列的第n个数。
// 示例：fibonacci(6) 应返回 8 (1, 1, 2, 3, 5, 8)
function fibonacci(n) {
    if(n <=2) {
        return 1
    }
  
    return fibonacci(n-1) + fibonacci(n-2)
}
// console.log(fibonacci(6) )
// 7. 编写一个函数，从数组中删除重复值。
// 示例：removeDuplicates([1, 2, 2, 3, 4, 4, 5]) 应返回 [1, 2, 3, 4, 5]
function removeDuplicates(params) {
    for (var i=0;i<params.length-1; i++) {
        let index = params.indexOf(params[i])
        if(index !==i) {
            params.splice(index, 1)
            i--
        }
    }
    return params
}
// console.log(removeDuplicates([1, 2, 2, 3, 4, 4, 5]) )

// 8. 创建一个简单的 Promise.all() 函数实现。
function PromiseAll(list) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(list)) {
            return reject(new TypeError('Argument must be an array'));
        }

        const results = [];
        let completed = 0;

        if (list.length === 0) {
            resolve(results);
        }

        list.forEach((promise, index) => {
            Promise.resolve(promise)
                .then(value => {
                    results[index] = value;
                    completed++;

                    if (completed === list.length) {
                        resolve(results);
                    }
                })
                .catch(reject);
        });
    });

    
}

// 9. 实现一个基本的事件发射器类，包含 on、emit 和 off 方法。
class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(eventName, listener) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(listener);
    }

    emit(eventName, ...args) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(listener => listener(...args));
        }
    }

    off(eventName, listenerToRemove) {
        if (this.events[eventName]) {
            this.events[eventName] = this.events[eventName].filter(
                listener => listener !== listenerToRemove
            );
        }
    }
}

// Example usage:
// const emitter = new EventEmitter();
// emitter.on('event', data => console.log('event occurred:', data));
// emitter.emit('event', 'Hello World');
// emitter.off('event', listener);


// 10. 编写一个函数，执行两个对象之间的深度比较。
// 示例：deepEqual({a: 1, b: {c: 2}}, {a: 1, b: {c: 2}}) 应返回 true
function deepEqual(a, b) {
    if (a === b) {
        return true;
    }

    if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) {
        return false;
    }

    let keysA = Object.keys(a);
    let keysB = Object.keys(b);

    if (keysA.length !== keysB.length) {
        return false;
    }

    for (let key of keysA) {
        if (!keysB.includes(key) || !deepEqual(a[key], b[key])) {
            return false;
        }
    }

    return true;
}
    // for(item in a) {
    //     console.log(a.hasOwnProperty)
    //     if(Object.prototype.hasOwnProperty.call(a, item)) {
    //         console.log(item)
    //         // if()
    //     } else {
    //         // console.log(item)
    //     }
    // }
}
console.log(deepEqual({a: 1, b: {c: 2}}))

// 尝试解决这些问题来提高你的 JavaScript 技能！
