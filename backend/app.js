//Inclusion des variables d'environnement
const config = require("./config/config.json");

//Inclusion des différents modules utiles à l'application
const express = require("express");
const sequelize = require("sequelize");
const path = require("path");

//Inclusion des routeurs
const authRouter = require("./routers/authentication");
const userRouter = require("./routers/user");

//Création de l'application
const app = express();

//test de connexion à la BDD
const database = new sequelize(`mysql://${config.db.username}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.database}`);
database.authenticate().then(() => {
    console.log("Connection à la base de donnée éffectuée !");
}).catch(() => {
    console.error("Impossible de se connecter à la base de données !");
});

//Modification des headers pour autoriser les accès cross origin et les methodes utilisées par l'API
app.use((_request, response, next) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

//Utilisation du dossier images
app.use("/images", express.static(path.join(__dirname, "images")));

//Application des routes
app.use("/api/authentication", authRouter);
app.use("/api/user", userRouter);


module.exports = app;