import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CustomOrders = () => {
    return (
        <Container fluid className="custom-orders">
            <Row>
                <Col className="text-center py-5">
                    <h2 className="display-4 mb-4">Ordini Personalizzati</h2>
                    <p className="lead mb-4">
                        Vuoi un segnalibro unico? Mandaci un messaggio e lo creeremo per te!
                    </p>
                    <Button
                        as={Link}
                        to="/about"
                        variant="outline-light"
                        size="lg"
                        className="custom-button"
                    >
                        Scopri di più
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default CustomOrders;