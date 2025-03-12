import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import axios from 'axios';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';

const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        const response = await axios.get('http://localhost:8000/orders');
        setOrders(response.data);
    };

    // const addToCart = async (productId) => {
    //     try {
    //         await axios.post('http://localhost:8000/cart', {
    //             product_id: productId,
    //             quantity: 1
    //         });
    //         alert('Il prodotto e stato aggiunto nel carello');
    //     } catch(error){
    //         console.error('Eroare', error);
    //     }
    // }

    // const addToFavorites = async (productId) => {
    //     try {
    //         await axios.post('http://localhost:8000/favorites', {
    //             product_id: productId
    //         });
    //         alert('Produs adăugat la favorite!');
    //     } catch (error) {
    //         console.error('Eroare la adăugarea la favorite:', error);
    //     }
    // };
    

    return (
        <Container className="mt-5">
            <h1>I miei ordini</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Prodotto</th>
                        <th>Quantita</th>
                        <th>Prezo</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.product}</td>
                            <td>{order.quantity}</td>
                            <td>{order.price}€</td>
                            <td>{order.order_date}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default Orders;