import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const newsletter = {
    title: 'Iscriviti alla Newsletter',
    description: 'Rimani aggiornato sulle novità e le promozioni.',
    buttonText: 'Iscriviti',
};

const Newsletter = () => {
    return (
        <Container fluid>
            <Row className="newsletter mt-5 py-5">
                <Col className="text-center">
                    <h2>{newsletter.title}</h2>
                    <p>{newsletter.description}</p>
                    <form className="d-flex justify-content-center">
                        <input
                            type="email"
                            placeholder="Inserisci la tua email"
                            className="p-2 me-2 newsletter-input"
                        />
                        <Button type="submit" variant="primary" className="newsletter-button">
                            {newsletter.buttonText}
                        </Button>
                    </form>
                </Col>
            </Row>
        </Container>
    );
};

export default Newsletter;