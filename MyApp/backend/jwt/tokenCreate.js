import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const {JWT_SECRET_KEY, JWT_EXPRESS_IN } = process.env
// console.log(JWT_SECRET_KEY, JWT_EXPRESS_IN);

export const createJwtToken = (id) =>{

    const token = jwt.sign({id},JWT_SECRET_KEY,{
        expiresIn:JWT_EXPRESS_IN
    });
    return token;

}

