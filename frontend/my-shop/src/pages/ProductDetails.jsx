// import React from 'react';
// import { useParams, useState, useEffect} from 'react-router-dom';
// import { Container, Row, Col, Button } from 'react-bootstrap';
// import axios from 'axios';

// const ProductDetails = () => {
//     const { id } = useParams();
//     const [product, setProduct ] = useState(null);

//     // useEffect(() => {
//     //     fetchProduct();
//     // },);

//     // const fetchProduct = async () => {
//     //     const response = await axios.get(`http://localhost:8000/products/${id}`);
//     //     setProduct(response.data);
//     // };

//     if (!product) {
//         return <div>Caricamento...</div>;
//     }
//     return (
//         <Container className="mt-5">
//             <Row>
//                 <Col md={6}>
//                     <img src={product.image} alt={product.name} className="img-fluid" />
//                 </Col>
//                 <Col md={6}>
//                     <h1>{product.name}</h1>
//                     <p>{product.description}</p>
//                     <p><strong>Preț: {product.price} RON</strong></p>
//                     <Button variant="primary" className="me-2">Adaugă în coș</Button>
//                     <Button variant="outline-danger">Adaugă la favorite</Button>
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

// export default ProductDetails;