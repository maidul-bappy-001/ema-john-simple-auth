import React, { useEffect, useState } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData/index'
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import OrderImage from '../../images/giphy.gif'
import { useHistory } from 'react-router';

const Review = () => {
    const[ cart, setCart ]= useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false)
    const history = useHistory()

    const handleProceedCheckout = () => {
       history.push('/shipment')
    }

    const handleReviewItem = productKey => {
        const newCart = cart.filter(pd => pd.key !== productKey)
        setCart(newCart);   
         removeFromDatabaseCart(productKey)
    }

    useEffect(() => {
      //cart
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

       const cartProduct = productKeys.map(key => {
           const product = fakeData.find(pd => pd.key === key);
           product.quantity = savedCart[key];
           return product
       });
       setCart(cartProduct)
    }, [])
    let thankYou;
        if(orderPlaced) {
            thankYou = <img src={OrderImage} alt=""/>
        }
    return (
        <div className='item-container' >
          <div className='product-container' >
            {
                cart.map(pd => <ReviewItem 
                    handleReviewItem={handleReviewItem}
                    key= {pd.key}
                    product={pd}
                    ></ReviewItem>)
            }
            { thankYou }
          </div>
          <div className='cart-container'>
                <Cart cart={cart}>
                    <button onClick={handleProceedCheckout} className='cart-btn'>Proceed Checkout</button>
                </Cart>
          </div>
        </div>
    );
};

export default Review;