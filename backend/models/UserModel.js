import mongoose from 'mongoose';


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"Ad Alanı Gerekli"],
        minlength: 3,
        maxlength: 20
    },
    email: {
        type: String,
        required: [true,"Email Alanı Gerekli"],
    },
    password: {
        type: String,
        required: [true,"Şifre Alanı Gerekli"],
        minlength: 8
    }
});

export default mongoose.model('User', UserSchema);