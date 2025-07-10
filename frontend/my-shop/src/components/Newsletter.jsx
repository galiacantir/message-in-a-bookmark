// import React from 'react';
// import { Container, Row, Col, Button } from 'react-bootstrap';

// const newsletter = {
//     title: 'Iscriviti alla Newsletter',
//     description: 'Rimani aggiornato sulle novità e le promozioni.',
//     buttonText: 'Iscriviti',
// };

// const Newsletter = () => {
//     return (
//         <Container fluid>
//             <Row className="newsletter mt-5 py-5">
//                 <Col className="text-center">
//                     <h2>{newsletter.title}</h2>
//                     <p>{newsletter.description}</p>
//                     <form className="d-flex justify-content-center">
//                         <input
//                             type="email"
//                             placeholder="Inserisci la tua email"
//                             className="p-2 me-2 newsletter-input"
//                         />
//                         <Button type="submit" variant="primary" className="newsletter-button">
//                             {newsletter.buttonText}
//                         </Button>
//                     </form>
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

// export default Newsletter;

import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

const Newsletter = () => {
    return (
        <Container fluid className="newsletter-section py-5">
            <Row className="justify-content-center">
                <Col lg={8} className="text-center">
                    <h2 className="newsletter-title mb-3">Iscriviti alla Newsletter</h2>
                    <p className="newsletter-description mb-4">
                        Rimani aggiornato sulle novità e le promozioni esclusive.
                    </p>

                    <Form className="newsletter-form d-flex flex-column flex-md-row gap-2 justify-content-center">
                        <Form.Control
                            type="email"
                            placeholder="La tua email"
                            className="newsletter-input py-3 px-4"
                            required
                        />
                        <Button
                            variant="primary"
                            type="submit"
                            className="newsletter-button py-3 px-4 text-nowrap"
                        >
                            Iscriviti Ora
                        </Button>
                    </Form>

                    <p className="disclaimer mt-3">
                        Promettiamo di non inviare spam. Puoi cancellarti in qualsiasi momento.
                    </p>
                </Col>
            </Row>
        </Container>
    );
};

export default Newsletter;