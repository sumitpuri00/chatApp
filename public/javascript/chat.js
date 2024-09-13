// const socket=io()
const socket = io({
    transports: ['websocket', 'polling']
});



const btn=document.getElementById('button')
const inputMsg=document.getElementById('input')

btn.addEventListener('click',(e)=>{
    if(inputMsg.value){
        socket.emit('message 1',inputMsg.value)
        inputMsg.value=''
    }
    
})

const showMsg=document.getElementById('show-message')

socket.on('recieve',(message)=>{
    const para=document.createElement('p')
    para.innerText=message
    showMsg.appendChild(para)
    
    // console.log(`this is client side and message is ---> ${message}`);
    
})






