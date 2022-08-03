const express = require('express');
const productsRouter = express.Router();
const productsC = require('../controllers/products.controller')

const middlewares = require('../middlewares');
const {verifyToken, isModerator, isAdmin} = middlewares.authJwt;

productsRouter.post('/', [verifyToken, isAdmin], productsC.createProducts)
productsRouter.get('/', productsC.getProducts)
productsRouter.get('/:id', productsC.getProductsById)
productsRouter.put('/:id', [verifyToken, isAdmin], productsC.updateProducts)
productsRouter.delete('/:id',[ verifyToken,isAdmin], productsC.deleteProducts)



module.exports = productsRouter;