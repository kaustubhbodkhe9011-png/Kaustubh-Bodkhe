# Portfolio Backend API

## Setup

```bash
cd server
npm install
cp .env.example .env
# Edit .env with your values
node server.js
```

## Environment Variables

| Variable | Description |
|---|---|
| `PORT` | Server port (default 5000) |
| `MONGODB_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret for JWT signing |
| `ADMIN_EMAIL` | Your email (notification recipient) |
| `ADMIN_PASSWORD_HASH` | bcrypt hash of admin password |
| `SMTP_USER` / `SMTP_PASS` | Gmail app credentials for notifications |
| `CORS_ORIGIN` | Frontend URL |

## Generate Admin Password Hash

```bash
node -e "const b=require('bcryptjs');b.hash('YourPassword',12).then(console.log)"
```

## Endpoints

| Method | Route | Auth | Description |
|---|---|---|---|
| GET | /api/health | No | Server health |
| POST | /api/contact | No | Submit contact form |
| GET | /api/projects | No | List projects |
| POST | /api/admin/login | No | Get JWT token |
| GET | /api/admin/messages | JWT | View messages |
| PATCH | /api/admin/messages/:id/read | JWT | Mark as read |

## Deployment (Render.com)

1. Push server/ to GitHub
2. Create new Web Service on render.com
3. Set Build Command: `npm install`
4. Set Start Command: `node server.js`
5. Add all environment variables
