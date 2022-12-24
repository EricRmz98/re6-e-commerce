import { createSlice } from '@reduxjs/toolkit';
import { setIsLoading } from './isLoading.slice';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import { getPurchasesThunk } from './purchases.slice';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    setCart: (state, action) => {
      return action.payload;
    },
  },
});

export const getCartThunk = () => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .get('https://e-commerce-api.academlo.tech/api/v1/cart', getConfig())
    .then((res) => dispatch(setCart(res.data.data.cart.products)))
    .finally(() => dispatch(setIsLoading(false)));
};

export const addToCartThunk = (product) => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .post(
      'https://e-commerce-api.academlo.tech/api/v1/cart',
      product,
      getConfig()
    )
    .then(() => dispatch(getCartThunk()))
    .finally(() => dispatch(setIsLoading(false)));
};

export const deleteFromCartThunk = (id) => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .delete(
      `https://e-commerce-api.academlo.tech/api/v1/cart/${id}`,
      getConfig()
    )
    .then(() => dispatch(getCartThunk()))
    .finally(() => dispatch(setIsLoading(false)));
};

export const purchaseCartThunk = () => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .post(
      'https://e-commerce-api.academlo.tech/api/v1/purchases',
      undefined,
      getConfig()
    )
    .then(() => {
      dispatch(setCart([]));
      dispatch(getPurchasesThunk());
    })
    .finally(() => dispatch(setIsLoading(false)));
};

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;
