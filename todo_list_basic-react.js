// 50道常见的React面试题目及答案

// 1. React是什么？
// 答：React是一个用于构建用户界面的JavaScript库。它由Facebook开发和维护，主要用于构建单页应用程序。

// 2. React的主要特点是什么？
// 答：React的主要特点包括：
// - 虚拟DOM
// - 组件化
// - 单向数据流
// - JSX语法
// - 高效的diff算法
// React的高效diff算法是其性能优化的关键之一。以下是一个简单的示例来说明diff算法的工作原理：

function diff(oldVirtualDOM, newVirtualDOM) {
  if (oldVirtualDOM === newVirtualDOM) {
    return null; // 没有变化，不需要更新
  }

  if (typeof oldVirtualDOM !== typeof newVirtualDOM) {
    return newVirtualDOM; // 类型不同，直接替换
  }

  if (typeof oldVirtualDOM === 'string' || typeof oldVirtualDOM === 'number') {
    if (oldVirtualDOM !== newVirtualDOM) {
      return newVirtualDOM; // 文本节点内容不同，直接替换
    }
    return null;
  }

  if (oldVirtualDOM.type !== newVirtualDOM.type) {
    return newVirtualDOM; // 元素类型不同，直接替换
  }

  // 比较并更新属性
  const patchProps = diffProps(oldVirtualDOM.props, newVirtualDOM.props);

  // 递归比较子节点
  const patchChildren = diffChildren(oldVirtualDOM.children, newVirtualDOM.children);

  if (!patchProps && !patchChildren) {
    return null; // 没有变化，不需要更新
  }

  return {
    type: oldVirtualDOM.type,
    props: {...oldVirtualDOM.props, ...patchProps},
    children: patchChildren || oldVirtualDOM.children
  };
}

// 这个简化的diff算法展示了React如何高效地比较和更新虚拟DOM树

// 3. 什么是JSX？
// 答：JSX是JavaScript XML的缩写，是React中用来描述UI的一种语法糖。它允许我们在JavaScript中写HTML结构。

// 4. 什么是虚拟DOM？
// 答：虚拟DOM是React中的一个概念，它是真实DOM的一个轻量级副本。React通过操作虚拟DOM并且在它和真实DOM之间进行高效的比较来减少实际的DOM操作，从而提高性能。

// 5. React组件的生命周期有哪些？
// 答：React 16.3之前的生命周期主要包括：
// - 挂载阶段：constructor, componentWillMount, render, componentDidMount
// - 更新阶段：componentWillReceiveProps, shouldComponentUpdate, componentWillUpdate, render, componentDidUpdate
// - 卸载阶段：componentWillUnmount

// React 16.3之后引入了新的生命周期方法：
// - 挂载阶段：constructor, getDerivedStateFromProps, render, componentDidMount
// - 更新阶段：getDerivedStateFromProps, shouldComponentUpdate, render, getSnapshotBeforeUpdate, componentDidUpdate
// - 卸载阶段：componentWillUnmount

// 6. 什么是状态(State)和属性(Props)？
// 答：State是组件内部的可变数据。Props是从父组件传递给子组件的数据，在子组件中是只读的。

// 7. 如何在React中创建一个组件？
// 答：在React中，可以通过两种方式创建组件：
// 1. 函数组件：


function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// 2. 类组件：
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

// SSE (Server-Sent Events) 实现:

// 1. 服务器端实现 (Node.js 示例):
const express = require('express');
const app = express();

app.get('/events', function(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  const sendEvent = (data) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  // 模拟每秒发送一次数据
  const intervalId = setInterval(() => {
    sendEvent({ time: new Date().toLocaleTimeString() });
  }, 1000);

  // 当客户端断开连接时清除 interval
  req.on('close', () => {
    clearInterval(intervalId);
  });
});

app.listen(3000, () => console.log('SSE server running on port 3000'));

// 2. 客户端实现 (React 组件):
import React, { useState, useEffect } from 'react';

