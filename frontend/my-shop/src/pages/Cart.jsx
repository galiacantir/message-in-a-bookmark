import React, { useEffect, useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import axios from 'axios';

const Cart = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        const response = await axios.get('http://localhost:8000/cart');
        setCart(response.data);
    };

    return (
        <Container className="cart-page">
            <h1>Carrello</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Prodotto</th>
                        <th>Quantità</th>
                        <th>Prezzo</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map((item) => (
                        <tr key={item.id}>
                            <td>{item.product}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price} €</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Button variant="primary">Completa l'Ordine</Button>
        </Container>
    );
};

export default Cart;