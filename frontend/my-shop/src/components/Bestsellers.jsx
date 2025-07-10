import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const bestSellers = [
    { id: 1, name: 'Follow your dreams', price: 10, image: 'src/assets/media/follow_your_dreams.jpg' },
    { id: 2, name: 'Find your way', price: 12, image: 'src/assets/media/find_your_way.jpg' },
    { id: 3, name: 'Frida', price: 15, image: 'src/assets/media/frida.jpg' },
    { id: 4, name: 'Read Books and Drink Tea', price: 8, image: 'src/assets/media/read_books_tea.jpg' },
];

const Bestsellers = () => {
    return (
        <Container className='best-sellers'>
            <Row>
                <Col>
                    <h2 className="text-center p-4">I Nostri BestSeller</h2>
                    <Row>
                        {bestSellers.map((product) => (
                            <Col key={product.id} md={3} className="mb-4">
                                <Card>
                                    <Card.Img variant="top" src={product.image} alt={product.name} />
                                    <Card.Body>
                                        <Card.Title>{product.name}</Card.Title>
                                        <Card.Text>{product.price} €</Card.Text>
                                        <div>
                                            <Button as={Link} to={`/products/${product.id}`} className='details-btn'>
                                                Vedi dettagli
                                            </Button>
                                            <Button className='fav-btn'>
                                                <FaHeart />
                                            </Button>
                                            <Button className='cart-btn'>
                                                <FaShoppingCart />
                                            </Button>
                                        </div>
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

export default Bestsellers;