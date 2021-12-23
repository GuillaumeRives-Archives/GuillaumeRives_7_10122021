//Inclusion de la config
const config = require("../config/config.json");

//Import des modules
const Models = require("../models");
const FileSystem = require("fs");
const Jimp = require("jimp");
const Sequelize = require("sequelize");

//Création d'un post
exports.createPost = (request, response) => {
    if (request.file) {
        const newPost = {
            UserId: response.locals.userId,
            title: request.body.title,
            image: `${request.protocol}://${request.get("host")}/images/posts/${request.file.filename}`,
            description: request.body.description
        }
        //Traitement de l'image pour la limiter à 400x400 px
        Jimp.read(`./images/posts/${request.file.filename}`).then(output => {
            output.cover(config.jimp.postWidth, config.jimp.postWidth).write(`./images/posts/${request.file.filename}`);
            //Création du post
            Models.Post.create(newPost).then(() => {
                response.status(201).json({
                    message: "Votre post a bien été publié !"
                });
            }).catch(error => {
                response.status(500).json(error);
            });
        }).catch(error => {
            FileSystem.unlink(`./images/posts/${request.file.filename}`, () => {
                console.error(error);
            });
            response.status(500).json({
                message: "Une erreur est survenue lors du traitement de votre image !"
            });
        })
    } else {
        response.status(500).json({
            message: "Merci de renseigner une image..."
        });
    }
}

//Récupération de tous les posts
exports.getAllPosts = (_request, response) => {
    Models.Post.findAll({
        include: [{
            model: Models.User,
            model: Models.Like
        }],
        order: [
            ["id", "DESC"]
        ]
    }).then(result => {
        response.status(200).json(result);
    }).catch(error => {
        response.status(500).json(error);
    });
}

//Récupération d'un post
exports.getPost = (request, response) => {
    Models.Post.findOne({
        where: {
            id: request.params.id
        }
    }).then(post => {
        if (post) {
            response.status(200).json(post);
        } else {
            response.status(200).json({
                message: "Ce post n'a pas été trouvé..."
            });
        }
    }).catch(error => {
        response.status(500).json(error);
    });
}

//Mise à jour d'un post
exports.updatePost = (request, response) => {
    Models.Post.findOne({
        attributes: ["id", "userId", "image", "title", "description"],
        where: {
            id: request.body.id
        }
    }).then(post => {
        if (post) {
            if (post.UserId === response.locals.userId || response.locals.isadmin) {
                const modifiedPost = {
                    title: request.body.title,
                    description: request.body.description
                }
                Models.Post.update(modifiedPost, {
                    where: {
                        id: post.id
                    }
                }).then(() => {
                    response.status(200).json({
                        message: "Post mis à jour avec succès !"
                    });
                }).catch(error => {
                    response.status(500).json(error);
                });
            } else {
                response.status(401).json({
                    message: "Requête non autorisée !"
                });
            }
        } else {
            response.status(404).json({
                message: "Ce post est introuvable !"
            });
        }
    }).catch(error => {
        response.status(500).json(error);
    });
}

//Suppression d'un post
exports.deletePost = (request, response) => {
    Models.Post.findOne({
        attributes: ["id", "UserId", "image"],
        where: {
            id: request.body.id
        }
    }).then(post => {
        if (post) {
            if (post.UserId === response.locals.userId || response.locals.isadmin) {
                const img = post.image.split("/images/posts/")[1];
                FileSystem.unlink(`images/posts/${img}`, () => {
                    console.log(`Image ${img} supprimée des resources...`);
                });
                Models.Post.destroy({
                    where: {
                        id: post.id
                    }
                }).then(() => {
                    response.status(200).json({
                        message: "Post supprimé !"
                    });
                }).catch(error => {
                    response.status(500).json(error);
                });
            } else {
                response.status(401).json({
                    message: "Requête non autorisée !"
                });
            }
        } else {
            response.status(404).json({
                message: "Ce post est introuvable !"
            });
        }
    }).catch(error => {
        response.status(500).json(error);
    });
}