function SSEComponent() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:3000/events');

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    eventSource.onerror = (error) => {
      console.error('SSE error:', error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      <h2>Server-Sent Events</h2>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message.time}</li>
        ))}
      </ul>
    </div>
  );
}

export default SSEComponent;
// React.PureComponent 和 React.Component 的区别：

// 1. 性能优化：
//    - React.PureComponent 自动实现了 shouldComponentUpdate() 方法，通过浅比较 props 和 state 来决定是否需要重新渲染。
//    - React.Component 需要手动实现 shouldComponentUpdate() 方法来优化性能。

// 2. 浅比较：
//    - PureComponent 只进行浅比较，对于复杂的数据结构可能会有误判。
//    - Component 默认情况下总是重新渲染，除非手动实现 shouldComponentUpdate()。

// 3. 使用场景：
//    - PureComponent 适用于 props 和 state 都是简单数据类型或不经常变化的组件。
//    - Component 适用于需要更细粒度控制更新逻辑的组件。

// 4. 继承关系：
//    - PureComponent 继承自 Component，所以它拥有 Component 的所有特性。

// 5. 实现复杂度：
//    - PureComponent 使用起来更简单，不需要手动实现 shouldComponentUpdate()。
//    - Component 需要更多的手动优化，但提供了更大的灵活性。

// 示例：

// // PureComponent
// class PureComp extends React.PureComponent {
//   render() {
//     return <div>{this.props.value}</div>;
//   }
// }

// // Component
// class RegularComp extends React.Component {
//   shouldComponentUpdate(nextProps, nextState) {
//     return this.props.value !== nextProps.value;
//   }
  
//   render() {
//     return <div>{this.props.value}</div>;
//   }
// }

// 使用 PureComponent 时要注意避免直接修改 props 或 state，因为浅比较可能无法检测到这些变化。

// 8. 什么是受控组件和非受控组件？
// 答：受控组件和非受控组件是React中处理表单输入的两种方式。

// 1. 受控组件（Controlled Components）：
// 受控组件是由React控制并管理其状态的组件。在受控组件中，表单数据由React组件的state处理。
// 每当表单的状态发生变化时，都会调用onChange事件处理函数。

// 受控组件的特点：
// - React 完全控制输入的状态
// - 每次状态更新都会重新渲染组件
// - 可以即时验证和格式化输入

// 示例：
class ControlledInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <input 
        type="text" 
        value={this.state.value} 
        onChange={this.handleChange} 
      />
    );
  }
}

// 2. 非受控组件（Uncontrolled Components）：
// 非受控组件的表单数据由DOM自身管理。非受控组件通常使用ref来获取表单值，而不是为每个状态更新编写事件处理程序。

// 非受控组件的特点：
// - 表单数据由DOM自身管理
// - 需要使用 ref 来获取表单值
// - 更新不会触发组件的重新渲染

// 示例：
class UncontrolledInput extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('Input Value:', this.inputRef.current.value);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" ref={this.inputRef} />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

// 选择使用受控组件还是非受控组件取决于具体的使用场景：
// - 如果需要即时验证、禁用提交按钮、强制输入格式等，使用受控组件更合适。
// - 如果表单非常简单，不需要即时验证，使用非受控组件可能更方便。

// 在大多数情况下，推荐使用受控组件，因为它们提供了更好的可控性和可预测性。

// 9. 什么是高阶组件(HOC)？
// 答：高阶组件是一个函数，它接受一个组件作为参数并返回一个新的组件。HOC是React中用于复用组件逻辑的高级技术。

// 10. React中的key是什么？为什么需要key？
// 答：key是React用于追踪哪些列表中元素被修改、添加或者移除的辅助标识。在渲染列表时，我们需要为每个元素添加key属性，以帮助React识别哪些元素发生了变化。

// 举例说明：
// 假设我们有一个简单的待办事项列表组件：

class TodoList extends React.Component {
  state = {
    todos: [
      { id: 1, text: '学习React' },
      { id: 2, text: '写代码' },
      { id: 3, text: '睡觉' }
    ]
  };

