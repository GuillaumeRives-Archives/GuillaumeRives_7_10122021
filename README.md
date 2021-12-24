# OpenClassrooms Web Dev: Module 7

Module 7 of the [OpenClassrooms](https://openclassrooms.com/) Web Dev bootcamp. This module consists of the development of an intranet service which provides multimedia uploading (pictures in instance).

The prerequisites for this module are :

-  Create an API with [Express JS](https://expressjs.com/)
-  Use an SQL ORM ([Sequelize](https://sequelize.org/) is used here)
-  Use a front-end framework ([Vue JS](https://v3.vuejs.org/) is used here)

## Installation

### Database setup

> You **MUST** have a SQL database in order to run this project. You can install one via softwares like [WampServer](https://www.wampserver.com/), [EasyPHP](https://www.easyphp.org/), [Uwamp](https://www.uwamp.com/), etc.

Create a user with his own database those infos will be used in the next part

### Config file

This project needs a config file not included in this repository for safety purposes. The path of this config is `/backend/config/config.json`. You **MUST** create it !

the explained content of this config file is :

```json
{
   "db": {
      "username": "dbuser",
      "password": "dbpass",
      "database": "dbname",
      "host": "localhost",
      "dialect": "mysql",
      "port": 3306
   },
   "jwt": {
      "secret": "secretphrase",
      "expiration": "24h"
   },
   "bcrypt": {
      "saltrounds": 10
   },
   "jimp": {
      "avatarWidth": 100,
      "postWidth": 400
   }
}
```

| key                 | definition                                           |
| :------------------ | :--------------------------------------------------- |
| `db.username`       | username used to connect to your database            |
| `db.password`       | password used to connect to your database            |
| `db.database`       | the actual database name                             |
| `db.host`           | host or IP address of your SQL server                |
| `db.dialect`        | dialect used by your SQL server                      |
| `db.port`           | Connection port of your SQL server                   |
| `jwt.secret`        | Secret phrase used to generate a JSON web token      |
| `jwt.expiration`    | Expiration time of generated JSON web tokens         |
| `bcrypt.saltrounds` | Number of rounds used to hash passwords using Bcrypt |
| `jimp.avatarWidth`  | width and height of avatar images resized by the API |
| `jimp.postWidth`    | width and height of post images resized by the API   |

### Project setup

1. `git clone` this project somewhere on your machine
2. Open a terminal in the _backend_ directory located inside the project root
3. Run `npm install` to install back-end dependencies
4. Run `npx sequelize --env db db:migrate` to populate your database with tables used in this project
5. Open a terminal in the _frontend_ directory located inside the project root
6. Run `npm install` to install front-end dependencies

You should be set to run the project now...

## Run the project

1. Open a terminal in the _backend_ directory located inside the project root
2. Run `node server` (you can optionnally install nodemon and run `nodemon server`)
3. Open a new terminal in the _frontend_ directory located inside the project root
4. Run `npm run serve` to launch the development version of the front-end

## Build the project

1. You can build the Vue project using `npm run build` command. the resulting build will be located in `/dist` directory.

## Dependencies

Here are the dependencies listed in **package.json** of the back-end side and front-end side.

### Back-end

```json
"dependencies": {
    "bcryptjs": "^2.4.3",
    "crypto-js": "^4.1.1",
    "express": "^4.17.1",
    "jimp": "^0.16.1",
    "jsonwebtoken": "^8.5.1",
    "multer": "^1.4.4",
    "mysql2": "^2.3.3",
    "sequelize": "^6.12.0-beta.2",
    "uuid": "^8.3.2"
},
"devDependencies": {
    "sequelize-cli": "^6.3.0"
}
```

### Frontend

```json
"dependencies": {
      "@popperjs/core": "^2.11.0",
      "axios": "^0.24.0",
      "bootstrap": "^5.1.3",
      "bootstrap-icons": "^1.7.2",
      "core-js": "^3.6.5",
      "vue": "^3.0.0",
      "vue-router": "^4.0.0-0"
   },
"devDependencies": {
    "@vue/cli-plugin-babel": "~4.5.0",
    "@vue/cli-plugin-router": "~4.5.0",
    "@vue/cli-service": "~4.5.0",
    "@vue/compiler-sfc": "^3.0.0",
    "babel-eslint": "^10.1.0",
    "sass": "^1.45.0",
    "sass-loader": "^10.2.0"
}
```
