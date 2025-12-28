const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Access codes
const ADMIN_CODE = '1543';
const VIEWER_CODE = '0000';

// Current presentation state
let presentationState = {
    currentSlide: 1,
    totalSlides: 0,
    adminConnected: false
};

// Connected clients
let viewers = new Set();
let adminSocketId = null;

io.on('connection', (socket) => {
    console.log('New connection:', socket.id);

    // Handle login
    socket.on('login', (code) => {
        if (code === ADMIN_CODE) {
            // Check if admin is already connected
            if (presentationState.adminConnected && adminSocketId !== socket.id) {
                socket.emit('loginResult', { 
                    success: false, 
                    message: 'Admin is already connected from another device' 
                });
                return;
            }
            
            socket.role = 'admin';
            adminSocketId = socket.id;
            presentationState.adminConnected = true;
            socket.emit('loginResult', { 
                success: true,
                isAdmin: true, 
                currentSlide: presentationState.currentSlide || 1
            });
            console.log('Admin connected:', socket.id);
        } else if (code === VIEWER_CODE) {
            socket.role = 'viewer';
            viewers.add(socket.id);
            socket.emit('loginResult', { 
                success: true,
                isAdmin: false, 
                currentSlide: presentationState.currentSlide || 1
            });
            console.log('Viewer connected:', socket.id);
        } else {
            socket.emit('loginResult', { success: false, message: 'Invalid access code' });
        }
    });

    // Handle slide change (admin only)
    socket.on('slideChange', (slideIndex) => {
        if (socket.role === 'admin') {
            presentationState.currentSlide = slideIndex;
            // Broadcast to all viewers
            io.emit('slideChanged', slideIndex);
            console.log('Slide changed to:', slideIndex);
        }
    });

    // Handle set total slides
    socket.on('setTotalSlides', (total) => {
        presentationState.totalSlides = total;
    });

    // Handle disconnect
    socket.on('disconnect', () => {
        if (socket.role === 'admin') {
            presentationState.adminConnected = false;
            adminSocketId = null;
            console.log('Admin disconnected');
        } else if (socket.role === 'viewer') {
            viewers.delete(socket.id);
            console.log('Viewer disconnected');
        }
    });

    // Get current state
    socket.on('getState', () => {
        socket.emit('stateUpdate', presentationState);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   🚀 MOBIX Presentation Server Running!                     ║
║                                                              ║
║   Open in browser: http://localhost:${PORT}                   ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
    `);
});
