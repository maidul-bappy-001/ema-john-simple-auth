import React from 'react';
import "./Product.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';


const Product = (props) => {
    // console.log(props.product.key);
    const { img, name, seller, price, stock, key } = props.product;
    return (
        <div className="product">
            <div className="product-img">
                <img src={img} alt="" />
            </div>

            <div className="product-info">
                <h4 className="product-name"><Link to={"/product/"+key}>{name}</Link></h4> <br />
                <p><small>By: {seller}</small></p>
                <p>${price}</p>
                <p><small>Only {stock} left in stock - order soon</small></p>
                {props.showAddToCart && <button
                    className="cart-btn"
                    onClick={() => { props.handleAddProduct(props.product) }}
                ><FontAwesomeIcon icon={faCartArrowDown} /> Add To Cart
                </button>}
            </div>
        </div>
    );
};

export default Product;