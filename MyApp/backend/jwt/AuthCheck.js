import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserModel from '../models/UserModel.js';

dotenv.config();

const AuthCheck = async (req, res, next) => {
    console.log("AuthCheck çalıştırılıyor...");
    
    // Token kontrolü
    const isToken = req.headers.authorization && req.headers.authorization.startsWith('Bearer');
    if (!isToken) {
        return next(new Error("Token Authentication Not Required"));
    }

    try {
        // Token'ı ayır ve doğrula
        const token = req.headers.authorization.split(' ')[1];
        const myToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // Kullanıcı ID'sini al
        const user = await UserModel.findById(myToken.id).select('_id');
        if (!user) {
            return next(new Error("Kullanıcı bulunamadı"));
        }

        req.user = user._id;
        
        next();
    } catch (error) {
        return next(new Error("Token Error: " + error.message));
    }
};

export default AuthCheck;