require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const SocketServer = require('./socketServer')
const { ExpressPeerServer } = require('peer')
const http = require('http')
const app = express()

// Middleware
app.use(express.json())
app.use(cors({
    origin: 'https://aura-social-media-app.vercel.app', // only allow frontend
    credentials: true, // allow cookies
}))
app.use(cookieParser())

// Socket
const server = http.createServer(app)
const io = require('socket.io')(server)

io.on('connection', socket => {
    SocketServer(socket)
})

// Peer server
ExpressPeerServer(server, { path: '/' })

// Routes
app.use('/api', require('./routes/authRouter'))
app.use('/api', require('./routes/userRouter'))
app.use('/api', require('./routes/postRouter'))
app.use('/api', require('./routes/commentRouter'))
app.use('/api', require('./routes/notifyRouter'))
app.use('/api', require('./routes/messageRouter'))

// Root route redirect to frontend
app.get('/', (req, res) => {
    res.redirect('https://aura-social-media-app.vercel.app/')
})

// Catch-all route: redirect everything else (except /api) to frontend
app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
        res.redirect('https://aura-social-media-app.vercel.app/')
    } else {
        res.status(404).json({ msg: 'API route not found' })
    }
})

// MongoDB connection
mongoose.connect(process.env.MONGODB_URL, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) throw err
    console.log('✅ Connected to MongoDB')
})

// Start server
const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
    console.log('🚀 Server is running on port', PORT)
})
