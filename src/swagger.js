const path = require('path')
const swaggerSpec = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Login API',
        version: "1.0.0"
      },
      servers: [
        {
          url: "http://localhost:3000"
        }
      ]
    },
    apis: [`${path.join(__dirname, './routes/*.js')}`]
   };


/**
 * @swagger
 *  components:
 */

module.exports = swaggerSpec;