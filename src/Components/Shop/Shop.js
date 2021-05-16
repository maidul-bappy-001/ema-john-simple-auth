import React, { useEffect } from 'react';
import fakeData from '../../fakeData/index';
import { useState } from "react";
import "./Shop.css"
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products, setproducts] = useState(first10)
    const [cart, setcart] = useState([])

    useEffect(() => {
       const savedCart = getDatabaseCart();
       const productKeys = Object.keys(savedCart)
        const previousCart = productKeys.map(pKey => {
            const product = fakeData.find(pd => pd.key === pKey);
            product.quantity = savedCart[pKey];
            return product;
        })
        setcart(previousCart)
    }, [])

    const handleAddProduct = (product) => {
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === product.key);
        let count = 1 ;
        let newCart ;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
        } 
        else {
            product.quantity = 1;
            newCart = [...cart, product]
        }
        setcart(newCart);
        addToDatabaseCart(product.key, count)
    }
    return (
        <div className='item-container'>
            <div className="product-container">
                {
                    products.map(pd => <Product
                    key={pd.key}
                        showAddToCart={true}
                        handleAddProduct={handleAddProduct}
                        product={pd}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review">
                         <button className="cart-btn">Review Order</button>
                    </Link>
                </Cart>
            
            </div>
            Router
        </div>
    );
};

export default Shop;
