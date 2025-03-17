/*import React, { useState, useEffect } from 'react';
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
*/
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
    
/*
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

export default Orders;*/

import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newOrder, setNewOrder] = useState({
        client: '',
        product_id: '',
        quantity: 0,
        order_date: ''
    });

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        const response = await axios.get('http://localhost:8000/orders');
        setOrders(response.data);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewOrder({ ...newOrder, [name]: value });
    };

    /*const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const orderData = {
                client: newOrder.client,
                product: newOrder.product,
                quantity: newOrder.quantity,
                order_date: newOrder.order_date
            };
            const response = await axios.post('http://localhost:8000/orders', orderData);
            if (response.status === 201) {
                fetchOrders();
                setShowModal(false);
                setNewOrder({ client: '', product: '', quantity: 0, order_date: '' });
            }
        } catch (error) {
            console.error('Eroare la adăugarea ordinului:', error);
            alert('A apărut o eroare la adăugarea ordinului. Te rugăm să încerci din nou.');
        }
    };*/

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const orderData = {
                client: newOrder.client,
                product_id: newOrder.product_id,
                quantity: newOrder.quantity,
                order_date: newOrder.order_date
            };
            console.log("Trimitere comandă:", orderData); // DEBUG
            const response = await axios.post('http://localhost:8000/orders', orderData);

            console.log("Răspuns server:", response); // DEBUG

            if (response.status === 201) {
                fetchOrders();
                setShowModal(false);
                setNewOrder({ client: '', product_id: '', quantity: 0, order_date: '' });
            }
        } catch (error) {
            console.error('Eroare la adăugare:', error.response?.data || error);
            alert('A apărut o eroare la adăugare. Verifică consola.');
        }
    };


    return (
        <Container className="mt-5">
            <h1>Gestione Ordini</h1>
            <Button variant="primary" onClick={() => setShowModal(true)}>Aggiungi Nuovo Ordine</Button>

            <Table striped bordered hover className="mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Cliente</th>
                        <th>Prodotto</th>
                        <th>Quantità</th>
                        <th>Data Ordine</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.client}</td>
                            <td>{order.product_id}</td>
                            <td>{order.quantity}</td>
                            <td>{order.order_date}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Aggiungi Nuovo Ordine</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Cliente</Form.Label>
                            <Form.Control
                                type="text"
                                name="client"
                                value={newOrder.client}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Prodotto</Form.Label>
                            <Form.Control
                                type="text"
                                name="product_id"
                                value={newOrder.product_id}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Quantità</Form.Label>
                            <Form.Control
                                type="number"
                                name="quantity"
                                value={newOrder.quantity}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Data Ordine</Form.Label>
                            <Form.Control
                                type="date"
                                name="order_date"
                                value={newOrder.order_date}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">Salva Ordine</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default Orders;