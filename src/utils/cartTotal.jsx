import React from 'react';

const cartTotal = cart => {
    var total = 0;

    if (cart) {
        cart.forEach(product => (total += (product.price * product.productsInCart.quantity)))
    }

    return total;
};

export default cartTotal;