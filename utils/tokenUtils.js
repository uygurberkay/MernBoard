import jwt from 'jsonwebtoken';

// We wont decode token on client, client only send a request to decode JWT
export const createJWT = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET , {
        expiresIn: process.env.JWT_EXPIRES_IN // JWt expires in 1 day
    });
    return token;
}

// We decode JWT with this function
export const verifyJWT = (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded
}