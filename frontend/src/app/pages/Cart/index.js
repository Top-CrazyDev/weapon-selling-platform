import React, { useContext, useState, useEffect } from "react";
import UserContext from '../../utils/UserContext';
import {
    ShoppingCartOutlined
} from '@ant-design/icons';
import { useHistory  } from 'react-router-dom'; 

const Cart = () => {
    const { cart, setCart } = useContext(UserContext);
    const [cartCnt, setCartCnt] = useState(0);
    const history = useHistory();

    useEffect(() => {
        let cnt = 0
        cart.map(ct => {
            cnt += ct.cartCnt
        })
        setCartCnt(cnt)
    }, [cart]);

    const goToCart = () => {
        history.push("/my-cart")
    }

    return (
        <div className='cart' style={{
            display: 'flex',
            alignItems: 'center',
            position: 'relative'
        }} onClick={goToCart}>
            <ShoppingCartOutlined 
                style={{
                    fontSize: '24px',
                }} 
            />
            <span style={{
                fontSize: '18px',
                display: 'inline-block',
                marginLeft: '5px'
            }}>
                Cart
            </span>
            {
                cartCnt > 0 && <span style={{
                    display: 'inline-block',
                    position: 'absolute',
                    zIndex: '1',
                    backgroundColor: '#ffd814',
                    width: '15px',
                    height: '18px',
                    textAlign: 'center',
                    fontSize: '16px',
                    lineHeight: '16px',
                    borderRadius: '10px',
                    color: 'rgb(199, 81, 31)',
                    fontWeight: 'bold',
                    top: '-5px',
                    left: '13px'
                }}>
                    {cartCnt}
                </span>
            }
        </div>
    );
}

export default Cart;