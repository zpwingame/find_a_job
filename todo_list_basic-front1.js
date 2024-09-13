// Throttle function implementation
function throttle(func, delay) {
    let lastCall = 0;
    return function (...args) {
        const now = new Date().getTime();
        if (now - lastCall < delay) {
            return;
        }
        lastCall = now;
        return func.apply(this, args);
    };
}

// Example usage:
// const throttledFunction = throttle(() => {
//     console.log('Throttled function called');
// }, 1000);

// // This will only execute once per second, even if called multiple times
// setInterval(throttledFunction, 100);
// XHR POST request function
function sendPostRequest(url, data, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                callback(null, JSON.parse(xhr.responseText));
            } else {
                callback(new Error('Request failed. Status: ' + xhr.status));
            }
        }
    };
    
    xhr.onerror = function() {
        callback(new Error('Network error occurred'));
    };
    
    xhr.send(JSON.stringify(data));
}

// Example usage:
// sendPostRequest('https://api.example.com/data', { key: 'value' }, (error, response) => {
//     if (error) {
//         console.error('Error:', error);
//     } else {
//         console.log('Response:', response);
//     }
// });
// Axios cancel request function
function createCancelableRequest(axios) {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const cancelableRequest = axios.create({
        cancelToken: source.token
    });

    cancelableRequest.cancel = source.cancel;

    return cancelableRequest;
}

// Example usage:
// const cancelableAxios = createCancelableRequest(axios);
// 
// // Make a request
// cancelableAxios.get('https://api.example.com/data')
//     .then(response => {
//         console.log('Response:', response.data);
//     })
//     .catch(error => {
//         if (axios.isCancel(error)) {
//             console.log('Request canceled:', error.message);
//         } else {
//             console.error('Error:', error);
//         }
//     });
// 
// // Cancel the request
// cancelableAxios.cancel('Request canceled by the user');
// Deep clone function implementation
function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    if (obj instanceof Date) {
        return new Date(obj.getTime());
    }

    if (obj instanceof RegExp) {
        return new RegExp(obj);
    }

    if (Array.isArray(obj)) {
        return obj.map(item => deepClone(item));
    }

    const clonedObj = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            clonedObj[key] = deepClone(obj[key]);
        }
    }

    return clonedObj;
}

// Example usage:
// const originalObj = {
//     a: 1,
//     b: { c: 2, d: [3, 4] },
//     e: new Date(),
//     f: /pattern/g
// };
// const clonedObj = deepClone(originalObj);
// console.log(clonedObj);


vue.prototype.$nextTick = function (callback) {
    if (typeof Promise !== 'undefined') {
        Promise.resolve().then(callback);
    } else {
        setTimeout(callback, 0);
    }
}   



// Implementation of 'new' operator in JavaScript
function customNew(constructor, ...args) {
    // 1. Create a new object
    const obj = {};

    // 2. Set the prototype of the new object to the constructor's prototype
    Object.setPrototypeOf(obj, constructor.prototype);

    // 3. Execute the constructor function with 'this' set to the new object
    const result = constructor.apply(obj, args);

    // 4. If the constructor returns an object, use that object; otherwise use the created object
    return (typeof result === 'object' && result !== null) ? result : obj;
}



function myNew(Func, ...args) {
    // 1. 创建一个新对象
    const obj = {};
  
    // 2. 设置新对象的原型
    obj.__proto__ = Func.prototype;
  
    // 3. 绑定 this 并执行构造函数
    const result = Func.apply(obj, args);
  
    // 4. 返回对象
    return result instanceof Object ? result : obj;
  }
  
  // 示例构造函数
  function Person(name, age) {
    this.name = name;
    this.age = age;
  }
  
  // 使用自定义的 myNew 函数
  const person1 = myNew(Person, 'Tom', 20);
  console.log(person1); // 输出: Person { name: 'Tom', age: 20 }

  
// Example usage:
// function Person(name, age) {
//     this.name = name;
//     this.age = age;
// }
// 
// Person.prototype.sayHello = function() {
//     console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`);
// };
// 
// const john = customNew(Person, 'John', 30);
// john.sayHello(); // Output: Hello, my name is John and I'm 30 years old.

// master挂了的话pm2怎么处理


// 如果你的应用在 `pm2` 中挂了，你可以使用 `pm2` 提供的一些命令来处理和恢复你的应用。以下是一些常用的命令和步骤：

// 1. **查看应用状态**：
//    ```bash
//    pm2 status
//    ```
//    这将显示所有应用的状态，包括是否挂了。

