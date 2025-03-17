import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import axios from 'axios';


const ProductDetails = () => {
    const { id } = useParams(); // Obține ID-ul din URL
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/products/${id}`);
            setProduct(response.data); // Setează detaliile produsului în state
        } catch (error) {
            console.error('Eroare la obținerea detaliilor produsului:', error);
        }
    };
        
        fetchProductDetails();
    }, [id]);

    

    if (!product) {
        return <div>Loading...</div>; // Afișează un mesaj de încărcare până când datele sunt gata
    }

    return (
        <Container className="product-details-page">
            <h1>Dettagli del Prodotto</h1>
            <Card className="product-details-card">
                <Card.Img variant="top" src={product.image} className="product-details-image" />
                <Card.Body>
                    <Card.Title>{product.name_product}</Card.Title>
                    <Card.Text>{product.descr_product}</Card.Text>
                    <Card.Text><strong>Prezzo: {product.price} €</strong></Card.Text>
                    <Button variant="primary" onClick={() => window.history.back()}>
                        Torna indietro
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ProductDetails;