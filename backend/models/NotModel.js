import mongoose from "mongoose";

const NoteSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    title: {
        type: String,
        required: [true,'Başlık Bilgisi Girilmedi']
    },
    content: {
        type: String,
        required: [true,'İçerik Bilgisi Girilmedi']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Note', NoteSchema);