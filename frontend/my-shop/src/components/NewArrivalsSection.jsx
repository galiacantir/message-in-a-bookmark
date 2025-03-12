import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const newArrivals = [
    { id: 5, name: 'Glow in the dark', description: 'Un segnalibro che brilla al buio.', price: 12, image: 'src/assets/media/glow_in_the_dark.jpg' },
    { id: 6, name: 'Create your own sunshine', description: 'Un segnalibro che porta luce e positività.', price: 10, image: 'src/assets/media/create_your_sunshine_2.jpg' },
    { id: 7, name: 'Good vibes', description: 'Un segnalibro per chi cerca vibrazioni positive.', price: 8, image: 'src/assets/media/good_vibes.jpg' },
];

const NewArrivalsSection = () => {
    return (
        <Container className='new-arrivals'>
            <Row>
                <Col>
                    <h2 className="text-center pb-5">Novità</h2>
                    <Row xs={1} md={3} className="g-4">
                        {newArrivals.map((product) => (
                            <Col key={product.id}>
                                <Card className="h-100">
                                    {/* Imaginea produsului */}
                                    <Card.Img
                                        variant="top"
                                        src={product.image}
                                        alt={product.name}
                                        style={{ height: '200px', objectFit: 'cover' }}
                                    />
                                    <Card.Body>
                                        {/* Titlul și descrierea */}
                                        <Card.Title>{product.name}</Card.Title>
                                        <Card.Text>{product.description}</Card.Text>
                                        <Card.Text>
                                            <strong>Prezzo: {product.price} €</strong>
                                        </Card.Text>
                                            <Button as={Link} to={`/products/${product.id}`} className='details-btn me-2' >Vedi dettagli</Button>
                                            <Button className='fav-btn me-2' >
                                                <FaHeart />
                                            </Button>
                                            <Button className='cart-btn'>
                                                <FaShoppingCart />
                                            </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default NewArrivalsSection;