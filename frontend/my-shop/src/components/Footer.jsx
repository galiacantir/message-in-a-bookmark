import React from 'react';
import { Container, Navbar } from 'react-bootstrap';

const Footer = () => {
    return (
        <Navbar bg="dark" variant="dark" >
            <Container className="justify-content-center">
                <Navbar.Text className="text-white">
                    &copy; 2025 Message in a Bookmark. Toate drepturile rezervate.
                </Navbar.Text>
            </Container>
        </Navbar>
    );
};

export default Footer;