//import des modules
const express = require("express");
//Création du routeur
const router = express.Router();
//Import du controller
const likeController = require("../controllers/likes");
//Import des middlewares
const authorization = require("../middleware/authorization");

//Ajout / suppression d'un like
router.post("/switch", authorization, likeController.switch);

module.exports = router;
