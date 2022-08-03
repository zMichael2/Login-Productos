const jwt = require('jsonwebtoken');
const role = require('../models/Role');
const User = require('../models/User');

const verifyToken = async (req,res, next) => {
    try {
        const token = req.headers["x-access-token"];
    
    
    if(!token) return res.status(403).json({message: "No token provided"})

    const decoded = jwt.verify(token, process.env.JWT_SECRETFIRMA) //te da la informacion
    req.userId =decoded.id;
    
    const user = await User.findById(req.userId, {password: 0})
    
    if(!user) return res.status(404).json({message: 'no user found'});

    next();
    } catch (error) {
        return res.status(401).json({message: 'Unauthorize'})
    }
}

const isModerator = async (req, res, next) =>{
    const user = await User.findById(req.userId)
    const roles = await role.find({_id:{$in: user.roles}})
    //console.log(roles);

    for (let i = 0; i < roles.length; i++) {
        if(roles[i].name ==="moderator"){
        next();
        return;}
    }
    return res.status(403).json({ message: 'Necesitas el rango moderador'
        
    })
}

const isAdmin = async (req, res, next) =>{
    const user = await User.findById(req.userId)
    const roles = await role.find({_id:{$in: user.roles}})
    //console.log(roles);

    for (let i = 0; i < roles.length; i++) {
        if(roles[i].name ==="admin"){
        next();
        return;}
    }
    return res.status(403).json({ message: 'Necesitas el rango administrador'
        
    })
    
}

module.exports = {verifyToken, isModerator, isAdmin};