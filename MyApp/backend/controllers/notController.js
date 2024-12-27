//not kontrolleri 
import expressAsyncHandler from 'express-async-handler'
import NotModel from '../models/NotModel.js'


//not oluştur 
export const createNote = expressAsyncHandler(async (req, res) => {
    //not ekleme işlemi
    const { title, content } = req.body
    //not eklenecek verilerin doğrulama işlemi yapılacak



    if (!title || !content) {
        return res.status(400).json({
            message: 'Tüm alanları doldurunuz',
            success: false
        });
    }
    const newNote = {
        userId: req.user || null,
        title: title,
        content: content
    }
    try {
        const cretedNote = await NotModel.create(newNote);
        res.status(201).json({
            msg: "Not Başarı ile Eklendi",
            note: {
                title: cretedNote.title,
                content: cretedNote.content
            },
            success: true
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Not eklenirken bir hata oluştu',
            error: error.message
        })
    }
    res.status(201).json({ message: 'Not eklendi' });
})


//notları sil 

export const deleteNote = expressAsyncHandler(async (req, res) => {

    const { id } = req.params;
    try {
        const isNote = await NotModel.findById(id);
        console.log(isNote);
        
        if (!isNote) {
            return res.status(404).json({ message: 'Not Bulunamadı' });
        }
        if (!isNote.userId.equals(req.user)) {
            return res.status(404).json({ message: 'Bu Not Senin Değil Dostum :) ' })
        }
        await isNote.deleteOne();
        res.status(200).json({ message: `Not Silindi`, success: true });
    } catch (error) {
        res.status(500).json({ message: 'Not silinirken bir hata oluştu', error: error.message });
    }
});



//notları güncelle

export const updateNote = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;

    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ message: 'Tüm alanları doldurunuz' });
    }
    try {
        const updateNote = await NotModel.findByIdAndUpdate(id, {
            title: title,
            content: content
        });
        if (!updateNote) {
            return res.status(404).json({ message: 'Not Bulunamadı' });
        }
        res.status(200).json({ message: `Not Güncellendi`, success: true });
    } catch (error) {
        res.status(500).json({ message: 'Not güncellenirken bir hata oluştu', error: error.message });

    }
});

//notları listele

export const getNotes = expressAsyncHandler(async (req, res) => {
    console.log("Notları Listemele Çalışıyor ! ");


    try {
        const allNotes = await NotModel.find({ userId: req.user });
        if (!allNotes) {
            return res.status(404).json({ message: 'Not Bulunamadı' });
        }
        res.status(200).json({
            notes: allNotes,
            success: true
        })
    } catch (error) {
        res.status(500).json({ message: 'Notları listelerken bir hata oluştu', error: error.message });
    }
    res.status(200).json({ message: 'Notlar Listelendi' });
});
