const express = require("express");
const morgan = require("morgan");


const authRoutes = require('./routes/auth.routes')
const productRoutes = require('./routes/products.routes')
const userRoutes = require('./routes/user.routes')

const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerSpec = require('./swagger')
const createRoles =require('./libs/initialSeptup')

const app = express();

createRoles();


app.use(morgan("dev"));
app.use(express.json()); //para que entienda los json que llegan al serviodr
app.get("/", (req,res) => {
  res.json({
    Name: "Back-end login",
    Version: "1.0",
  });
});

app.use('/apic-doc', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)))
app.use('/api/products',productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

module.exports = app;
