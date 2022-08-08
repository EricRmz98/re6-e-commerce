import React from 'react';
import '../styles/NavBar.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NavBar = () => {
    return (
        <Navbar bg="light" expand="lg" sticky='top' className='py-2 mb-4'>
            <Container>
                <Navbar.Brand href="#/" className='text-primary fw-bold'>e-commerce</Navbar.Brand>        
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
                        <Nav className="text-end">
                            <Nav.Link className='navbar-link' href="#/">Home</Nav.Link>
                            <Nav.Link className='navbar-link' href="#/login">Login</Nav.Link>
                            <Nav.Link className='navbar-link' href="#/purchases">Purchases</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;