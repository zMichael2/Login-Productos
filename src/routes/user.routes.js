const express = require('express');
const createUser = require('../controllers/user.controllers');
const userRouter = express.Router();
const middlewares = require('../middlewares')
const  {authJwt, verifySingup} = middlewares
const {verifyToken, isAdmin} = authJwt
const {checkRolesExisted, checkDuplicateUsername} =verifySingup




userRouter.post('/',[verifyToken,isAdmin, checkRolesExisted ], createUser)


module.exports = userRouter;