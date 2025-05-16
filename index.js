require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { ExpressPeerServer } = require('peer');
const path = require('path');

const app = express();
const http = require('http').createServer(app);

const allowedOrigins = [
  "http://localhost:3000",
  "https://aura-social-media-app.vercel.app",
  process.env.CLIENT_URL // ensure this is defined correctly or remove if unused
];

// Socket.io with improved CORS handling
const io = require('socket.io')(http, {
  cors: {
    origin: function(origin, callback) {
      // Allow requests with no origin (like Postman, curl, or mobile apps)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(new Error(`Origin ${origin} not allowed by CORS`), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Middleware
app.use(express.json());
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error(`Origin ${origin} not allowed by CORS`), false);
    }
    return callback(null, true);
  },
  credentials: true
}));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).json({
    status: "Server is running smoothly 🚀",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    message: "Welcome to the AURA API 🎉",
  });
});

// PeerJS Server (for audio/video calls)
const peerServer = ExpressPeerServer(http, { path: '/peerjs' });
app.use('/peerjs', peerServer);

// Routes
app.use('/api', require('./routes/authRouter'));
app.use('/api', require('./routes/userRouter'));
app.use('/api', require('./routes/postRouter'));
app.use('/api', require('./routes/commentRouter'));
app.use('/api', require('./routes/notifyRouter'));
app.use('/api', require('./routes/messageRouter'));

// MongoDB Connection
const URI = process.env.MONGODB_URL;
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) throw err;
    console.log('✅ Connected to MongoDB');
});

// Socket.io connection
const SocketServer = require('./socketServer');
io.on('connection', socket => {
    SocketServer(socket, io); // Pass io so you can emit globally from socketServer.js
});

// Static file serving (for production build)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}

// Server listening
const PORT = process.env.PORT || 5000;
http.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
