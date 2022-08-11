import React, { useState } from 'react';
import '../styles/NavBar.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import Cart from './Cart';

const NavBar = () => {

    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const logout = () => {
        localStorage.setItem('token', '')
        navigate('/')
    }

    return (
        <>
            <Navbar bg="light" expand="lg" sticky='top' className='py-2 mb-4'>
                <Container>
                    <Navbar.Brand href="#/" className='text-primary fw-bold'>e-commerce</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
                        <Nav className="text-end">
                            <Nav.Link className='navbar-link' href="#/">Home</Nav.Link>
                            {token && <Nav.Link className='navbar-link' onClick={handleShow}>Cart</Nav.Link>}
                            {token && <Nav.Link className='navbar-link' href="#/purchases">Purchases</Nav.Link>}
                            {token ? (
                                <Nav.Link className='navbar-link' onClick={() => logout()}>Logout</Nav.Link>
                            ) : (
                                <Nav.Link className='navbar-link' href="#/login">Login</Nav.Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Cart show={show} handleClose={handleClose} token={token}/>
        </>
    );
};

export default NavBar;