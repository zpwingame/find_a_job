// How would you create a Google Analytics SDK used by webpages?
// Google Analytics SDK for Webpages

// class GoogleAnalyticsSDK {
//     constructor(trackingId) {
//         this.trackingId = trackingId;
//         this.userId = null;
//         this.sessionId = this.generateSessionId();
//         this.eventQueue = [];
//         this.initialized = false;
//     }

//     init() {
//         // Load the SDK script
//         const script = document.createElement('script');
//         script.src = `https://www.googletagmanager.com/gtag/js?id=${this.trackingId}`;
//         script.async = true;
//         document.head.appendChild(script);

//         // Initialize the global gtag function
//         window.dataLayer = window.dataLayer || [];
//         function gtag() { dataLayer.push(arguments); }
//         gtag('js', new Date());
//         gtag('config', this.trackingId);

//         this.initialized = true;
//         this.flushQueue();
//     }

//     setUserId(userId) {
//         this.userId = userId;
//         if (this.initialized) {
//             gtag('set', { 'user_id': userId });
//         }
//     }

//     pageView(pagePath) {
//         this.pushEvent('page_view', { page_path: pagePath });
//     }

//     event(eventName, eventParams = {}) {
//         this.pushEvent(eventName, eventParams);
//     }

//     pushEvent(eventName, eventParams) {
//         const event = {
//             name: eventName,
//             params: {
//                 ...eventParams,
//                 session_id: this.sessionId,
//                 user_id: this.userId
//             }
//         };

//         if (this.initialized) {
//             gtag('event', event.name, event.params);
//         } else {
//             this.eventQueue.push(event);
//         }
//     }

//     flushQueue() {
//         while (this.eventQueue.length > 0) {
//             const event = this.eventQueue.shift();
//             gtag('event', event.name, event.params);
//         }
//     }

//     generateSessionId() {
//         return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
//             const r = Math.random() * 16 | 0;
//             const v = c === 'x' ? r : (r & 0x3 | 0x8);
//             return v.toString(16);
//         });
//     }
// }

// // Usage example:
// const ga = new GoogleAnalyticsSDK('UA-XXXXXXXXX-X');
// ga.init();
// ga.setUserId('user123');
// ga.pageView('/home');
// ga.event('button_click', { button_id: 'submit_form' });


// 扫雷问题。编写一个函数 reveal()，当用户点击一个方块时，输出显示的方块数量。每个方块显示其相邻的炸弹数量。如果用户点击的方块是炸弹，游戏结束。如果该方块是 0，则揭示其所有相邻方块。

function reveal(board, row, col) {
    const rows = board.length;
    const cols = board[0].length;
    let tilesRevealed = 0;

    function isValid(r, c) {
        return r >= 0 && r < rows && c >= 0 && c < cols;
    }

    function dfs(r, c) {
        if (!isValid(r, c) || board[r][c] === 'X' || board[r][c] === 'R') {
            return;
        }

        board[r][c] = 'R'; // Mark as revealed
        tilesRevealed++;

        if (board[r][c] === 0) {
            for (let dr = -1; dr <= 1; dr++) {
                for (let dc = -1; dc <= 1; dc++) {
                    if (dr !== 0 || dc !== 0) {
                        dfs(r + dr, c + dc);
                    }
                }
            }
        }
    }

    if (board[row][col] === 'B') {
        return -1; // Game over
    }

    dfs(row, col);
    return tilesRevealed;
}

// Test case
const board = [
    [0, 1, 'B', 1],
    [0, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];

console.log(reveal(board, 0, 0)); // Expected output: 8
console.log(reveal(board, 0, 2)); // Expected output: -1 (Game over)
console.log(reveal(board, 1, 1)); // Expected output: 1


