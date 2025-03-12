import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaHeart } from 'react-icons/fa'; // Importă icoanele
import axios from 'axios';

const ProductCard = ({ product }) => {
    const addToCart = async () => {
        try {
            await axios.post('http://localhost:8000/cart', {
                product_id: product.id,
                quantity: 1  // Cantitatea implicită
            });
            alert('Produs adăugat în coș!');
        } catch (error) {
            console.error('Eroare la adăugarea în coș:', error);
        }
    };

    const addToFavorites = async () => {
        try {
            await axios.post('http://localhost:8000/favorites', {
                product_id: product.id
            });
            alert('Produs adăugat la favorite!');
        } catch (error) {
            console.error('Eroare la adăugarea la favorite:', error);
        }
    };

    return (
        <Card style={{ width: '18rem', margin: '10px' }}>
            <Card.Img variant="top" src={product.image} />
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text><strong>Preț: {product.price} RON</strong></Card.Text>
                <Link to={`/products/${product.id}`} className="btn btn-primary me-2">Detalii</Link>
                <Button variant="success" className="me-2" onClick={addToCart}>
                    <FaShoppingCart /> {/* Icon coș */}
                </Button>
                <Button variant="outline-danger" onClick={addToFavorites}>
                    <FaHeart /> {/* Icon favorite */}
                </Button>
            </Card.Body>
        </Card>
    );
};

export default ProductCard;