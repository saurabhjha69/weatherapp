import jwt from "jsonwebtoken"
const secret = `${process.env.JWT_SECRET}`

export const generateAuthToken = (user,expiresIn)=> {
    const token = jwt.sign({
        username: user.username,
        email: user.email
    },secret, {
        expiresIn: expiresIn
    })
    return token
}

export const verifyAuthToken = (token) => {
    const payload = jwt.verify(token,secret)
    return payload
}