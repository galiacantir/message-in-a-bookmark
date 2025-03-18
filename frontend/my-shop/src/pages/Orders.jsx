/*import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newOrder, setNewOrder] = useState({
        client: '',
        product_id: '',
        quantity: 1,
        order_date: ''
    });

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:8000/orders');
            setOrders(response.data);
        } catch (error) {
            console.error('Errore durante il recupero degli ordini:', error);
            alert('Impossibile caricare gli ordini. Verificare la connessione al server.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewOrder({ ...newOrder, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const orderData = {
                client: newOrder.client,
                product_id: parseInt(newOrder.product_id), // Convertire in intero
                quantity: parseInt(newOrder.quantity),
                order_date: newOrder.order_date
            };

            console.log("Invio ordine:", orderData);

            const response = await axios.post('http://localhost:8000/orders', orderData);
            console.log("Risposta server:", response);

            if (response.status === 200 || response.status === 201) {
                fetchOrders();
                setShowModal(false);
                setNewOrder({ client: '', product_id: '', quantity: 1, order_date: '' });
                alert('Ordine aggiunto con successo!');
            }
        } catch (error) {
            console.error('Errore durante l\'aggiunta:', error.response?.data || error);
            alert('Si è verificato un errore durante l\'aggiunta dell\'ordine. Verificare i dati e riprovare.');
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('it-IT');
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
                        <th>Nome Prodotto</th>
                        <th>Quantità</th>
                        <th>Prezzo</th>
                        <th>Totale</th>
                        <th>Data Ordine</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.client}</td>
                                <td>{order.product_id}</td>
                                <td>{order.name_product}</td>
                                <td>{order.quantity}</td>
                                <td>{order.price} €</td>
                                <td>{order.total} €</td>
                                <td>{formatDate(order.order_date)}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="text-center">Nessun ordine disponibile</td>
                        </tr>
                    )}
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
                                placeholder="Inserisci il nome del cliente"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>ID Prodotto</Form.Label>
                            <Form.Control
                                type="number"
                                name="product_id"
                                value={newOrder.product_id}
                                onChange={handleInputChange}
                                placeholder="Inserisci l'ID del prodotto"
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
                                min="1"
                                placeholder="Inserisci la quantità"
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
                        <div className="d-flex justify-content-end">
                            <Button variant="secondary" className="me-2" onClick={() => setShowModal(false)}>
                                Annulla
                            </Button>
                            <Button variant="primary" type="submit">
                                Salva Ordine
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default Orders;*/


