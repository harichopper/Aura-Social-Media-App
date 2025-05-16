require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { ExpressPeerServer } = require('peer');
const path = require('path');

const app = express();
const http = require('http').createServer(app);

// Allowed origins for CORS
const allowedOrigins = [
  'http://localhost:3000',
  'https://aura-social-media-app.vercel.app'
];

// Setup CORS middleware dynamically based on origin
app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like mobile apps, curl, Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Setup socket.io with dynamic CORS
const io = require('socket.io')(http, {
  cors: {
    origin: function(origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(new Error('Not allowed by CORS'), false);
      }
      return callback(null, true);
    },
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Simple test route
app.get('/', (req, res) => {
  res.status(200).json({
    status: "Server is running smoothly 🚀",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    message: "Welcome to the AURA API 🎉"
  });
});

// PeerJS Server for calls
const peerServer = ExpressPeerServer(http, { path: '/peerjs' });
app.use('/peerjs', peerServer);

// Import your route files (adjust paths accordingly)
app.use('/api', require('./routes/authRouter'));
app.use('/api', require('./routes/userRouter'));
app.use('/api', require('./routes/postRouter'));
app.use('/api', require('./routes/commentRouter'));
app.use('/api', require('./routes/notifyRouter'));
app.use('/api', require('./routes/messageRouter'));

// MongoDB connection
const URI = process.env.MONGODB_URL;
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, err => {
  if (err) throw err;
  console.log('✅ Connected to MongoDB');
});

// Socket.io connection handling
const SocketServer = require('./socketServer');
io.on('connection', socket => {
  SocketServer(socket, io);
});

// Serve React build for production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

// Start server
const PORT = process.env.PORT || 5000;
http.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
