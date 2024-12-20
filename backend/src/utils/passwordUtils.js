import bcryptjs from "bcryptjs"
const salt = bcryptjs.genSaltSync(10)

export const encryptPassword = (message)=> {
    if(!message) {
        throw new Error("String Given for Encryption is Empty!")
    }
    return bcryptjs.hashSync(message,salt)
}

export const verifyEncodedPassword = (message,encoded) => {
    return bcryptjs.compareSync(message,encoded)
}