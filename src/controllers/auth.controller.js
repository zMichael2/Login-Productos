const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Role = require("../models/Role");

const singUp = async (req, res) => {
  const { username, email, password, roles } = req.body;
  
  const newUser = new User({
    username,
    email,
    password: await User.encryptPassword(password),
  });
  if (roles) {
    const foundRoles = await Role.find({ name: { $in: roles } });
    newUser.roles = foundRoles.map((role) => role._id);
  } else {
    const role = await Role.findOne({ name: "user" });
    newUser.roles = [role._id];
  }
  const savedUser = await newUser.save();

  const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRETFIRMA, {
    expiresIn: 86400,
  }); //cuando lo deje pasar, 86400 es 1 dia
  res.status(200).json({ token });
};

const singin = async (req, res) => {
  const userFound = await User.findOne({email: req.body.email}).populate("roles"); //populate da todo el objeto entero, no en id
  if (!userFound) return res.status(400).json({message: "User not found"});
  

  const matchPassword = await User.comparePassword(req.body.password, userFound.password)
  if(!matchPassword) return res.status(401).json({token:null, message:'Invalid password'})
  
  const token = jwt.sign({id: userFound._id}, process.env.JWT_SECRETFIRMA, {expiresIn: 86400})
  res.json({token});
};

module.exports = { singUp, singin };
