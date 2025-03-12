import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

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

    return (
        
        <Container className="products-page">
            <h1>La Nostra Collezione</h1>
            
            <Row>
                {products.map((product) => (
                    <Col key={product.id} md={4} className="mb-4">
                        <Card>
                            <Card.Img variant="top" src={product.image} />
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>{product.description}</Card.Text>
                                <Card.Text><strong>Prezzo: {product.price} €</strong></Card.Text>
                                <Button as={Link} to={`/products/${product.id}`} variant="primary">
                                    Vedi dettagli
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* <Container>
            <Row className="my-4">
                <Col>
                    <Nav variant="tabs" defaultActiveKey="/home">
                        <Nav.Item>
                            <Nav.Link href="/home">All</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/bijuterii">Quotes</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/accesorii">Flowers</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/cadouri">Books Quotes</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/cadouri">Freedom Vibes</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/cadouri">Funny Quotes</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
            </Row>
        </Container> */}
        </Container>
    );
};

export default Products;