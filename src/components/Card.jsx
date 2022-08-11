import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import '../styles/Card.css';
import { addToCartThunk } from '../store/slices/cart.slice';

const Card = ({ product }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const addToCart = (e, id) => {
        e.stopPropagation();
        
        const product = {
            id,
            quantity: 1
        }

        if (token) {
            dispatch(addToCartThunk(product));
        } else {
            navigate('/login');
        }
    }

    return (
        <div
            onClick={() => navigate(`/products/${product.id}`)}
            className='product-card m-1 rounded'
        >
            <div className='product-card-img-container p-2'>
                <img className='product-card-img' src={product.productImgs[0]} />
            </div>
            <div className='p-2 d-flex flex-column justify-content-center'>
                <div className='card-info-container d-flex flex-column justify-content-between'>
                    <div>
                        <p className='m-0'>{product.title}</p>
                    </div>
                    <div className='d-flex justify-content-between align-items-end'>
                        <div>
                            <p className='m-0 text-primary'><small>Price</small></p>
                            <p className='m-0'>${product.price}</p>
                        </div>
                        <button
                            onClick={e => addToCart(e, product.id)}
                            className='card-add-to-cart-button'
                        >
                            <i className="fa-solid fa-cart-shopping"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;