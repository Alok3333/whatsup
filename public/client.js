const socket = io();

let name;
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message_area');

do{
    name = prompt('Enter your name...');
}while(!name)

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value);
    }
});


function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    }

    // Append 
    appendMessge(msg, 'outgoing');
    textarea.value = '';
    scrollToBottom()

    // send to server
    socket.emit('message', msg);
}

function appendMessge(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className,'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `

    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

// Recieve message

socket.on('message', (msg) => {
    appendMessge(msg, 'incoming');
    scrollToBottom()
})


// auto scrolling
function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}