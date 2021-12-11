//Inclusion des variables d'environnement
const config = require("./../config/config.json");

//Inclusion des modules
const Models = require("./../models");
const Bcrypt = require("bcryptjs");
const Crypto = require("./../utils/crypto");
const Token = require("jsonwebtoken");

//Paramétrage Bcrypt
const saltRounds = 10;

//Fonction appelée par la route signup
exports.signup = (request, response) => {
    let newUser = {};
    Bcrypt.hash(request.body.password, saltRounds).then(hash => {
        newUser = {
            name: request.body.name,
            email: Crypto.sha256(request.body.email),
            password: hash,
            avatar: request.body.avatar,
            isadmin: 0
        }
        Models.User.findOne({
            attributes: ["email", "name"],
            where: {
                "email": Crypto.sha256(request.body.email)
            }
        }).then(result => {
            if (result) {
                response.status(400).json({
                    "message": "Utilisateur existant !"
                });
            } else {
                Models.User.create(newUser).then(result => {
                    response.status(200).json({
                        "message": "Utilisateur créé !"
                    })
                }).catch(error => {
                    response.status(500).json({
                        "message": error
                    })
                })
            }
        })
    }).catch(error => {
        response.status(500).json({
            "message": error
        });
    });
};

//Fonction appelée par la route login
exports.login = (request, response) => {};