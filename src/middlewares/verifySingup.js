const User = require("../models/User")

const ROLES = ['user', 'admin', 'moderator']

const checkDuplicateUsername = async (req,res,next) => {
    const user = await User.findOne({username: req.body.username})
    if (user) return res.status(400).json({message: 'usuario ya existe'})

    const email = await User.findOne({email: req.body.email})
    if (email) return res.status(400).json({message: 'email ya existe'})

    next();
}

const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
        if(!ROLES.includes(req.body.roles[i])){
             return res.status(400).json({
                message: `rol ${req.body.roles[i]} no existe`
             })
        }
    }
  }

  next();
};

module.exports = {checkRolesExisted, checkDuplicateUsername};