  render() {
    return (
      <ul>
        {this.state.todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    );
  }
}

// 在这个例子中，我们为每个<li>元素添加了一个key属性，其值为todo项的id。
// 这样做的好处是：

// 1. 性能优化：当列表更新时，React可以快速确定哪些项发生了变化，从而只更新那些变化的项，而不是重新渲染整个列表。

// 2. 维护组件状态：如果列表项包含输入框等有状态的子组件，正确的key可以确保在列表重新排序时保持这些组件的状态。

// 3. 避免奇怪的行为：如果不使用key，或者使用索引作为key，在列表项插入、删除或重新排序时可能会导致意外的行为。

// 注意：虽然使用数组索引作为key看起来很方便，但这通常不是一个好主意，因为如果列表项的顺序发生变化，它可能会导致性能问题和组件状态的错误。最好使用稳定的、唯一的标识符作为key。

// 11. 什么是React的Context？
// 答：Context提供了一种通过组件树传递数据的方法，而不必在每一个层级手动传递props。

// 12. 什么是React Hooks？
// 答：Hooks是React 16.8引入的新特性，它允许你在不编写class的情况下使用state以及其他的React特性。

// 13. 列举几个常用的React Hooks。
// 答：常用的React Hooks包括：
// - useState：用于在函数组件中添加state
// - useEffect：用于处理副作用
// - useContext：用于订阅context
// - useReducer：用于管理复杂的state逻辑
// - useCallback：用于优化性能，返回一个记忆化的回调函数
// - useMemo：用于优化性能，返回一个记忆化的值
// - useRef：用于访问DOM元素或保持组件的引用
// - useLayoutEffect：用于在DOM更新后执行副作用
// - useImperativeHandle：用于自定义暴露给父组件的ref
// - useDebugValue：用于在React DevTools中显示自定义Hook的标签
//   例如：
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);
  
  // ...

  // 在开发者工具中显示标签
  useDebugValue(isOnline ? 'Online' : 'Offline');

  return isOnline;
}

// 在React DevTools中，这个自定义Hook会显示为：
// FriendStatus: "Online" 或 "Offline"

// 14. 什么是React的严格模式？
// 答：严格模式是一个用来突出显示应用程序中潜在问题的工具。它为其后代元素触发额外的检查和警告。

// 15. 如何在React中实现代码分割？
// 答：React提供了一个叫做React.lazy的函数，结合Suspense组件，可以很容易地实现代码分割。

// 16. 什么是Redux？
// 答：Redux是一个用于JavaScript应用的可预测状态容器。它通常与React一起使用，但它也可以用于任何其他视图库。

// 17. Redux的三个基本原则是什么？
// 答：Redux的三个基本原则是：
// - 单一数据源
// - State是只读的
// - 使用纯函数来执行修改

// 18. 什么是React Router？
// 答：React Router是React生态系统中的标准路由库，它可以让你向应用程序添加新的屏幕和流程，同时保持URL与网页上显示的内容同步。

