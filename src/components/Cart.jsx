import React, { useEffect } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFromCartThunk, getCartThunk, purchaseCartThunk } from '../store/slices/cart.slice';
import '../styles/Cart.css';
import Button from 'react-bootstrap/Button';
import cartTotal from '../utils/cartTotal';
import { useNavigate } from 'react-router-dom';


const Cart = ({ show, handleClose, token }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector(state => state.cart);

    useEffect(() => {
        if (token) {
            dispatch(getCartThunk());
        }
    }, [token])

    const deleteProduct = (e, id) => {
        e.stopPropagation();
        dispatch(deleteFromCartThunk(id))
    }

    return (
        <Offcanvas placement='end' show={show} scroll={true} onHide={handleClose} >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className='d-flex flex-column justify-content-between'>
                <div className='overflow-auto'>
                    {cart.map(product => (
                        <div
                            onClick={() => {
                                navigate(`/products/${product.id}`);
                                handleClose();
                            }}
                            className='cart-product-container rounded p-2 my-2 d-flex flex-column justify-content-between'
                            key={product.id}
                        >
                            <div>
                                <div className='d-flex justify-content-between'>
                                    <div>
                                        <p className='m-0 text-primary'><small>{product.brand}</small></p>
                                        <p className='m-0'><small>{product.title}</small></p>
                                    </div>

                                    <button
                                        className='cart-delete-button'
                                        onClick={e => deleteProduct(e, product.id)}
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </div>

                                <div className='cart-product-quantity-container d-flex justify-content-center align-items-center mt-2'>
                                    <p className='m-0'><small>{product.productsInCart.quantity}</small></p>
                                </div>
                            </div>

                            <div className='text-end'>
                                <p className='m-0'>
                                    <small className='text-primary'>Total: </small>
                                    <small className='fw-bold'>${product.price * product.productsInCart.quantity}</small>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='cart-checkout-container'>
                    <div className='d-flex justify-content-between py-3'>
                        <p className='text-primary m-0'><small>Total:</small></p>
                        <p className='fw-bold m-0'><small>${cartTotal(cart)}</small></p>
                    </div>
                    <div className="d-grid gap-2">
                        <Button
                            variant="primary"
                            size="md"
                            onClick={() => dispatch(purchaseCartThunk())}
                            disabled={cart.length === 0}
                        >
                            {cart.length === 0 ? 'No products in cart' : 'Checkout'}
                        </Button>
                    </div>
                </div>
            </Offcanvas.Body>
        </Offcanvas >
    );
};

export default Cart;