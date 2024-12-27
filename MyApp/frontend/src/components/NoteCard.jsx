import React from 'react'

import {
    Col, Card, CardTitle, CardText, Button,
    Row, Badge
} from 'reactstrap'

import { FaTrash, FaPaperclip } from 'react-icons/fa6'
import useNote from '../hooks/useNote';

const NoteCard = ({ note }) => {
    console.log("Note card");
    const { deleteNote } = useNote();
    const { title, content } = note;

    const deletenote = async () => {
        await deleteNote(note._id);
        console.log("Deleted");
    }
    return (
        <Col sm={3}>
            <Card body className='NoteCard'>
                <CardTitle tag="h5">
                    <Row>
                        <Col>
                            <Badge className='bg-dark paperclips'>
                                <FaPaperclip />
                            </Badge>
                            {title}
                        </Col>
                        <Col>
                            <Button onClick={deletenote} className='float-end DeleteNote bg-danger'>
                                <FaTrash />
                            </Button>
                        </Col>
                    </Row>
                </CardTitle>
                <hr className='border-5' />
                <CardText>
                    {content}
                </CardText>
            </Card>
        </Col>
    )
}

export default NoteCard
