require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { ExpressPeerServer } = require('peer');
const path = require('path');

const app = express();
const http = require('http').createServer(app);

// ✅ Socket.IO setup
const io = require('socket.io')(http, {
  cors: {
    origin: [process.env.CLIENT_URL, 'http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// ✅ Middleware
app.use(express.json());
app.use(cors({
  origin: [process.env.CLIENT_URL, 'http://localhost:3000'],
  credentials: true
}));
app.use(cookieParser());

// ✅ PeerJS Server (for audio/video calls)
const peerServer = ExpressPeerServer(http, { path: '/peerjs' });
app.use('/peerjs', peerServer);

// ✅ API Routes
app.use('/api', require('./routes/authRouter'));
app.use('/api', require('./routes/userRouter'));
app.use('/api', require('./routes/postRouter'));
app.use('/api', require('./routes/commentRouter'));
app.use('/api', require('./routes/notifyRouter'));
app.use('/api', require('./routes/messageRouter'));

// ✅ MongoDB Connection
const URI = process.env.MONGODB_URL;
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, err => {
  if (err) throw err;
  console.log('✅ Connected to MongoDB');
});

// ✅ Socket.IO Connection Handler
const SocketServer = require('./socketServer');
io.on('connection', socket => {
  SocketServer(socket, io);
});

// ✅ Serve static files in production (React build)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

// ✅ Start the server
const PORT = process.env.PORT || 5000;
http.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
