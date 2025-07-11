
import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { FaInstagram, FaBookOpen, FaHandsHelping } from 'react-icons/fa';

const About = () => {
    return (
        <Container className="about-page py-5">
            <Row className="align-items-center">
                <Col md={6} className="pe-md-5">
                    <h1 className="display-4 mb-4" style={{ color: '#347f8c' }}>Ciao, sono Galia!</h1>

                    <p className="lead mb-4">
                        <FaBookOpen className="me-2" style={{ color: '#e96a67' }} />
                        Appassionata di libri e ricamo, unisco queste due passioni per creare segnalibri unici che raccontano storie.
                    </p>

                    <div className="mb-4">
                        <p>
                            Ogni mio segnalibro è realizzato a mano con cura e attenzione ai dettagli. Li puoi trovare:
                        </p>
                        <ul className="custom-list">
                            <li><FaHandsHelping className="me-2" style={{ color: '#65a57d' }} />In negozi di handmade selezionati</li>
                            <li><FaHandsHelping className="me-2" style={{ color: '#65a57d' }} />In librerie indipendenti</li>
                            <li><FaHandsHelping className="me-2" style={{ color: '#65a57d' }} />Online sul mio shop</li>
                        </ul>
                    </div>

                    <div className="social-contact mt-5">
                        <p className="mb-3">Seguimi su Instagram per vedere le mie ultime creazioni:</p>
                        <a
                            href="https://instagram.com/message_in_a_bookmark"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="instagram-link"
                        >
                            <FaInstagram className="me-2" />
                            @message_in_a_bookmark
                        </a>
                    </div>
                </Col>

                <Col md={6} className="text-center mt-4 mt-md-0">
                    <Image
                        src="src/assets/media/logo_3.png"
                        alt="Logo Message in a Bookmark"
                        fluid
                        className="about-logo shadow-sm"
                    />
                </Col>
            </Row>
        </Container>
        
    );
};

export default About;