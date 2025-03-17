import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { FaShoppingCart } from 'react-icons/fa';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFavorites();
    }, []);

    const fetchFavorites = async () => {
        try {
            const response = await axios.get('http://localhost:8000/favorites');
            setFavorites(response.data);
            setError(null);
        } catch (error) {
            console.error('Eroare la obținerea favorite:', error);
            setError('Eroare la încărcarea favorite.');
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveFavorite = async (productId) => {
        try {
            await axios.delete(`http://localhost:8000/favorites/${productId}`);
            setFavorites(favorites.filter((item) => item.id !== productId));
            alert('Produsul a fost eliminat din favorite.');
        } catch (error) {
            console.error('Eroare la eliminarea din favorite:', error);
            alert('Eroare la eliminarea din favorite.');
        }
    };

    if (loading) {
        return <Container className="favorites-page">Loading...</Container>;
    }

    if (error) {
        return (
            <Container className="favorites-page">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container className="favorites-page">
            <h1>Preferiti</h1>
            <Row>
                {favorites.map((product) => (
                    <Col key={product.id} md={3} className="mb-4">
                        <Card>
                            <Card.Img variant="top" src={product.image} />
                            <Card.Body>
                                <Card.Title>{product.name_product}</Card.Title>
                                <Card.Text>{product.price} €</Card.Text>
                                <Button variant="primary" className="me-2">
                                    Vedi dettagli
                                </Button>
                                <Button variant="danger" className="me-2"  onClick={() => handleRemoveFavorite(product.id)}>
                                  Elimina
                                </Button>
                                <Button className='cart-btn'>
                                    <FaShoppingCart />
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Favorites;