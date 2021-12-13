//import des modules
const express = require("express");
//Création du routeur
const router = express.Router();
//Import du controller
const userController = require("../controllers/users");
//Import des middlewares
const authorization = require("../middleware/authorization");
const multer = require("../middleware/multer");

//Récupératgion des informations de compte
router.post("/profile", authorization, userController.getProfile);
//Modification des informations de compte
router.put("/profile/update", authorization, multer, userController.updateProfile);
//Suppression du compte utilisateur
router.delete("/profile/deletion", authorization, userController.deleteProfile);

//Export du routeur
module.exports = router;