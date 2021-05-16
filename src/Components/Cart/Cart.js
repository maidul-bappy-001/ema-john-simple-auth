import React from 'react';
import './Cart.css'

const Cart = (props) => {
    const cart = props.cart;
    // const total = cart.reduce((total, prd) => total + prd.price * prd.quantity, 0);
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price * product.quantity;
    }

    // shipping function start

    let shipping = 0;

    if(total > 35){
        shipping = 0;
    }
    else if(total > 15){
        shipping = 4.99;
    }
    else if(total > 0){
        shipping = 12.99;
    }
    
    // shipping function end

    // tax
    const tax = total / 10;
    //tax

    //
    const formatNumber = num => {
        const precision = num.toFixed(2)
        return Number(precision)
    }
    //
    return ( 
    <div >
        <h4> Order Summery: </h4>
        <h5>Items Ordered: {cart.length}</h5> 
        <p>Product Price: {formatNumber(total)}</p>
        <p>Shipping Cost: {formatNumber(shipping)}</p>
        <p>Vat + Tax: {formatNumber(tax)}</p>
        <p>Total Price: {formatNumber(total + shipping + tax)}</p>
        {
            props.children
        }
    </div>
    );
};

export default Cart;
