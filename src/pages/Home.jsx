import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Home.css';
import { Container, Row, Col, InputGroup, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProductsThunk,
  productsByCategoryThunk,
  searchProductsThunk,
} from '../store/slices/products.slice';
import Card from '../components/Card';

const Home = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    dispatch(getProductsThunk());

    axios
      .get('https://e-commerce-api.academlo.tech/api/v1/products/categories')
      .then((res) => setCategories(res.data.data.categories));
  }, []);

  return (
    <Container className="pb-4">
      <Row>
        <Col xs={3}>
          <ul className="home-ul">
            <li className="home-ul-header d-flex justify-content-between align-items-center">
              Category<i className="fa-solid fa-angle-down"></i>
            </li>
            <li
              onClick={() => dispatch(getProductsThunk())}
              className="home-li py-1"
            >
              All products
            </li>
            {categories.map((category) => (
              <li
                onClick={() => dispatch(productsByCategoryThunk(category.id))}
                className="home-li py-1"
                key={category.id}
              >
                {category.name}
              </li>
            ))}
          </ul>
        </Col>
        <Col xs={9} className="px-0">
          <div className="px-1 mb-4">
            <InputGroup>
              <Form.Control
                className="home-search-input"
                placeholder="Product name"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    dispatch(searchProductsThunk(searchInput));
                  }
                }}
              />
              <Button
                className="home-search-button"
                variant="primary"
                id="button-addon2"
                onClick={() => dispatch(searchProductsThunk(searchInput))}
              >
                Search
              </Button>
            </InputGroup>
          </div>

          <div className="d-flex flex-wrap">
            {products.map((product) => (
              <Card product={product} key={product.id} />
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
