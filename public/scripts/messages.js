const socket = io()


let messages_div = document.querySelector("#messages") 

socket.on("all_messages", (data) => {
    let messages = ""
    
    data.forEach(message => {
        messages += `<div class="message">
                <p>${message["time"]} - ${message["username"]} - ${message["message"]}</p>
            </div>`
    })
    messages_div.innerHTML = messages
})

const form_new_message = document.querySelector("#new_message")

form_new_message.addEventListener("submit", (e) => {
    e.preventDefault()
    
    const new_message = form_new_message.querySelector("input[type=text]").value 
    const username = form_new_message.querySelector("input[type=hidden]").value

    socket.emit("new_message", {username, new_message})
    form_new_message.querySelector("input[type=text]").value = ""
})

