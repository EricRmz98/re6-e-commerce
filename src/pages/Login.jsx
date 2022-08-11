import React from 'react';
import '../styles/Login.css'
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    

    const submit = data => {
        axios
            .post('https://ecommerce-api-react.herokuapp.com/api/v1/users/login', data)
            .then(res => {
                navigate('/')
                localStorage.setItem('token', res.data.data.token)
            })
            .catch(error => {
                if(error.response.status === 404) {
                    alert('Wrong user or password');
                }
                console.log(error.response);
            });
    }

    return (
        <div className='d-flex justify-content-center align-items-center pb-4 login-father'>
            <div className='login-container p-4 rounded'>
                <h4 className='mb-4'>Welcome! Enter your email and password to continue</h4>
                <div className='test-data-container p-3 rounded'>
                    <p className='fw-bold m-0 text-center'>Test data</p>
                    <p className='m-2'><small><i className="fa-regular fa-envelope"></i> mason@gmail.com</small></p>
                    <p className='m-2'><small><i className="fa-solid fa-lock"></i> mason1234</small></p>
                </div>

                <form onSubmit={handleSubmit(submit)}>
                    <label className='d-block mb-1 mt-3' htmlFor="email">Email</label>
                    <input {...register('email')} className='d-block rounded ps-2 login-input' id='email' type="email" />
                    <label className='d-block mb-1 mt-3' htmlFor="password">Password</label>
                    <input {...register('password')} className='d-block rounded ps-2 login-input' id='password' type="password" />

                    <div className="d-grid gap-2 pt-4">
                        <Button variant="primary" size="md" type='submit'>
                            Login
                        </Button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default Login;