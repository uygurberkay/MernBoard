import { UnauthenticatedError } from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";

/* Authenticate logged user */
export const authenticateUser = async (req,res,next) => {
    const { token } = req.cookies;
    if(!token) throw new UnauthenticatedError('Authentication invalid') 

    try {
        const {userId, role} = verifyJWT(token) // Takes token's userId and role variables
        req.user = {userId, role} // Assign to the user Object
        next()
    } catch (error) {
        throw new UnauthenticatedError('Authentication invalid')
    }
}
