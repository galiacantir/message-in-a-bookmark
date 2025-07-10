import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8000/products');
            setProducts(response.data);  // Setează produsele în state
        } catch (error) {
            console.error('Eroare la obținerea produselor:', error);
        }
    };

        const addToCart = async (productId) => {
            try {
                await axios.post('http://localhost:8000/cart', {
                    product_id: productId,
                    quantity: 1 // Cantitatea implicită
                });
                alert('Produsul a fost adăugat în coș!');
            } catch (error) {
                console.error('Eroare la adăugarea în coș:', error);
                alert('Eroare la adăugarea în coș.');
            }
        };

        const addToFavorites = async (productId) => {
            try {
                await axios.post('http://localhost:8000/favorites', {
                    product_id: productId
                });
                alert('Produsul a fost adăugat la favorite!');
            } catch (error) {
                console.error('Eroare la adăugarea la favorite:', error);
                alert('Eroare la adăugarea la favorite.');
            }
        };

    return (
        
        <Container className="products-page">
            
            <h1 className='my-5 text-center'>La Nostra Collezione</h1>
            
            <Row>
                {products.map((product) => (
                    <Col key={product.id} md={3} className="mb-4">
                        <Card>
                            <Card.Img variant="top" src={product.image} className='product-image'/>
                            <Card.Body>
                                <Card.Title>{product.name_product}</Card.Title>
                                <Card.Text>{product.descr_product}</Card.Text>
                                <Card.Text><strong>Prezzo: {product.price} €</strong></Card.Text>
                                <Button className='details-btn' as={Link} to={`/products/${product.id}`}>
                                    Vedi dettagli
                                </Button>
                                <Button className='fav-btn'
                                    onClick={() => addToFavorites(product.id)}>
                                    <FaHeart />
                                </Button>
                                <Button className='cart-btn' 
                                    onClick={() => addToCart(product.id)} >
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

export default Products;