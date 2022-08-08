import React, { useEffect, useState } from 'react';
import axios from 'axios'
import '../styles/Home.css'
import '../styles/Card.css'
import { Container, Row, Col, InputGroup, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsThunk, productsByCategoryThunk, searchProductsThunk } from '../store/slices/products.slice';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate();
    const products = useSelector(state => state.products);
    const dispatch = useDispatch();
    const [categories, setCategories] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        dispatch(getProductsThunk());

        axios
            .get('https://ecommerce-api-react.herokuapp.com/api/v1/products/categories')
            .then(res => setCategories(res.data.data.categories));
    }, [])

    const addToCart = e => {
        e.stopPropagation();
        alert('button')
    }

    return (
        <Container className='pb-4'>
            <Row>
                <Col xs={3}>
                    <ul className='home-ul'>
                        <li className='home-ul-header d-flex justify-content-between align-items-center'>Category<i className="fa-solid fa-angle-down"></i></li>
                        <li onClick={() => dispatch(getProductsThunk())} className='home-li py-1'>All products</li>
                        {categories.map(category => (
                            <li onClick={() => dispatch(productsByCategoryThunk(category.id))} className='home-li py-1' key={category.id}>{category.name}</li>
                        ))}
                    </ul>
                </Col>
                <Col xs={9} className='px-0'>
                    <div className='px-1 mb-4'>
                        <InputGroup>
                            <Form.Control
                                className='home-search-input'
                                placeholder="Product name"
                                value={searchInput}
                                onChange={e => setSearchInput(e.target.value)}
                                onKeyDown={e => { if (e.key === 'Enter') { dispatch(searchProductsThunk(searchInput)) } }}
                            />
                            <Button
                                className='home-search-button'
                                variant="primary"
                                id="button-addon2"
                                onClick={() => dispatch(searchProductsThunk(searchInput))}
                            >
                                Search
                            </Button>
                        </InputGroup>
                    </div>

                    <div className='d-flex flex-wrap'>

                        {products.map(product => (
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
                </Col>
            </Row>
        </Container>
    );
};

export default Home;