import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const response = await axios.get('http://localhost:8000/cart');
            setCart(response.data);
            setError(null);
        } catch (error) {
            console.error('Eroare la obținerea coșului:', error);
            setError('Eroare la încărcarea coșului.');
        } finally {
            setLoading(false);
        }
    };

    const handleCompleteOrder = async () => {
        try {
            await axios.post('http://localhost:8000/orders', { cart });
            alert('Comanda a fost plasată cu succes!');
            setCart([]); // Golește coșul după plasarea comenzii
        } catch (error) {
            console.error('Eroare la plasarea comenzii:', error);
            alert('Eroare la plasarea comenzii.');
        }
    };

    if (loading) {
        return <Container className="cart-page">Loading...</Container>;
    }

    if (error) {
        return (
            <Container className="cart-page">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

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
            <Button variant="primary" onClick={handleCompleteOrder}>
                Completa l'Ordine
            </Button>
        </Container>
    );
};

export default Cart;





// import React, { useEffect, useState } from 'react';
// import { Container, Table, Button } from 'react-bootstrap';
// import axios from 'axios';

// const Cart = () => {
//     const [cart, setCart] = useState([]);

//     useEffect(() => {
//         fetchCart();
//     }, []);

//     const fetchCart = async () => {
//         const response = await axios.get('http://localhost:8000/cart');
//         setCart(response.data);
//     };

//     return (
//         <Container className="cart-page">
//             <h1>Carrello</h1>
//             <Table striped bordered hover>
//                 <thead>
//                     <tr>
//                         <th>Prodotto</th>
//                         <th>Quantità</th>
//                         <th>Prezzo</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {cart.map((item) => (
//                         <tr key={item.id}>
//                             <td>{item.product}</td>
//                             <td>{item.quantity}</td>
//                             <td>{item.price} €</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>
//             <Button variant="primary">Completa l'Ordine</Button>
//         </Container>
//     );
// };

// export default Cart;