//import des modules
const express = require("express");
//Création du routeur
const router = express.Router();
//Import du controller
const postController = require("../controllers/posts");
//Import des middlewares
const authorization = require("../middleware/authorization");
const adminCheck = require("../middleware/adminCheck");
const postImage = require("../middleware/postImage");

//Création d'un post
router.post("/create", authorization, postImage, postController.createPost);
//Récupération de tous les posts
router.get("", authorization, postController.getAllPosts);
//Récupération d'un post
router.get("/:id", authorization, postController.getPost);
//Modification d'un post
router.put("/update", authorization, adminCheck, postImage, postController.updatePost);
//Suppression d'un post
router.delete("/delete", authorization, adminCheck, postController.deletePost);

//Export du routeur
module.exports = router;
