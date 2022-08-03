const Products = require('../models/Products')
 
 const createProducts = async (req,res) =>{
  const {name, category, price, imgURL} = req.body;
  const newProduct = new Products({name, category, price, imgURL }); //guardar en base de datos
  const productSaved = await newProduct.save();
   res.status(201).json(productSaved)
}

const getProducts = async (req,res) =>{
  const products = await Products.find()
  res.json(products)
}

 const getProductsById = async (req,res) =>{
  const {id} = req.params;
  const prodcut = await Products.findById(id)
  res.status(200).json(prodcut)

}
 const updateProducts = async (req,res) =>{
  const updateProduct = await Products.findByIdAndUpdate(req.params.id, req.body, {new: true})
  res.status(200).json(updateProduct)
}
 const deleteProducts = async (req,res) =>{
  await Products.findByIdAndDelete(req.params.id);
  res.status(204).json()
}
module.exports = {getProducts, getProductsById, createProducts, updateProducts, deleteProducts};