import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Form, Modal, Row, Col, InputGroup, Badge, Dropdown, DropdownButton } from 'react-bootstrap';
import axios from 'axios';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editOrderId, setEditOrderId] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [orderToDelete, setOrderToDelete] = useState(null);

    const [newOrder, setNewOrder] = useState({
        client: '',
        product_id: '',
        quantity: 1,
        order_date: new Date().toISOString().split('T')[0]
    });

    useEffect(() => {
        fetchOrders();
        fetchProducts();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:8000/orders');
            setOrders(response.data);
        } catch (error) {
            console.error('Errore durante il recupero degli ordini:', error);
            alert('Impossibile caricare gli ordini. Verificare la connessione al server.');
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8000/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Errore durante il recupero dei prodotti:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewOrder({ ...newOrder, [name]: value });
    };

    const handleProductSelect = (product) => {
        setSelectedProduct(product);
        setNewOrder({ ...newOrder, product_id: product.id });
    };

    const calculateTotal = () => {
        if (selectedProduct && newOrder.quantity) {
            return (selectedProduct.price * newOrder.quantity).toFixed(2);
        }
        return '0.00';
    };

    const resetForm = () => {
        setNewOrder({
            client: '',
            product_id: '',
            quantity: 1,
            order_date: new Date().toISOString().split('T')[0]
        });
        setSelectedProduct(null);
        setEditMode(false);
        setEditOrderId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const orderData = {
                client: newOrder.client,
                product_id: parseInt(newOrder.product_id),
                quantity: parseInt(newOrder.quantity),
                order_date: newOrder.order_date
            };

            let response;

            if (editMode) {
                response = await axios.put(`http://localhost:8000/orders/${editOrderId}`, orderData);
                alert('Ordine aggiornato con successo!');
            } else {
                response = await axios.post('http://localhost:8000/orders', orderData);
                alert('Ordine aggiunto con successo!');
            }

            if (response.status === 200 || response.status === 201) {
                fetchOrders();
                setShowModal(false);
                resetForm();
            }
        } catch (error) {
            console.error('Errore durante il salvataggio:', error.response?.data || error);
            alert('Si è verificato un errore. Verificare i dati e riprovare.');
        }
    };

    const handleEdit = (order) => {
        const productToEdit = products.find(p => p.id === order.product_id);
        setSelectedProduct(productToEdit);
        setNewOrder({
            client: order.client,
            product_id: order.product_id,
            quantity: order.quantity,
            order_date: order.order_date.split('T')[0]
        });
        setEditMode(true);
        setEditOrderId(order.id);
        setShowModal(true);
    };

    const confirmDelete = (order) => {
        setOrderToDelete(order);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8000/orders/${orderToDelete.id}`);
            fetchOrders();
            setShowDeleteModal(false);
            alert('Ordine eliminato con successo!');
        } catch (error) {
            console.error('Errore durante l\'eliminazione:', error);
            alert('Si è verificato un errore durante l\'eliminazione dell\'ordine.');
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('it-IT');
    };

    const formatCurrency = (value) => {
        return parseFloat(value).toFixed(2) + ' €';
    };

    // Funzione per ordinare gli ordini
    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    // Applica l'ordinamento e il filtro
    const getSortedAndFilteredOrders = () => {
        let filteredOrders = [...orders];

        // Applica il filtro di ricerca
        if (searchTerm) {
            const search = searchTerm.toLowerCase();
            filteredOrders = filteredOrders.filter(order =>
                order.client.toLowerCase().includes(search) ||
                (order.name_product && order.name_product.toLowerCase().includes(search))
            );
        }

        // Applica l'ordinamento
        if (sortConfig.key) {
            filteredOrders.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }

        return filteredOrders;
    };

    // Stile per header coloane sortabile
    const getSortIndicator = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'asc' ? ' ▲' : ' ▼';
        }
        return '';
    };

    return (
        <Container className="mt-5">
            <h1>Gestione Ordini</h1>

            <Row className="mb-3">
                <Col md={4}>
                    <Button variant="primary" onClick={() => {
                        resetForm();
                        setShowModal(true);
                    }}>
                        Aggiungi Nuovo Ordine
                    </Button>
                </Col>
                <Col md={8}>
                    <InputGroup>
                        <Form.Control
                            placeholder="Cerca per cliente o prodotto..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Button variant="outline-secondary" onClick={() => setSearchTerm('')}>
                            Cancella
                        </Button>
                    </InputGroup>
                </Col>
            </Row>

            <div className="table-responsive">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th onClick={() => requestSort('id')} style={{ cursor: 'pointer' }}>
                                ID {getSortIndicator('id')}
                            </th>
                            <th onClick={() => requestSort('client')} style={{ cursor: 'pointer' }}>
                                Cliente {getSortIndicator('client')}
                            </th>
                            <th onClick={() => requestSort('name_product')} style={{ cursor: 'pointer' }}>
                                Prodotto {getSortIndicator('name_product')}
                            </th>
                            <th onClick={() => requestSort('quantity')} style={{ cursor: 'pointer' }}>
                                Quantità {getSortIndicator('quantity')}
                            </th>
                            <th onClick={() => requestSort('price')} style={{ cursor: 'pointer' }}>
                                Prezzo {getSortIndicator('price')}
                            </th>
                            <th onClick={() => requestSort('total')} style={{ cursor: 'pointer' }}>
                                Totale {getSortIndicator('total')}
                            </th>
                            <th onClick={() => requestSort('order_date')} style={{ cursor: 'pointer' }}>
                                Data Ordine {getSortIndicator('order_date')}
                            </th>
                            <th>Azioni</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getSortedAndFilteredOrders().length > 0 ? (
                            getSortedAndFilteredOrders().map((order) => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.client}</td>
                                    <td>
                                        {order.name_product || 'N/A'}
                                        <Badge bg="secondary" className="ms-2">ID: {order.product_id}</Badge>
                                    </td>
                                    <td>{order.quantity}</td>
                                    <td>{formatCurrency(order.price)}</td>
                                    <td>{formatCurrency(order.total)}</td>
                                    <td>{formatDate(order.order_date)}</td>
                                    <td>
                                        <Button variant="outline-primary" size="sm" className="me-1" onClick={() => handleEdit(order)}>
                                            Modifica
                                        </Button>
                                        <Button variant="outline-danger" size="sm" onClick={() => confirmDelete(order)}>
                                            Elimina
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="text-center">Nessun ordine disponibile</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>

            {/* Modal per aggiungere/modificare ordini */}
            <Modal show={showModal} onHide={() => {
                setShowModal(false);
                resetForm();
            }} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{editMode ? 'Modifica Ordine' : 'Aggiungi Nuovo Ordine'}</Modal.Title>
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
                                placeholder="Inserisci il nome del cliente"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Prodotto</Form.Label>
                            <InputGroup>
                                <DropdownButton
                                    variant="outline-secondary"
                                    title={selectedProduct ? selectedProduct.name_product : "Seleziona Prodotto"}
                                    id="product-dropdown"
                                >
                                    {products.map(product => (
                                        <Dropdown.Item
                                            key={product.id}
                                            onClick={() => handleProductSelect(product)}
                                        >
                                            {product.name_product} - {formatCurrency(product.price)}
                                        </Dropdown.Item>
                                    ))}
                                </DropdownButton>
                                <Form.Control
                                    readOnly
                                    value={selectedProduct ? `ID: ${selectedProduct.id} - Prezzo: ${formatCurrency(selectedProduct.price)}` : ''}
                                    placeholder="Nessun prodotto selezionato"
                                />
                            </InputGroup>
                            <input
                                type="hidden"
                                name="product_id"
                                value={newOrder.product_id}
                                required
                            />
                        </Form.Group>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Quantità</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="quantity"
                                        value={newOrder.quantity}
                                        onChange={handleInputChange}
                                        min="1"
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Totale</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={formatCurrency(calculateTotal())}
                                        readOnly
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

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

                        <div className="d-flex justify-content-end">
                            <Button variant="secondary" className="me-2" onClick={() => {
                                setShowModal(false);
                                resetForm();
                            }}>
                                Annulla
                            </Button>
                            <Button
                                variant="primary"
                                type="submit"
                                disabled={!newOrder.product_id || !newOrder.client || newOrder.quantity < 1}
                            >
                                {editMode ? 'Aggiorna Ordine' : 'Salva Ordine'}
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Modal di conferma eliminazione */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Conferma Eliminazione</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {orderToDelete && (
                        <p>Sei sicuro di voler eliminare l'ordine #{orderToDelete.id} del cliente {orderToDelete.client}?</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Annulla
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Elimina
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Orders;