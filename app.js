const express=require('express')
const app=express()



app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.set('view engine', 'ejs')
const path = require('path')
app.use(express.static(path.join(__dirname,'public')))/* this is app.use not app.set  */

const http=require('http')

const server=http.createServer(app)
const {Server}=require('socket.io')

const io=new Server(server)

io.on('connection',(socket)=>{
    console.log(socket.id);
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

server.listen('3000',(err)=>{
    console.log('server is running');
    
})