import React, { useEffect } from 'react';
import '../styles/Purchases.css'
import { useDispatch, useSelector } from 'react-redux';
import { getPurchasesThunk } from '../store/slices/purchases.slice';
import Container from 'react-bootstrap/Container';
import dateFormat from '../utils/dateFormat';

const Purchases = () => {

    const dispatch = useDispatch();
    const purchases = useSelector(state => state.purchases);

    useEffect(() => {
        dispatch(getPurchasesThunk());
    }, [])

    return (
        <Container>
            <p className='mb-4'>
                <small>Home </small>
                <small className='text-primary fw-bold'>• </small>
                <small className='fw-bold'>Purchases</small>
            </p>

            <h4 className='fw-bold mb-4'>My purchases</h4>

            {purchases.map(purchase => (
                <div key={purchase.id} className='purchase-container rounded mb-4'>
                    <div className='purchase-header-container'>
                        <p className='fw-bold m-3'>{dateFormat(purchase.createdAt)}</p>
                    </div>

                    {purchase.cart.products.map(product => (
                        <div key={product.id} className='d-flex justify-content-between align-items-center py-3 px-4'>
                        <p className='m-0' style={{width: '22rem'}}>{product.title}</p>
                        <p className='purchases-quantity-container m-0 d-flex justify-content-center align-items-center'>{product.productsInCart.quantity}</p>
                        <p className='fw-bold m-0 text-end' style={{width: '5.5rem'}}>${product.price}</p>
                    </div>

                    ))}

                </div>
            ))}
        </Container>
    );
};

export default Purchases;