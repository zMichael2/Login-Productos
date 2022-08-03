require('dotenv').config()
require('./database');
const app = require('./app');
const port = process.env.PORT || 3000 ;
app.listen(port, ()=> { console.log('Servidor ejecutandose')
})