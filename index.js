// on instance express
const app = require("express")();

// on cree le serveur http
const http = require("http").createServer(app);

// on instancie socket.io
const io = require("socket.io")(http);

// cree route  /
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

// on ecoute l'evenement de socket.io
io.on("connection", (socket) => {
    console.log("Une connextion s'active");

    // On ecoute les deconnexions
    socket.on("disconnect", () => {
        console.log("Un utilisateur s'est deconnecte");
    });

    // on gere le chat
    socket.on("chat_message", (msg) => {
        // On relais le message vers tout les utilisateur
        io.emit("received_message", msg);
    });
});

// on vas demander au serveur d'ecouter sur le port 3000
http.listen(3000, () => {
    console.log("j'ecoute le port 3000");
})