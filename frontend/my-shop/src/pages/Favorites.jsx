import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        fetchFavorites();
    }, []);

    const fetchFavorites = async () => {
        const response = await axios.get('http://localhost:8000/favorites');
        setFavorites(response.data);
    };

    return (
        <Container className="favorites-page">
            <h1>Preferiti</h1>
            <Row>
                {favorites.map((product) => (
                    <Col key={product.id} md={4} className="mb-4">
                        <Card>
                            <Card.Img variant="top" src={product.image} />
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>{product.price} €</Card.Text>
                                <Button variant="primary">Vedi dettagli</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Favorites;