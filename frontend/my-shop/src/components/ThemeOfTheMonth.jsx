import React from 'react';
import { Container, Row, Col, Carousel, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const springProducts = [
    {
        id: 1,
        name: 'Find joy in every day',
        description: 'Un segnalibro ricamato con fiori di campo colorati.',
        price: 15,
        image: 'src/assets/media/find_joy_every_day.jpg',
    },
    {
        id: 2,
        name: 'Rose Moldave',
        description: 'Un segnalibro con motivi di farfalle e fiori.',
        price: 18,
        image: 'src/assets/media/trandafiri_moldova.jpg',
    },
    {
        id: 3,
        name: 'Segnalibri con messaggi',
        description: 'Un segnalibro con i colori vivaci dell\'arcobaleno.',
        price: 12,
        image: 'src/assets/media/spring_bookmarks.jpg',
    },
];

const ThemeOfTheMonth = () => {
    return (
        <Container className="theme-of-the-month my-5">
            <h2 className="text-center mb-4">Tema del Mese: Primavera</h2>
            <p className="text-center mb-5">
                Scopri la nostra collezione di segnalibri ispirati alla primavera, pieni di colori e motivi floreali.
            </p>
            <Carousel>
                {springProducts.map((product) => (
                    <Carousel.Item key={product.id}>
                        <Row>
                            {/* Partea stângă: Imaginea */}
                            <Col md={6}>
                                <img
                                    className="d-block w-100"
                                    src={product.image}
                                    alt={product.name}
                                    style={{ height: '400px', objectFit: 'cover' }}
                                />
                            </Col>

                            {/* Partea dreaptă: Informații despre produs */}
                            <Col md={6} className="d-flex align-items-center">
                                <div className="p-4">
                                    <h3>{product.name}</h3>
                                    <p>{product.description}</p>
                                    <p><strong>Prezzo: {product.price} €</strong></p>
                                    <Button  className="me-2">
                                        Aggiungi al carrello
                                    </Button>
                                    <Button>
                                        Aggiungi ai preferiti
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Carousel.Item>
                ))}
            </Carousel>
            <div className="text-center mt-4">
                <Button as={Link} to="/spring-collection">
                    Vedi tutta la collezione
                </Button>
            </div>
        </Container>
    );
};

export default ThemeOfTheMonth;