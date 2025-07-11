import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CustomOrders = () => {
    const [message, setMessage] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Messaggio inviato:', message);
        setIsSubmitted(true);
        setMessage('');
        setTimeout(() => setIsSubmitted(false), 3000);
    };

    return (
        <Container fluid className="custom-orders py-5">
            <Row className="justify-content-center">
                <Col md={8} className="text-center">
                    <h2 className="mb-4">Ordine Personalizzato</h2>
                    <p className="mb-4">
                        Vuoi un segnalibro unico? Mandami un messaggio con i dettagli e lo creerò appositamente per te!
                    </p>

                    {isSubmitted && (
                        <Alert variant="success" className="mb-4">
                            Grazie! Ho ricevuto il tuo messaggio e ti risponderò al più presto.
                        </Alert>
                    )}

                    <Form onSubmit={handleSubmit} className="mb-4">
                        <Form.Group controlId="formMessage" className="mb-3">
                            <Form.Control
                                as="textarea"
                                rows={5}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Descrivi il tuo segnalibro ideale (forma, colore, testo, ecc.)..."
                                required
                            />
                        </Form.Group>

                        <div className="d-flex justify-content-center gap-3">
                            <Button
                                variant="primary"
                                type="submit"
                                className="flex-grow-0"
                            >
                                Invia Richiesta
                            </Button>

                            <Button
                                as={Link} to='/products'
                                variant="secondary"
                                className="flex-grow-0"
                            >
                                Vedi esempi
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default CustomOrders;