// 19. 什么是React的错误边界？
// 答：错误边界是React组件，它可以捕获子组件树中的JavaScript错误，记录这些错误，并显示一个备用UI。例如：

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 你同样可以将错误日志上报给服务器
    console.log('Logging error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}

// 使用方式：
function App() {
  return (
    <ErrorBoundary>
      <MyComponent />
    </ErrorBoundary>
  );
}


// 这样，如果 MyComponent 中发生错误，ErrorBoundary 将捕获这个错误并显示备用 UI。

// 20. 如何优化React应用的性能？
// 答：优化React应用性能的方法包括：
// - 使用React.memo进行组件记忆
// - 使用shouldComponentUpdate生命周期方法
// - 使用虚拟化长列表
// - 延迟加载组件
// - 使用生产版本的React

// 21. 什么是React的Fragments？
// 答：Fragments允许你将子列表分组，而无需向DOM添加额外节点。

// 22. 什么是React的Portals？
// 答：Portals提供了一种将子节点渲染到存在于父组件以外的DOM节点的优秀的方案。

// 23. 什么是React的Suspense？
// 答：Suspense让组件"等待"某些操作结束后，再进行渲染。目前，Suspense仅支持的使用场景是：通过React.lazy动态加载组件。

// 24. 什么是React的Fiber架构？
// 答：Fiber是React 16中新的协调引擎。它的主要目的是使Virtual DOM可以进行增量式渲染。

// 25. 什么是React的服务端渲染？
// 答：服务端渲染是指在服务器上渲染React组件，然后将渲染好的HTML发送给客户端。这可以改善首次加载性能和SEO。

// 26. 如何在React中处理事件？
// 答：在React中，事件处理非常类似于处理DOM元素上的事件。但是有一些语法上的差异：
// - React事件的命名采用小驼峰式（camelCase），而不是纯小写。
// - 使用JSX语法时你需要传入一个函数作为事件处理函数，而不是一个字符串。

// 27. 什么是React的合成事件？
// 答：React的合成事件（SyntheticEvent）是React模拟原生DOM事件所有能力的一个事件对象，即浏览器原生事件的跨浏览器包装器。

// 28. 如何在React中进行状态提升？
// 答：状态提升就是将多个组件需要共享的状态提升到它们最近的公共父组件中进行管理。这样可以避免多个组件之间的状态不一致。

// 29. 什么是React的Context API？
// 答：Context API提供了一种通过组件树传递数据的方法，而不必在每一个层级手动传递props。它设计用于共享那些被认为对于一个组件树而言是"全局"的数据。

// 30. 如何在React中实现按需加载？
// 答：React提供了React.lazy函数和Suspense组件来实现动态导入（按需加载）。
// 例如：
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <React.Suspense fallback={<div>Loading. ..</div>}>
      <OtherComponent />
    </React.Suspense>
  );
}

// 31. 什么是React的Refs？
// 答：Refs提供了一种方式，允许我们访问DOM节点或在render方法中创建的React元素。

// 32. 什么是React的受控组件和非受控组件？
// 答：在受控组件中，表单数据是由React组件来管理的。而在非受控组件中，表单数据将交由DOM节点来处理。

// 33. 什么是React的Pure Component？
// 答：React.PureComponent与React.Component很相似。两者的区别在于React.Component并未实现shouldComponentUpdate()，而React.PureComponent中以浅层对比prop和state的方式来实现了该函数。

// 34. 什么是React的Hooks规则？
// 答：使用Hooks需要遵守两条规则：
// - 只在最顶层使用Hooks
// - 只在React函数中调用Hooks

// 35. 如何在React中实现条件渲染？
// 答：在React中可以使用JavaScript的if语句或条件运算符来创建元素来表现当前的状态，然后让React根据它们来更新UI。

// 36. 什么是React的PropTypes？
// 答：PropTypes是一种在运行时检查传递给React组件的props类型的方法。

// 37. 什么是React的默认Props？
// 答：defaultProps可以为Class组件添加默认props。这一般用于props未赋值，但又不能为null的情况。

// 38. 如何在React中使用样式？
// 答：在React中使用样式的方法有多种：
// - 内联样式
// - CSS样式表
// - CSS Modules
// - Styled-components等CSS-in-JS解决方案

// 39. 什么是React的虚拟DOM？它是如何工作的？
// 答：虚拟DOM是React的一个核心概念，它是一个轻量级的JavaScript对象，是真实DOM的一个副本。当状态变化时，React首先在虚拟DOM中进行操作，然后比较虚拟DOM与真实DOM的差异，最后只将差异部分更新到真实DOM中。

// 40. 什么是React的Reconciliation（协调）？
// 答：Reconciliation是React在虚拟DOM树上执行的一个过程，用于确定需要进行哪些更改以使UI与最新的树保持同步。

// 41. 什么是React的Render Props？
// 答：Render Props是指一种在React组件之间使用一个值为函数的prop共享代码的简单技术。

