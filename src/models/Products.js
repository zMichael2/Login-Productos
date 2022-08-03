const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  category: String,
  prince: Number,
  imgURL: String,
},{
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Product', ProductSchema);
