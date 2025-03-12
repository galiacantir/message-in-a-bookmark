import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';


const About = () => {
    return (
        <Container className="about-page">
            <Row>
                <Col>
                    <h1>Chi Sono</h1>
                    <p>
                        Ciao! Sono [Il Tuo Nome], la creatrice di Message in a Bookmark. Mi piace creare segnalibri ricamati a mano, ognuno con una storia unica.
                    </p>
                    <p>
                        Ho iniziato questo progetto per passione per l'arte e per offrire alle persone qualcosa di speciale e personalizzato.
                    </p>
                </Col>
            </Row>
        </Container>
    );
};

export default About;