// 42. 什么是React的Higher-Order Components (HOC)？
// 答：高阶组件是参数为组件，返回值为新组件的函数。HOC是React中用于复用组件逻辑的高级技术。

// 43. React中的setState是同步还是异步的？
// 答：setState在React的合成事件和生命周期中是异步的，在原生事件和setTimeout中是同步的。

// 44. 如何在React中实现组件的通信？
// 答：React中组件通信的方式主要有：
// - 父组件向子组件通信：通过props
// - 子组件向父组件通信：通过回调函数
// - 兄弟组件通信：通过共同的父组件
// - 跨级组件通信：通过Context
// - 任意组件：通过全局状态管理工具如Redux

// 45. 什么是React的Hooks？为什么需要Hooks？
// 答：Hooks是React 16.8中新增的特性，它可以让你在不编写class的情况下使用state以及其他的React特性。引入Hooks的原因主要有：
// - 在组件之间复用状态逻辑很难
// - 复杂组件变得难以理解
// - 难以理解的class

// 46. 什么是React的ErrorBoundary？
// 答：Error boundaries 是 React 组件，它会捕获子组件树中的 JavaScript 错误，记录这些错误，并显示一个备用 UI 而不是崩溃的组件树。

// 47. 什么是React的Suspense？
// 答：Suspense 让组件"等待"某些操作结束后，再进行渲染。在 Suspense 内部的组件子树中的任何组件都可以抛出一个 Promise 来告诉 React 它正在等待某些异步操作完成。

// 48. 什么是React的Concurrent Mode？
// 答：Concurrent Mode 是一组 React 的新功能，可帮助应用保持响应，并根据用户的设备性能和网速进行适当的调整。

// 49. 如何在React中实现性能优化？
// 答：React中实现性能优化的方法包括：
// - 使用React.memo进行组件记忆
// - 使用useMemo和useCallback hooks
// - 使用shouldComponentUpdate生命周期方法
// - 使用虚拟化长列表
// - 延迟加载组件
// - 代码分割

// 50. 什么是React的Strict Mode？
// 答：StrictMode 是一个用来突出显示应用程序中潜在问题的工具。与 Fragment 一样，StrictMode 不会渲染任何可见的 UI。它为其后代元素触发额外的检查和警告。


// 以下是一些练习二叉树的力扣（LeetCode）题目：

// 1. 简单：二叉树的最大深度（力扣 104）
// 问题：给定一个二叉树的根节点，返回其最大深度。

// 2. 简单：对称二叉树（力扣 101）
// 问题：给你一个二叉树的根节点 root ，检查它是否轴对称。

// 3. 中等：二叉树的层序遍历（力扣 102）
// 问题：给你二叉树的根节点 root ，返回其节点值的 层序遍历 。 （即逐层地，从左到右访问所有节点）。
// 3. 中等：二叉树的层序遍历（力扣 102）
// 问题：给你二叉树的根节点 root ，返回其节点值的 层序遍历 。 （即逐层地，从左到右访问所有节点）。

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
    if (!root) return [];
    
    const result = [];
    const queue = [root];
    
    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel = [];
        
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            currentLevel.push(node.val);
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        
        result.push(currentLevel);
    }
    
    return result;
};

// 示例使用:
// const root = new TreeNode(3);
// root.left = new TreeNode(9);
// root.right = new TreeNode(20);
// root.right.left = new TreeNode(15);
// root.right.right = new TreeNode(7);
// console.log(levelOrder(root)); // 输出: [[3],[9,20],[15,7]]


// 4. 中等：验证二叉搜索树（力扣 98）
// 问题：给你一个二叉树的根节点 root ，判断其是否是一个有效的二叉搜索树。

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function(root) {
    function validate(node, min, max) {
        if (!node) return true;
        
        if ((min !== null && node.val <= min) || (max !== null && node.val >= max)) {
            return false;
        }
        
        return validate(node.left, min, node.val) && validate(node.right, node.val, max);
    }
    
    return validate(root, null, null);
};
// 另一种解法：中序遍历

