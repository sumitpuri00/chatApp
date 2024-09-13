const express=require('express')
const app=express()

require('dotenv').config();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.set('view engine', 'ejs')
const path = require('path')
app.use(express.static(path.join(__dirname,'public')))/* this is app.use not app.set  */
app.set('views', path.join(__dirname, 'views')); /* this will look for views/chat.ejs */
const http=require('http')
 
const server=http.createServer(app)
const {Server}=require('socket.io')

// const io=new Server(server)
// const io = new Server(server, {
//     cors: {
//         origin: '*', // Or your specific frontend domain
//         methods: ['GET', 'POST']
//     },
//     transports: ['websocket', 'polling'] // Add polling as a fallback
// });
const io = new Server(server, {
    cors: {
        origin: 'https://chat-with-friends-eta.vercel.app/', // Replace with your actual Vercel URL
        methods: ['GET', 'POST'],
        credentials: true
    },
    transports: ['websocket', 'polling']
});



io.on('connection',(socket)=>{
    console.log(`user connected with id ${socket.id}`);
    socket.on('message 1',(userMessage)=>{
        console.log(userMessage);
        socket.broadcast.emit('recieve',userMessage)/* this way sender will not get it's own msg */
        // io.emit('recieve',userMessage) /* this way all will get the msg even the sender */
    })
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
    
})

app.get('/',(req,res)=>{
    res.render('chat',{sumit:'chat'})
})



server.listen(port,(err)=>{
    console.log(`Server is running on port ${port} `);
    
})