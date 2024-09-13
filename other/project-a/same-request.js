// 实现一个request函数，可以对url, method, params相同的请求做防抖



// var req1 = request("a/1", "get", {b: 1})

// var req2 = request("a/1", "get", {b : 1})

// var req3 = request("a/1", "get", {b: 2})

// var req4 = request("a/2", "get", {})
// 实现防抖函数
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// 创建一个Map来存储请求
const requestMap = new Map();

// 实现request函数
function request(url, method, params) {
  // 创建一个唯一的key
  const key = `${url}|${method}|${JSON.stringify(params)}`;

  // 如果这个请求已经存在，直接返回存储的Promise
  if (requestMap.has(key)) {
    return requestMap.get(key);
  }

  // 创建一个新的Promise来处理请求
  const promise = new Promise((resolve, reject) => {
    // 这里应该是实际的请求逻辑
    // 为了演示，我们使用setTimeout模拟异步请求
    setTimeout(() => {
      console.log(`Request: ${url}, ${method}, ${JSON.stringify(params)}`);
      resolve(`Response for ${url}`);
    }, 1000);
  });

  // 将Promise存储到Map中
  requestMap.set(key, promise);

  // 使用防抖函数来清除存储的Promise
  const clearRequest = debounce(() => {
    requestMap.delete(key);
  }, 5000); // 5秒后清除，可以根据需要调整时间

  clearRequest();

  return promise;
}

// 测试
var req1 = request("a/1", "get", {b: 1});
var req2 = request("a/1", "get", {b: 1});
var req3 = request("a/1", "get", {b: 2});
var req4 = request("a/2", "get", {});

req1.then(console.log);
req2.then(console.log);
req3.then(console.log);
req4.then(console.log);
