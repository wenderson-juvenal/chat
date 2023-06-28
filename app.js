const express = require("express")
const session = require('express-session')
const path = require("path")
const socketIO = require("socket.io")
const app = express()

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: 'G3mBbX2uN7rP8zK5sH9qY6cV1wA4jD0lO1fE2gT3yI7xR5mT8nQ4bZ',
    resave: false,
    saveUninitialized: true
}))
app.get("/", (req, res) => {
    res.render("index")
})
app.post("/login", (req, res) => {
    req.session.name = req.body.name
    res.redirect("/messages")
})

app.get("/messages", (req, res) => {
    if (!req.session.name) {
        return res.redirect("/")
    } 
    res.render("messages", {name:req.session.name})
})

const server = app.listen(3000, () => {
    console.log("server running")
})

const io = socketIO(server)
const messages = []

io.on("connection", (socket) => {
    socket.emit("all_messages", messages)
    console.log("ok")
    socket.on("new_message", (data) => {
        const time = new Date().toLocaleTimeString('pt-BR', { timeZone: 'America/Sao_Paulo' });
        console.log(data)
        messages.push({username:data.username, message:data.new_message, time})
        io.emit("all_messages", messages)
    })
})


