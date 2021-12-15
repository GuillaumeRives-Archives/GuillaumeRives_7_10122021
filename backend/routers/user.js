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
router.delete("/profile/delete", authorization, userController.deleteProfile);
//Changement du mot de passe du compte utilisateur
router.put("/profile/changePassword", authorization, userController.changePassword);

//Export du routeur
module.exports = router;