var isValidBST = function(root) {
    let prev = null;
    
    function inorder(node) {
        if (!node) return true;
        
        if (!inorder(node.left)) return false;
        
        if (prev !== null && node.val <= prev) return false;
        prev = node.val;
        
        return inorder(node.right);
    }
    
    return inorder(root);
};

// 解法3：迭代方法

var isValidBST = function(root) {
    if (!root) return true;
    
    const stack = [];
    let prev = null;
    
    while (root || stack.length) {
        while (root) {
            stack.push(root);
            root = root.left;
        }
        
        root = stack.pop();
        
        if (prev !== null && root.val <= prev) return false;
        prev = root.val;
        
        root = root.right;
    }
    
    return true;
};

// 解法4：使用上下界

var isValidBST = function(root) {
    function validate(node, lower, upper) {
        if (!node) return true;
        
        if ((lower !== null && node.val <= lower) || (upper !== null && node.val >= upper)) {
            return false;
        }
        
        return validate(node.left, lower, node.val) && validate(node.right, node.val, upper);
    }
    
    return validate(root, null, null);
};
sse
// 示例使用:
// const root1 = new TreeNode(2);
// root1.left = new TreeNode(1);
// root1.right = new TreeNode(3);
// console.log(isValidBST(root1)); // 输出: true

// const root2 = new TreeNode(5);
// root2.left = new TreeNode(1);
// root2.right = new TreeNode(4);
// root2.right.left = new TreeNode(3);
// root2.right.right = new TreeNode(6);
// console.log(isValidBST(root2)); // 输出: false

// 5. 中等：从前序与中序遍历序列构造二叉树（力扣 105）
// 问题：给定两个整数数组 preorder 和 inorder ，其中 preorder 是二叉树的先序遍历， inorder 是同一棵树的中序遍历，请构造二叉树并返回其根节点。

// 6. 困难：二叉树中的最大路径和（力扣 124）
// 问题：路径 被定义为一条从树中任意节点出发，沿父节点-子节点连接，达到任意节点的序列。同一个节点在一条路径序列中 至多出现一次 。该路径 至少包含一个 节点，且不一定经过根节点。路径和 是路径中各节点值的总和。给你一个二叉树的根节点 root ，返回其 最大路径和 。

// 7. 中等：二叉树的最近公共祖先（力扣 236）
// 问题：给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。

// 8. 中等：二叉树的右视图（力扣 199）
// 问题：给定一个二叉树的 根节点 root，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。

// 这些问题涵盖了二叉树操作和遍历的各个方面。它们的难度从简单到困难不等，为练习提供了很好的组合。记得要实现并彻底测试你的解决方案！


// react concurrent mode:
https://blog.openreplay.com/concurrent-mode-in-react--an-overview/


// React17 & React18新特性

// React 17 主要特性:

// 1. 事件委托机制变更:
//    - 事件不再绑定到 document，而是绑定到根 DOM 容器
//    - 使多个 React 版本并存成为可能
//    用法: 无需改变代码，自动生效

// 2. 新的 JSX 转换:
//    - 不再需要引入 React 来使用 JSX
//    用法: 升级到 React 17 并更新相关工具链

// 3. 移除事件池:
//    - 合成事件对象不再被复用
//    用法: 可以自由访问事件对象的属性，无需担心被回收

// 4. 副作用清理时间:
//    - useEffect 的清理函数变为异步执行
//    用法: 确保清理函数是幂等的

// 5. 返回一致的 undefined 错误:
//    - 组件返回 undefined 总是报错
//    用法: 确保组件总是返回 JSX 或 null

// React 18 主要特性:

// 1. 并发渲染:
//    - 引入 concurrent mode
//    用法: 使用 createRoot 代替 ReactDOM.render

// 2. 自动批处理:
//    - 更多场景下的状态更新会被自动批处理
//    用法: 自动生效，无需改变代码

