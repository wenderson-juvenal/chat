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

const form_set_username = document.querySelector("#username")
const form_new_message = document.querySelector("#new_message")

let username

form_set_username.addEventListener("submit", (e) => {
    e.preventDefault()

    username = form_set_username.querySelector("input[type=text]").value
    form_set_username.style.display = "none"
    form_new_message.style.display = "block"
    form_new_message.querySelector("label").innerHTML = `<label>${username}:<input type="text"></label>`
})


form_new_message.addEventListener("submit", (e) => {
    e.preventDefault()
    
    const new_message = form_new_message.querySelector("input[type=text]").value 

    if (username) {
        socket.emit("new_message", {username, new_message})
        form_new_message.querySelector("input[type=text]").value = ""
    } else {
        alert("Defina um nome de usuário.")
    }
})



