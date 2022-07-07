const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (req, res, next)=>{
    if(req.method === 'OPTIONS'){
        return next()
    }
    try{
        const token = req.headers.authorization.split(' ')[1]
        if(!token){
            return res.status(401).json({messge: 'Ошибка авторизации'})
        }
        const decoded = jwt.verify(token, process.env.token_key)
        req.user = decoded
        next()
    } catch(err){
        console.log(err)
        return res.status(401).json({messge: 'Ошибка авторизации'})
    }
}