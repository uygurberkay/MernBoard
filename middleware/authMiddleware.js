import { BadRequestError, UnauthenticatedError, UnauthorizedError } from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";

/* Authenticate logged user */
export const authenticateUser = async (req,res,next) => {
    const { token } = req.cookies;
    if(!token) throw new UnauthenticatedError('Authentication invalid') 

    try {
        const {userId, role} = verifyJWT(token) // Takes token's userId and role variables
        const testUser = userId === '6527fc6c6b568ff419dab506'
        req.user = {userId, role , testUser} // Assign to the user Object
        next()
    } catch (error) {
        throw new UnauthenticatedError('Authentication invalid')
    }
}

export const authorizePermissions = (...roles) => {
    return (req,res,next) => {        
        if(!roles.includes(req.user.role)) {
            throw new UnauthorizedError('Unauthorized to access this route')
        }
        next()
    }
}

export const checkForTestUser = (req,res,next) => {
    if(req.user.testUser) throw new BadRequestError('Demo user. Read Only!')
    next()
}