// 3. Transitions:
//    - 用于区分紧急和非紧急更新
//    用法: 使用 useTransition 或 startTransition

// 4. Suspense on the server:
//    - 支持服务端渲染的 Suspense
//    用法: 在 SSR 中使用 Suspense 组件

// 5. 新的 Hooks:
//    - useId(): 生成唯一 ID
//    - useTransition(): 标记非紧急更新
//    - useDeferredValue(): 延迟更新某个值
//    用法: 在函数组件中直接使用这些新的 Hooks

// 6. 新的 client 和 server 渲染 APIs:
//    - createRoot, hydrateRoot
//    用法: 替换 ReactDOM.render 和 ReactDOM.hydrate

// 7. 严格模式增强:
//    - 模拟组件的卸载和重新挂载
//    用法: 将组件包裹在 <React.StrictMode> 中

React面试常考的题目

1. 什么是 React？
   - React 是一个用于构建用户界面的 JavaScript 库
   - 主要用于构建单页应用的 UI
   - 使用组件化的方式构建 UI
   - 数据流是单向的，使用 state 和 props 进行数据传递
   - 使用 JSX 描述 UI 结构
   - 使用虚拟 DOM 提高性能
   
2. 什么是 JSX？
   - JSX 是一种 JavaScript 的语法扩展，用于描述 UI 结构
   - 允许在 JavaScript 中直接编写类似 HTML 的代码
   - 最终会被编译为纯 JavaScript
   - 可以与 JavaScript 表达式混合使用
   - 提供了更直观和灵活的 UI 描述方式
   
3. 什么是虚拟 DOM？
   - 虚拟 DOM 是一个轻量级的 JavaScript 对象，表示真实 DOM 的副本
   - 当状态变化时，React 首先在虚拟 DOM 中进行操作，然后比较虚拟 DOM 与真实 DOM 的差异，最后只将差异部分更新到真实 DOM 中
   - 提高了性能，减少了直接操作真实 DOM 的开销

4. 什么是组件？
   - 组件是 React 应用的基本构建块
   - 组件可以是一个函数或类

5. 什么是 state 和 props？
   - state 是组件内部的状态，用于存储和更新组件的数据
   - props 是组件的外部属性，用于传递数据给组件
   - state 和 props 都是不可变的，每次更新都会创建新的状态或属性
   - state 和 props 都是单向流动的，从父组件传递给子组件
   
6. 什么是生命周期方法？
   - 生命周期方法是在组件的不同阶段执行的方法
   - 常见的生命周期方法包括：componentDidMount, componentDidUpdate, componentWillUnmount 等
   
7. 什么是高阶组件？
   - 高阶组件是一个接受组件作为参数并返回新组件的函数
   - 高阶组件可以用于代码复用和增强组件功能
   - 高阶组件是纯函数，不修改输入组件
   
8. 什么是上下文（Context）？
   - 上下文提供了一种在组件树中传递数据的方式
   - 使用 createContext 创建上下文，使用 Provider 组件传递数据，使用 Consumer 组件接收数据

9. 什么是 React Hooks？
   - Hooks 是 React 16.8 引入的新特性
   - Hooks 允许函数组件使用 state 和其他 React 特性
   - 常见的 Hooks 包括：useState, useEffect, useContext 等
   - Hooks 是纯函数，不修改组件状态
   
10. 什么是 React Router？
   - React Router 是一个用于在 React 应用中实现路由的库
   - 使用 BrowserRouter, Route, Link, Switch 等组件实现路由
   - 支持嵌套路由和动态路由
   - 使用 useParams, useHistory 等 Hooks 获取路由参数和导航
   
11. 什么是 React Context API？
   - React Context API 提供了一种在组件树中传递数据的方式
   - 使用 createContext 创建上下文，使用 Provider 组件传递数据，使用 Consumer 组件接收数据
   - 适用于全局状态管理
   
12. 什么是 React Suspense？
   - React Suspense 是一个用于在 React 应用中实现异步操作的特性
