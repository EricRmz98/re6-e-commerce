import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsThunk } from '../store/slices/products.slice';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/Card.css';
import '../styles/ProductDetails.css'
import Button from 'react-bootstrap/Button';


const ProductDetails = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const allProducts = useSelector(state => state.products);
    const [productDetails, setProductDetails] = useState({});
    const [imageIndex, setImageIndex] = useState(0);
    const [productQuantity, setProductQuantity] = useState(1);
    const [suggestedProducts, setSuggestedProducts] = useState([]);

    useEffect(() => {
        dispatch(getProductsThunk());
    }, [])

    useEffect(() => {
        setProductDetails(allProducts.find(product => product.id === Number(id)));
    }, [allProducts, id])

    useEffect(() => {
        if ((Object.keys(productDetails || {}).length !== 0)) {
            setSuggestedProducts(allProducts.filter(product => productDetails.category.id === product.category.id && productDetails.id !== product.id).slice(0, 3));
        }
    }, [productDetails])

    const prevImg = () => {
        if (imageIndex > 0) {
            setImageIndex(imageIndex - 1);
        } else {
            setImageIndex(productDetails.productImgs.length - 1);
        }
    }

    const nextImg = () => {
        if (imageIndex < productDetails.productImgs.length - 1) {
            setImageIndex(imageIndex + 1);
        } else {
            setImageIndex(0);
        }
    }

    const subtractProductItem = () => {
        setProductQuantity(productQuantity - 1);
    }

    const addProductItem = () => {
        setProductQuantity(productQuantity + 1);
    }

    const addToCart = e => {
        e.stopPropagation();
        alert('button')
    }

    return (
        <div className='details-father'>
            <div className='details-header'>
                <p className='m-0 ms-1 mb-4'>
                    <small>Home </small>
                    <small className='text-primary fw-bold'>• </small>
                    <small className='fw-bold'>{productDetails?.title}</small>
                </p>
            </div>

            <div className='px-1 details-container d-flex'>
                <div className='gallery-container'>
                    <div className='d-flex justify-content-between align-items-center mb-1'>
                        <button
                            className='gallery-next-prev-button'
                            onClick={() => prevImg()}
                        >
                            <i className="fa-solid fa-angle-left"></i>
                        </button>

                        <div className='gallery-img-container'>
                            <img className='gallery-img' src={productDetails?.productImgs?.[imageIndex]} />
                        </div>

                        <button
                            className='gallery-next-prev-button'
                            onClick={() => nextImg()}
                        >
                            <i className="fa-solid fa-angle-right"></i>
                        </button>
                    </div>

                    <div className='d-flex justify-content-center align-items-center flex-wrap'>

                        {productDetails?.productImgs?.map((img, index) => (
                            <div
                                onClick={() => setImageIndex(index)}
                                className='gallery-small-img-container m-1'
                                key={index}
                                style={imageIndex === index ? { border: '1px solid #d9230f' } : { border: '1px solid #DEDEDE' }}
                            >
                                <img className='gallery-small-img' src={img} />
                            </div>
                        ))}

                    </div>
                </div>

                <div className='product-info-container ps-3 d-flex flex-column justify-content-between'>
                    <div>
                        <h5>{productDetails?.title}</h5>
                        <p className='text-muted m-0' style={{ fontSize: '13px' }}>{productDetails?.description}</p>
                    </div>

                    <div className='d-flex justify-content-between align-items-center'>
                        <div>
                            <p className='text-muted m-0' style={{ fontSize: '13px' }}>Price</p>
                            <p className='m-0 fw-bold'>${productDetails?.price}</p>
                        </div>

                        <div>
                            <p className='text-muted mb-1' style={{ fontSize: '13px' }}>Quantity</p>
                            <button
                                className='details-subtract-button'
                                onClick={() => subtractProductItem()}
                                disabled={productQuantity <= 1}
                            >
                                <i className="fa-solid fa-minus"></i>
                            </button>
                            <input
                                className='details-product-quantity-input'
                                type="number"
                                value={productQuantity}
                                onChange={e => setProductQuantity(e.target.value)}
                                min="1"
                            />
                            <button
                                className='details-add-button'
                                onClick={() => addProductItem()}
                            >
                                <i className="fa-solid fa-plus"></i>
                            </button>
                        </div>
                    </div>

                    <div className="d-grid gap-2 mb-1">
                        <Button variant="primary" size="md">
                            Add to cart <i className="fa-solid fa-cart-shopping"></i>
                        </Button>
                    </div>

                </div>
            </div>

            <div className='suggestions-container'>
                <p className='text-primary fw-bold px-1 my-3 suggestions-header'><small>Similar products</small></p>

                <div className='d-flex'>
                    {suggestedProducts.map(product => (
                        <div
                            onClick={() => navigate(`/products/${product.id}`)}
                            className='product-card m-1 rounded'
                            key={product.id}
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
                                            onClick={addToCart}
                                            className='card-add-to-cart-button'
                                        >
                                            <i className="fa-solid fa-cart-shopping"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;