import React from 'react';
import { Container, Row, Col, Button, Card, Carousel, Nav } from 'react-bootstrap';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import NewArrivalsSection from '../components/NewArrivalsSection';
import Bestsellers from '../components/Bestsellers';
import GiftIdeas from '../components/GiftIdeas';
import CustomOrders from '../components/CustomOrders';
import ThemeOfTheMonth from '../components/ThemeOfTheMonth';
import Newsletter from '../components/Newsletter';
const Home = () => {


    return (
        <>
        {/* --- Header --- */}
        <Container fluid className=''>
            <Row className="text-center py-5 header">
                <Col>
                    <h1>Message in a Bookmark Shop</h1>
                    <p>Ricamati con passione, ogni segnalibro racconta una storia.</p>
                    <Button as={Link} to='/products' className='custom-btn'>Scopri la collezione</Button>
                </Col>
            </Row>
        </Container>

        {/* --- Section 1: Bestsellers --- */}
        <Bestsellers />
         
        {/* --- Section 2: New Arrivals --- */}
        <NewArrivalsSection/>

        {/* --- Section 3: Gift Ideas --- */}
        <GiftIdeas/>
    
        {/* --- Section 5: Custom bookmarks --- */}
        <CustomOrders/>

        {/* Section 5: Theme of the month: Spring */}
        <ThemeOfTheMonth/>
    
        {/* --- Section 6: Newsletter --- */}
        <Newsletter/> 
            
        </>
    );
};

export default Home;