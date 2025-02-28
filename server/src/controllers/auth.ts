require('dotenv').config()
import jwt, { JwtPayload } from "jsonwebtoken";

export const generateToken = (data: JwtPayload)=>{
   const jwtSecret = process.env.jwtSecret as string;
   return jwt.sign(data, jwtSecret);
}

export const decodeToken = (token: string)=>{
    const jwtSecret = process.env.jwtSecret as string;
    try {
        const decoded = jwt.verify(token, jwtSecret);
        return decoded;
    } catch (error) {
        return null;
    }
}