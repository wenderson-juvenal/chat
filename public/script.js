const socket = io()
let messages_div = document.querySelector("#messages") 

socket.on("all_messages", (data) => {
    let messages = ""

    data.forEach(message => {
        messages += `<div class="message">${message}</div>`
    })
    messages_div.innerHTML = messages
})


const form = document.querySelector("#new_message")

form.addEventListener("submit", (e) => {
    e.preventDefault()
    
    const new_message = form.querySelector("input[type=text]").value 
    form.querySelector("input[type=text]").value = ""

    socket.emit("new_message", {new_message})

})

