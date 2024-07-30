import React, { useContext, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useHistory  } from 'react-router-dom';
import UserContext from '../../utils/UserContext';
import { message } from 'antd';

const ProductCard = (props) => {
    const { cart, setCart } = useContext(UserContext);

    const history = useHistory();

    const goToDetail = () => {
        history.push("/product/" + props.product._id)
    }

    const addCart = async (e) => {
        e.stopPropagation()

        if(cart.filter(ct => ct.itemnumber === props.product.itemnumber).length === 0) {
            setCart([...cart, {...props.product, cartCnt: 1}]);
        }else{
            cart.map(ct => {
                if(ct.itemnumber === props.product.itemnumber) {
                    ct['cartCnt'] += 1
                }
            })
            setCart([...cart])
        }

        message.success("Added to Cart successfully!")
    }

    return (
        <div className='product-card-container'>
            <div className='product-card' onClick={goToDetail}>
                <div className='product-image'>
                    <LazyLoadImage
                        src={props.product.imagelink}
                        alt={'product image'}
                    />
                </div>
                <div className='product-caption'>
                    <div className='product-title'>
                        {
                            props.product.desc1 + ' ' + props.product.desc2
                        }
                    </div>
                    <div className='product-by'>
                        by
                        <span style={{ marginLeft: '5px' }}>
                            {
                                props.product.manufacturer
                            }
                        </span>
                    </div>
                    <div className='product-price'>
                        <span>$</span>
                        <span>
                            {
                                Number(props.product.price1).toFixed(2)
                            }
                        </span>
                    </div>
                    <div className='product-add-cart' onClick={addCart}>
                        Add to cart
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;