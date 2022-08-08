import React from 'react';
import '../styles/Login.css'
import Button from 'react-bootstrap/Button';

const Login = () => {
    return (
        <div className='d-flex justify-content-center align-items-center pb-4 login-father'>
            <div className='login-container p-4 rounded'>
                <h4 className='mb-4'>Welcome! Enter your email and password to continue</h4>
                <div className='test-data-container p-3 rounded'>
                    <p className='fw-bold m-0 text-center'>Test data</p>
                    <p className='m-2'><small><i className="fa-regular fa-envelope"></i> manson@gmail.com</small></p>
                    <p className='m-2'><small><i className="fa-solid fa-lock"></i> manson1234</small></p>
                </div>
                <div>
                    <label className='d-block mb-1 mt-3' htmlFor="email">Email</label>
                    <input className='d-block rounded ps-2 login-input' id='email' type="email" />
                    <label className='d-block mb-1 mt-3' htmlFor="password">Password</label>
                    <input className='d-block rounded ps-2 login-input' id='password' type="password" />
                </div>
                <div className="d-grid gap-2 pt-4">
                    <Button variant="primary" size="md">
                        Login
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Login;