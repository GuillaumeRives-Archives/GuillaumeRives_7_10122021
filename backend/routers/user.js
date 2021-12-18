//import des modules
const express = require("express");
//Création du routeur
const router = express.Router();
//Import du controller
const userController = require("../controllers/users");
//Import des middlewares
const authorization = require("../middleware/authorization");
const avatar = require("../middleware/avatar");

//Récupératgion des informations de compte
router.post("", authorization, userController.getProfile);
//Modification des informations de compte
router.put("/update", authorization, userController.updateProfile);
//Suppression du compte utilisateur
router.delete("/delete", authorization, userController.deleteProfile);
//Modification de l'avatar
router.put("/profilePic", authorization, avatar, userController.profilePicture);
//Changement du mot de passe du compte utilisateur
router.put("/changePassword", authorization, userController.changePassword);

//Export du routeur
module.exports = router;