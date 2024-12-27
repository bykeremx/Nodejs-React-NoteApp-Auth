import React, { useContext, useEffect, useState } from 'react';
import { Col, Row, Container, Input, Label, Button, Alert } from 'reactstrap';
import { Link } from 'react-router'; // 'react-router' yerine 'react-router-dom' kullanılmalı
import useAuth from '../hooks/useAuth';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [error, setError] = useState(false);
    const {Register} = useAuth()


    const registerButtonHandle = async () =>{
        const kayit = await Register(name,email,password);
        if(!kayit){
            setError(true);
        }
    }
    
    
    useEffect(() => {
        if (password !== passwordRepeat && passwordRepeat !== '') {
            setError(true);
        } else {
            setError(false);
        }
    }, [password, passwordRepeat]); 

    console.log(password, passwordRepeat);

    return (
        <Container>
            <Row className="mb-4">
                <Col md={{ size: 6, offset: 3 }}>
                    <h1>Kayıt Ol!</h1>
                </Col>
            </Row>

            <Row>
                <Col md={{ size: 3 }}></Col>
                <Col md={{ size: 6 }}>
                    <Row>
                        <Col md={{ size: 6 }} className="mb-3">
                            <Label>Adınız</Label>
                            <Input
                                className="input_login"
                                placeholder="Lütfen Adınızı Girin!"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Input>
                        </Col>
                        <Col md={{ size: 6 }} className="mb-3">
                            <Label>Email</Label>
                            <Input
                                className="input_login"
                                placeholder="Lütfen Email Girin!"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></Input>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{ size: 12 }} className="mb-3">
                            <Label>Şifre</Label>
                            <Input
                                className={error ? 'alertMessage_border' : 'input_login'}
                                type="password" // Şifre gizlemek için type="password"
                                placeholder="Lütfen Şifre Girin!"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            ></Input>
                        </Col>
                        <Col md={{ size: 12 }} className="mb-3">
                            <Label>Şifre Tekrarı</Label>
                            <Input
                                className={error ? 'alertMessage_border' : 'input_login'}
                                type="password" // Şifre gizlemek için type="password"
                                placeholder="Lütfen Şifrenizi Tekrar Girin!"
                                value={passwordRepeat}
                                onChange={(e) => setPasswordRepeat(e.target.value)}
                            ></Input>
                        </Col>

                        {error && <Col md={{ size: 12 }} className="mb-3">
                            <Alert color="danger alert_message">Şifreler uyuşmuyor!</Alert>
                        </Col>}

                    </Row>
                    <Row>
                        <Col md={{ size: 6 }} className="mb-3 w-100">
                            <Button 
                            
                            onClick={registerButtonHandle}
                            className="btn-login" disabled={error || !password || !passwordRepeat}>
                                Kayıt Ol
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{ size: 6 }}>
                            <p>
                                Hesabınız var mı?{' '}
                                <span>
                                    <Link to="/login">Giriş Yap</Link>
                                </span>
                            </p>
                        </Col>
                    </Row>
                </Col>
                <Col md={{ size: 3 }}></Col>
            </Row>
        </Container>
    );
};

export default Register;
