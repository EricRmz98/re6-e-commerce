import '../styles/SignUp.css';
import Button from 'react-bootstrap/Button';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const SignUp = () => {
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      navigate('/');
    }
  }, []);

  const signUp = (data) => {
    axios
      .post('https://e-commerce-api.academlo.tech/api/v1/users', data)
      .then((res) => {
        navigate('/login');
        alert('Successful sign up, you can log in now');
      })
      .catch((error) => {
        if (error.response.status === 404) {
          alert('Error trying to sign up');
        }
        console.log(error.response);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center pb-4 sign-up-father">
      <div className="sign-up-container p-4 rounded">
        <h4 className="mb-4">Sign up</h4>
        <form onSubmit={handleSubmit(signUp)}>
          <label className="d-block mb-1 mt-3" htmlFor="email">
            Email
          </label>
          <input
            {...register('email')}
            className="d-block rounded ps-2 sign-up-input"
            id="email"
            type="email"
          />

          <label className="d-block mb-1 mt-3" htmlFor="firstName">
            First Name
          </label>
          <input
            {...register('firstName')}
            className="d-block rounded ps-2 sign-up-input"
            id="firstName"
            type="text"
          />

          <label className="d-block mb-1 mt-3" htmlFor="lastName">
            Last Name
          </label>
          <input
            {...register('lastName')}
            className="d-block rounded ps-2 sign-up-input"
            id="lastName"
            type="text"
          />

          <label className="d-block mb-1 mt-3" htmlFor="password">
            Password
          </label>
          <input
            {...register('password')}
            className="d-block rounded ps-2 sign-up-input"
            id="password"
            type="password"
          />

          <label className="d-block mb-1 mt-3" htmlFor="phone">
            Phone Number (10 characters)
          </label>
          <input
            {...register('phone')}
            className="d-block rounded ps-2 sign-up-input"
            id="phone"
            type="text"
          />

          <Button
            variant="primary"
            size="md"
            type="submit"
            style={{ width: '100%' }}
            className="mt-4"
          >
            Sign up
          </Button>
        </form>

        <div className="text-center pt-2">
          <p>
            Already have an account? <a href="/#/login">Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
