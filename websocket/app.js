/*
 * @Description: 
 * @Author: Danylko
 * @Date: 2024-08-17 11:06:14
 * @LastEditTime: 2024-08-17 11:10:49
 */
// app.js
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);

// 创建 WebSocket 服务器
const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (ws, req) => {
    console.log('New WebSocket connection');

    // 处理收到的消息
    ws.on('message', (message) => {
        console.log('Received:', message);
        // 将消息广播给所有连接的客户端
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    // 处理 WebSocket 关闭
    ws.on('close', () => {
        console.log('WebSocket connection closed');
    });

    // 发送欢迎消息
    ws.send('Welcome to the WebSocket server!');
});

// 提供一个 HTTP 路由
app.get('/', (req, res) => {
    res.send('WebSocket server is running');
});

// 启动 WebSocket 服务器
server.on('upgrade', (request, socket, head) => {
    if (request.url === '/test') {
        wss.handleUpgrade(request, socket, head, (ws) => {
            wss.emit('connection', ws, request);
        });
    } else {
        socket.destroy(); // 关闭不匹配的连接
    }
});

// 启动服务器
const PORT = 3003;
server.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});
