// 贪吃蛇代码js

// 定义游戏区域大小
const GRID_SIZE = 20;
const CELL_SIZE = 20;

// 定义蛇和食物
let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let direction = 'right';

// 创建游戏画布
const canvas = document.createElement('canvas');
canvas.width = GRID_SIZE * CELL_SIZE;
canvas.height = GRID_SIZE * CELL_SIZE;
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

// 游戏主循环
function gameLoop() {
    moveSnake();
    if (checkCollision()) {
        alert('游戏结束！');
        return;
    }
    if (eatFood()) {
        generateFood();
    }
    draw();
    setTimeout(gameLoop, 500);
}

// 移动蛇
function moveSnake() {
    const head = { ...snake[0] };
    switch (direction) {
        case 'up': head.y--; break;
        case 'down': head.y++; break;
        case 'left': head.x--; break;
        case 'right': head.x++; break;
    }
    snake.unshift(head);
    if (!eatFood()) {
        snake.pop();
    }
}

// 检查碰撞
function checkCollision() {
    const head = snake[0];
    return head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE ||
           snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
}

// 吃食物
function eatFood() {
    const head = snake[0];
    return head.x === food.x && head.y === food.y;
}

// 生成食物
function generateFood() {
    food = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
    };
    // 确保食物不会生成在蛇身上
    while (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
        generateFood();
    }
}

// 绘制游戏
function draw() {
    // 清空画布
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 绘制蛇
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * CELL_SIZE, segment.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    });

    // 绘制食物
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * CELL_SIZE, food.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

// 键盘控制
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp': if (direction !== 'down') direction = 'up'; break;
        case 'ArrowDown': if (direction !== 'up') direction = 'down'; break;
        case 'ArrowLeft': if (direction !== 'right') direction = 'left'; break;
        case 'ArrowRight': if (direction !== 'left') direction = 'right'; break;
    }
});

// 开始游戏
generateFood();
gameLoop();