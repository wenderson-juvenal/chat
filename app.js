const express = require("express")
const path = require("path")
const socketIO = require("socket.io")
const app = express()

app.use(express.static(path.join(__dirname, "public")))


const server = app.listen(3000, () => {
    console.log("server running")
})

const io = socketIO(server)
const messages = []

io.on("connection", (socket) => {
    socket.emit("all_messages", messages)

    socket.on("new_message", (data) => {
        const time = new Date().toLocaleTimeString('pt-BR', { timeZone: 'America/Sao_Paulo' });

        messages.push({username:data.username, message:data.new_message, time})
        io.emit("all_messages", messages)
    })
})


