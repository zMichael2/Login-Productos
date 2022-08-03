const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/auth.controller');
const { verifySingup } = require('../middlewares');
const {checkDuplicateUsername, checkRolesExisted} = verifySingup;

//registrar
/**
 * @swagger
 *  tags:
 *      name: Registrar
 *      descriotion: Registro de usuarios nuevos
 */

/**
 * @swagger
 * 
 * components:
 *  schemas:
 *    Registrar:
 *      type: object
 *      properties:
 *          username:
 *              type: string
 *              description: nombre de usuario
 *              required: true
 *          email:
 *              type: string
 *              description: correo electronico
 *              required: true
 *          password:
 *              type: string
 *              description: contraseña del usuario
 *              required: true
 *    Login:
 *      type: object
 *      properties:
 *          email:
 *              type: string
 *              description: correo electronico
 *              required: true
 *          password:
 *              type: string
 *              description: contraseña del usuario
 *              required: true
 */

/**
 * @swagger
 * paths:
 *  /api/auth/signup:
 *      post:
 *          summary: registrar usuarios nuevo
 *          tags: [Registrar]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Registrar'
 *          responses:
 *              200:
 *               description: retorna un token
 * 
 */
authRouter.post('/signup',[checkDuplicateUsername, checkRolesExisted],authController.singUp)

//iniciar sección
/**
 * @swagger
 *  tags:
 *      name: Login
 *      descriotion: Registro de usuarios nuevos
 */

/**
 * @swagger
 * paths:
 *  /api/auth/signin:
 *      post:
 *          summary: inicio de sección del usuario
 *          tags: [Login]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Login'
 *          responses:
 *              200:
 *               description: retorna un token
 * 
 */
authRouter.post('/signin',authController.singin)




module.exports = authRouter;