import { User } from "../models/user.js"
import { verifyAuthToken } from "../utils/authTokenUtils.js"


export const authenticateUser = async (req,res,next) => {
    try {
        const {authorization} = req?.headers
        const authToken = authorization.split(" ")[1]

        const payload = verifyAuthToken(authToken)
        const authenticatedUser = await User.findOne({
            username: payload.username,
            email: payload.email
        })
        if (!authenticatedUser){
            return res.status(403).json({message: "Unauthorized Access! & forged User"})
        }
        req.user = authenticatedUser

        next()
    } catch (error) {
        return res.status(403).json({message: "Unauthorized Access!",error: error.message || "Something went wrong!"})
    }
}