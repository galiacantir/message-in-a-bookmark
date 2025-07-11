// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Navbar, Nav, Container } from 'react-bootstrap';
// import { FaShoppingCart, FaHeart } from 'react-icons/fa'; // Importă icoanele

// const CustomNavbar = () => {
//     return (
//         <Navbar expand="lg" className='custom-navbar' >
//             <Container>
//                 <Navbar.Brand as={Link} to="/">
//                     <img src="src/assets/media/logo_3.png" alt="" className='img-logo'/>
//                 </Navbar.Brand>
//                 <Navbar.Toggle aria-controls="basic-navbar-nav" />
//                 <Navbar.Collapse id="basic-navbar-nav">
//                     <Nav className="m-auto">
//                         <Nav.Link as={Link} to="/">Home</Nav.Link>
//                         <Nav.Link as={Link} to="/products">Prodotti</Nav.Link>
//                         <Nav.Link as={Link} to="/about">Chi sono</Nav.Link>
//                         <Nav.Link as={Link} to="/blog">Blog</Nav.Link>
//                     </Nav>
//                     <Nav>
//                         <Nav.Link as={Link} to="/orders">Ordini</Nav.Link>
//                         <Nav.Link as={Link} to="/cart">
//                             <FaShoppingCart size={20} />
//                         </Nav.Link>
//                         <Nav.Link as={Link} to="/favorites">
//                             <FaHeart size={20} />
//                         </Nav.Link>
//                     </Nav>
//                 </Navbar.Collapse>
//             </Container>
//         </Navbar>
//     );
// };

// export default CustomNavbar;

import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';

const CustomNavbar = () => {
    return (
        <Navbar expand="lg" className="custom-navbar">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <img
                        src="src/assets/media/logo_3.png"
                        alt="Logo"
                        className="navbar-logo"
                    />
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="navbar-content" />

                <Navbar.Collapse id="navbar-content">
                    <Nav className="navbar-center-links mx-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/products">Prodotti</Nav.Link>
                        <Nav.Link as={Link} to="/about">Chi sono</Nav.Link>
                    </Nav>

                    <Nav className="navbar-right-links">
                        <Nav.Link as={Link} to="/orders">Ordini</Nav.Link>
                        <Nav.Link as={Link} to="/favorites">
                            <FaHeart className="nav-icon" />
                        </Nav.Link>
                        <Nav.Link as={Link} to="/cart">
                            <FaShoppingCart className="nav-icon" />
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default CustomNavbar;