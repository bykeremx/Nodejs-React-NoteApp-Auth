import React, { useEffect, useMemo } from 'react'
import { Col, Row, Container } from 'reactstrap'
import '../assets/style/HomePage.css'
import useNote from '../hooks/useNote'
import NoteCard from './NoteCard'
import AddNote from './AddNote'


const HomePage = () => {



  //getNot 

  const { Notes, getNotes, Loading  } = useNote()
  useEffect(() => {
    getNotes()
  }, []);
  return (
    <Container className="mt-3">
      <Row>
        <h1>Not Ekle</h1>
      </Row>
      <Row className='mt-3'>
        <AddNote></AddNote>
      </Row>
      <hr></hr>
      <Row className='mt-5'>
        {
          Loading ? <h1>Yükleniyor...</h1> : Notes.map((note,index) => (
            <NoteCard key={index} note={note} />
          ))
        }
      </Row>
    </Container>
  )
}

export default HomePage
