
import UserModel from "../models/UserModel.js";
import expressAsyncHandler from "express-async-handler";
import bcrypt from 'bcrypt'
import { createJwtToken } from "../jwt/tokenCreate.js";



//login
export const Login = expressAsyncHandler(
    async (req, res) => {
        //kullanıcı girişi işlemleri burada yapılacak
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email ve şifre zorunlu" });
        }

        const isUserModel = await UserModel.findOne({ email: email });
        console.log(isUserModel);

        if (!isUserModel) {
            return res.status(401).json({ message: "Kullanıcı bulunamadı" });
        }
        const isMatch = await bcrypt.compare(password, isUserModel.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Şifre yanlış" });
        }
        return res.status(200).json({
            message: "Giriş Başarılı Hoş Geldin ! " + isUserModel.name,
            user: {
                name: isUserModel.name,
                email: isUserModel.email,
            },
            token: createJwtToken(isUserModel._id),
        })

    }
);

//register 

export const Register = expressAsyncHandler(
    async (req, res) => {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Tüm alanlar zorunlu" });
        }
        const isUserModel = await UserModel.findOne({ email: email });
        if (isUserModel) {
            return res.status(400).json({ message: "Bu e-posta zaten kullanılıyor" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            name: name,
            email: email,
            password: hashedPassword
        }
        const createdUser = await UserModel.create(newUser);
        if (!createdUser) {
            return res.status(500).json(
                {
                    message: "Kullanıcı kaydı başarısız"
                }
            );
        }
        console.log(createdUser);
        res.status(201).json({
            message: "Kayıt başarılı! Giriş yapabilirsiniz",
            user: createdUser,
            success: true,
            token: createJwtToken(createdUser._id),
        });
    })

// export const Verify = expressAsyncHandler(async (req, res) => {
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//         return res.status(401).json({ message: 'Yetkisiz erişim, token gerekli' });
//     }

//     const token = authHeader.split(' ')[1];

//     try {
//         // Token'ı doğrula
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         return res.status(200).json({ message: 'Token geçerli', user: decoded });
//     } catch (err) {
//         console.error('Token doğrulama hatası:', err.message);
//         return res.status(401).json({ message: 'Geçersiz veya süresi dolmuş token' });
//     }
// })