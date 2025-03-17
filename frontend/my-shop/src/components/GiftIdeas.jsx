import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';


const giftIdeas = [
    {
        id: 1,
        category: 'Regali per amanti della lettura',
        products: [
            { id: 1, name: 'New day, new chapter', price: 18, image: 'src/assets/media/new_day_new_chapter.jpg' },
        ],
    },
    {
        id: 2,
        category: 'Regali Motivazionali',
        products: [
            { id: 3, name: 'Enjoy the little things', price: 12, image: 'src/assets/media/enjoy_little_things.jpg' },
        ],
    },
    {
        id: 3,
        category: 'Regali per Amici',
        products: [
            { id: 5, name: 'Lighthouse', price: 10, image: 'src/assets/media/lighthouse.jpg' },
        ],
    },
    {
        id: 4,
        category: 'Regali per Natale',
        products: [
            { id: 6, name: 'Christmas Tree', price: 15, image: 'src/assets/media/lighthouse_2.jpg' },
        ],
    },
];

const GiftIdeas = () => {
    return (
        <Container className="gift-ideas my-5">
            <h2 className="text-center mb-5">Idee Regalo per Ogni Occasione</h2>
            <Row xs={1} md={2} lg={4} className="g-4">
                {giftIdeas.map((idea) => (
                    <Col key={idea.id}>
                        <Card className="h-100 shadow-sm">
                            {/* Imaginea produsului */}
                            <div className="card-img-container">
                                <Card.Img
                                    variant="top"
                                    src={idea.products[0].image}
                                    alt={idea.products[0].name}
                                    className="card-img-top"
                                />
                            </div>
                            <Card.Body className="d-flex flex-column">
                                <Card.Title className="text-center">{idea.products[0].name}</Card.Title>
                                <Card.Text className="text-center text-muted">{idea.products[0].price} €</Card.Text>
                                <div className="d-flex justify-content-center gap-2 mt-auto">
                                    <Button as={Link} to={`/products/`} className='details-btn me-2' >Vedi dettagli</Button>
                                    <Button className='fav-btn me-2' >
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
        </Container>
    );
};

export default GiftIdeas;