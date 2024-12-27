import React, { useEffect, useState } from 'react'
import { Col, Row, Container, Input, Label, Button, Badge, Alert } from 'reactstrap'

import useAuth from '../hooks/useAuth';
import { Navigate, redirect } from 'react-router';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { Login, AuthState } = useAuth();
    const [errorMessage, setErrorMessage] = useState(false);
    const GirisYap = async () => {
        const error_varmi = await Login(email, password)
        if (!error_varmi) {
            setEmail("")
            setPassword("")
        }
        setErrorMessage(error_varmi);

    }

    return (
        <Container >
            <Row className='mb-4'>
                <Col md={{ size: 6, offset: 3 }}>
                    <h1>Login</h1>
                </Col>
            </Row>


            {errorMessage && <Row className='mb-3'>
                <Col md={{ size: 6, offset: 3 }}>
                    <Alert color='danger alert_message'>{errorMessage}</Alert>
                </Col>
            </Row>}
            <Row>
                <Col md={{ size: 6, offset: 3 }} className='mb-3'>
                    <Label>Email </Label>
                    <Input className={errorMessage ? 'alertMessage_border' : 'input_login'} placeholder="Lütfen Kullanıcı Adını Girin ! "
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}

                    ></Input>
                </Col>
                <Col md={{ size: 6, offset: 3 }} className='mb-3 '>
                    <Label>Şifre </Label>
                    <Input className={errorMessage ? 'alertMessage_border' : 'input_login'} placeholder="Lütfen Kullanıcı Adını Girin ! "
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}

                    ></Input>
                </Col>
                <Col md={{ size: 6, offset: 3 }} className='mb-3'>
                    <Button className='btn-login'
                        onClick={GirisYap}
                    >Giriş Yap </Button>
                </Col>
            </Row>
        </Container>
    )
}

export default Login
