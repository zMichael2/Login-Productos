const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL)
.then(db => console.log('Base de datos conectada'))
.catch(error => console.log(error));

module.exports = mongoose;