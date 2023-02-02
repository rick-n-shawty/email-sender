const jwt = require('jsonwebtoken')

const createAccessToken = (id) =>{
    return jwt.sign({userId: id}, process.env.ACCESS_JWT)
}
const createRefreshToken = (id) =>{
    return jwt.sign({userId: id}, process.env.REFRESH_JWT)
}
const confirmEmailJwt = (id) =>{
    return jwt.sign({userId: id}, process.env.EMAIL_JWT, {expiresIn: '1d'})
}

module.exports = {
    createAccessToken,
    createRefreshToken,
    confirmEmailJwt
}