import React from 'react';
import '../styles/LoadingScreen.css'
import { Spinner } from 'react-bootstrap';

const LoadingScreen = () => {
    return (
        <div className='loading-screen-overlay'>
            <Spinner animation="border" variant="primary" />
        </div>
    );
};

export default LoadingScreen;