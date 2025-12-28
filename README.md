# MOBIX Presentation

Interactive presentation platform with real-time synchronization between presenter (admin) and audience (viewers).

## Features

- 🎯 **Admin Control** - One presenter controls the slides
- 👥 **Viewer Mode** - Audience follows along in real-time
- 📱 **Mobile Responsive** - Works perfectly on all devices
- 🔒 **Access Codes** - Secure login system
- ⚡ **Real-time Sync** - Socket.io powered synchronization

## Access Codes

| Role | Code |
|------|------|
| Admin (Presenter) | `1543` |
| Viewer (Audience) | `0000` |

> **Note:** Only one admin can be connected at a time.

## Local Development

```bash
npm install
npm start
```

Open http://localhost:3000

## Deployment

### Railway (Recommended - Supports WebSocket)

1. Go to [railway.app](https://railway.app)
2. Connect your GitHub repository
3. Railway will auto-detect Node.js and deploy

### Render (Alternative - Supports WebSocket)

1. Go to [render.com](https://render.com)
2. Create a new "Web Service"
3. Connect your GitHub repository
4. Set build command: `npm install`
5. Set start command: `npm start`

## Tech Stack

- Express.js
- Socket.io
- Vanilla JavaScript
- CSS3 with animations