// 2. **重启挂掉的应用**：
//    ```bash
//    pm2 restart <app_name_or_id>
//    ```
//    你可以使用应用的名称或 ID 来重启它。

// 3. **自动重启**：
//    `pm2` 默认会自动重启挂掉的应用。如果没有自动重启，你可以检查配置：
//    ```bash
//    pm2 show <app_name_or_id>
//    ```
//    确保 `autorestart` 选项是 `true`。

// 4. **日志查看**：
//    查看日志以了解应用挂掉的原因：
//    ```bash
//    pm2 logs <app_name_or_id>
//    ```

// 5. **监控和告警**：
//    配置 `pm2` 的监控和告警功能，以便在应用挂掉时收到通知。你可以使用 `pm2` 的监控模块 `pm2 monit` 或集成第三方监控工具。

// 6. **启动应用**：
//    如果应用没有运行，可以使用以下命令启动：
//    ```bash
//    pm2 start <app_name_or_script>
//    ```

// 7. **删除和重新启动**：
//    如果应用持续挂掉，可能需要删除并重新启动：
//    ```bash
//    pm2 delete <app_name_or_id>
//    pm2 start <app_name_or_script>
//    ```

// 8. **配置文件**：
//    使用 `ecosystem.config.js` 文件来管理和配置你的应用，确保在应用挂掉时自动重启：
//    ```javascript
//    module.exports = {
//      apps: [{
//        name: 'my-app',
//        script: './app.js',
//        instances: 1,
//        autorestart: true,
//        watch: false,
//        max_memory_restart: '1G',
//        env: {
//          NODE_ENV: 'development'
//        },
//        env_production: {
//          NODE_ENV: 'production'
//        }
//      }]
//    };
//    ```

//    然后使用以下命令启动：
//    ```bash
//    pm2 start ecosystem.config.js
//    ```

// 通过这些步骤，你可以有效地管理和恢复挂掉的应用。

// redux-thunk有什么好处 展开说说


function inorderTraversal(node) {
    if (node === null) return;

    inorderTraversal(node.left); // 先遍历左子树
    console.log(node.val); // 访问当前节点
    inorderTraversal(node.right); // 再遍历右子树
}
function preorderTraversal(node) {
    if (node === null) return;

    console.log(node.val); // 访问当前节点
    preorderTraversal(node.left); // 先遍历左子树
    preorderTraversal(node.right); // 再遍历右子树
}
function postorderTraversal(node) {
    if (node === null) return;

    postorderTraversal(node.left); // 先遍历左子树
    postorderTraversal(node.right); // 再遍历右子树
    console.log(node.val); // 访问当前节点
}


// 中序遍历（迭代方法）
function inorderTraversalIterative(root) {
    const result = [];
    const stack = [];
    let current = root;

    while (current !== null || stack.length > 0) {
        // 遍历到最左边的节点
        while (current !== null) {
            stack.push(current);
            current = current.left;
        }
        
        // 弹出栈顶元素并访问
        current = stack.pop();
        result.push(current.val);
        
        // 移动到右子树
        current = current.right;
    }

    return result;
}



function inordertraverse(root) {
    let result = []
    let stack = []
    let current = root

    while(current !== null || stack.length > 0) {
        while(current !== null) {
            stack.push(current)
            current = current.left
        }
        current = stack.pop()
        result.push(current.val)
        current = current.right
    }
    return result
}

// 前序遍历（迭代方法）
function preorderTraversalIterative(root) {
    if (root === null) return [];

    const result = [];
    const stack = [root];

    while (stack.length > 0) {
        const node = stack.pop();
        result.push(node.val);

        // 先压入右子节点，再压入左子节点，确保左子节点先被访问
        if (node.right !== null) {
            stack.push(node.right);
        }
        if (node.left !== null) {
            stack.push(node.left);
        }
    }

    return result;
}

// 后序遍历（迭代方法）
function postorderTraversalIterative(root) {
    if (root === null) return [];

    const result = [];
    const stack = [root];
    const visited = new Set();

    while (stack.length > 0) {
        const node = stack[stack.length - 1];

        // 如果左右子节点都已访问，或者是叶子节点，则可以访问当前节点
        if ((node.left === null || visited.has(node.left)) &&
            (node.right === null || visited.has(node.right))) {
            result.push(node.val);
            visited.add(node);
            stack.pop();
        } else {
            // 先压入右子节点，再压入左子节点
            if (node.right !== null && !visited.has(node.right)) {
                stack.push(node.right);
            }
            if (node.left !== null && !visited.has(node.left)) {
                stack.push(node.left);
            }
        }
    }

    return result;
}
