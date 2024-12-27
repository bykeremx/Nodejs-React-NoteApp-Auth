import React, { useState } from 'react'
import { Col, Input, Button } from 'reactstrap'
import useNote from '../hooks/useNote'

const AddNote = () => {

    const { addNote } = useNote();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const AddedNotes = () => {
        addNote(title, content);
        setTitle("");
        setContent("");
    }


    return (
        <>
            <Col sm={6}>
                <h5>Başlık</h5>
                <Input className='inputAdd' value={title} onChange={e => setTitle(e.target.value)}></Input>
            </Col>
            <Col sm={6}>
                <h5>İçerik</h5>
                <Input className='inputAdd' value={content} onChange={e => setContent(e.target.value)}></Input>
            </Col>
            <Col sm={12}>
                <Button className='addedButton w-100' onClick={AddedNotes}>
                    Oluştur
                </Button>
            </Col>

        </>
    )
}

export default AddNote
