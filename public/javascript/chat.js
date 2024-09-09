const socket=io()


const btn=document.getElementById('button')
const inputMsg=document.getElementById('input')

btn.addEventListener('click',(e)=>{
    if(inputMsg.value){
        socket.emit('message 1',inputMsg.value)
    }
    
})

const showMsg=document.getElementById('show-message')

socket.on('recieve',(message)=>{
    const para=document.createElement('p')
    para.innerText=message
    showMsg.appendChild(para)
    inputMsg.value=''
    // console.log(`this is client side and message is ---> ${message}`);
    
})






