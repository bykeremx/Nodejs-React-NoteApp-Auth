import { Router } from "express"
//controller ekle 
import {
    createNote, deleteNote, updateNote, getNotes
} from '../controllers/notController.js'


const parametreExits = (req, res, next) => {
    const { id } = req.params
    if (!id) {
        return res.status(400).json({ message: "Hemşehrim id vermeden ne iş :) ? " })
    }
    next();
};

const router = Router()

// Define the routes
router.post('/', createNote);
router.get('/', getNotes);


//parametre exist control middleware


router.delete('/:id', parametreExits, deleteNote);
router.put('/:id', parametreExits, updateNote);

export default router;
