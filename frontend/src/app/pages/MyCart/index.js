import React, { useState, useContext, useEffect } from "react"
import UserContext from '../../utils/UserContext'
import { Link, useHistory } from 'react-router-dom'
import { Button, message } from "antd"
import apis from "../../api"

const MyCart = () => {
    const history = useHistory();
    const { cart, setCart, userData, customerId, setSpinning } = useContext(UserContext);
    const [subTotal, setSubTotal] = useState(0);

    const removeItem = (item) => {
        const update = cart.filter(ct => ct._id !== item._id);
        setCart(update)
    }

    const addToWishlist = async (item) => {
        setSpinning(true)
        await apis.addToWishlist({
            id: customerId,
            item: item
        })
        setSpinning(false)

        message.success("Successfully Added.")
    }

    const changeItemCnt = (ev, item) => {
        const tmp = cart;
        tmp.filter(ct => ct._id === item._id)[0]['cartCnt'] = Number(ev.target.value)
        setCart([...tmp])
    }

    const increaseItem = (item) => {
        const tmp = cart;
        if(tmp.filter(ct => ct._id === item._id)[0]['cartCnt'] < tmp.filter(ct => ct._id === item._id)[0]['available']) {
            tmp.filter(ct => ct._id === item._id)[0]['cartCnt'] += 1
        }
        setCart([...tmp])
    }

    const decreaseItem = (item) => {
        const tmp = cart;
        if(tmp.filter(ct => ct._id === item._id)[0]['cartCnt'] > 1) {
            tmp.filter(ct => ct._id === item._id)[0]['cartCnt'] -= 1
        }
        setCart([...tmp])
    }

    useEffect(() => {
        let total = 0
        cart.map(ct => {
            if(ct.isZander) {
                total += Number(Number(ct.price1).toFixed(2)) * ct.cartCnt
            }
            if(ct.isLipsey) {
                total += Number(Number(ct.price).toFixed(2)) * ct.cartCnt
            }
        })
        setSubTotal(total)
    }, [cart])

    // page log
    useEffect(() => {
        const pageLog = async () => {
            await apis.addPageLog({
                customerId,
                page: '/my-cart'
            })
        }

        pageLog()
    }, [customerId])

    const continueShopping = () => {
        
    }

    const checkout = () => {
        history.push("/checkout")
    }

    return <div className="my-cart">
        {
            cart.length === 0 && <div className="empty-cart">
                Your Shopping Cart is empty!
            </div>
        }
        {
            cart.length > 0 && cart.map(ct => {
                return <div key={ct._id}>
                    {
                        ct.isZander && <div className="cart-item-listing">
                            <div className="item-image">
                                <div className="item-image-inner">
                                    <Link to={"/product/" + ct._id}>
                                        <img src={ct.imagelink} />
                                    </Link>
                                </div>
                            </div>
                            <div className="item-info">
                                <div className="item-info-inner">
                                    <div className="item-info-detail">
                                        <div className="item-name">
                                            {ct.desc1}
                                        </div>
                                        <div className="item-description">
                                            {ct.desc2}
                                        </div>
                                    </div>
                                    <div className="item-price">
                                        <strong>
                                            ${Number(ct.price1).toFixed(2)}
                                        </strong>
                                    </div>
                                </div>
                                <div className="item-buttons">
                                    <Button onClick={() => removeItem(ct)}>Remove</Button>
                                    <Button onClick={() => addToWishlist(ct)} style={{marginLeft: '10px'}}>Add to Wishlist</Button>
                                    <div style={{ display: 'flex', justifyContent: 'flex-start', marginLeft: '10px' }}>
                                        <div style={{
                                            border: '1px solid #e9e9e9',
                                            height: '32px',
                                            width: '25px',
                                            backgroundColor: '#f9f9f9',
                                            cursor: 'pointer',
                                            textAlign: 'center',
                                            fontSize: '18px',
                                            borderRight: 'none'
                                        }} onClick={() => decreaseItem(ct)}>-</div>
                                        <div style={{ width: '40px', height: '30px' }}>
                                            <input value={ct.cartCnt} onChange={ev => changeItemCnt(ev, ct)} style={{
                                                maxWidth: '100%',
                                                lineHeight: '28px',
                                                textAlign: 'center',
                                                border: '1px solid #e9e9e9'
                                            }} />
                                        </div>
                                        <div style={{
                                            border: '1px solid #e9e9e9',
                                            height: '32px',
                                            width: '25px',
                                            backgroundColor: '#f9f9f9',
                                            cursor: 'pointer',
                                            textAlign: 'center',
                                            fontSize: '18px'
                                        }} onClick={() => increaseItem(ct)}>+</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {
                        ct.isLipsey && <div className="cart-item-listing">
                            <div className="item-image">
                                <div className="item-image-inner">
                                    <Link to={"/product/" + ct._id}>
                                        <img src={"https://www.lipseyscloud.com/images/" + ct.imageName} />
                                    </Link>
                                </div>
                            </div>
                            <div className="item-info">
                                <div className="item-info-inner">
                                    <div className="item-info-detail">
                                        <div className="item-name">
                                            {ct.description1}
                                        </div>
                                        <div className="item-description">
                                            {ct.description2}
                                        </div>
                                    </div>
                                    <div className="item-price">
                                        <strong>
                                            ${Number(ct.price).toFixed(2)}
                                        </strong>
                                    </div>
                                </div>
                                <div className="item-buttons">
                                    <Button onClick={() => removeItem(ct)}>Remove</Button>
                                    <Button onClick={() => addToWishlist(ct)} style={{marginLeft: '10px'}}>Add to Wishlist</Button>
                                    <div style={{ display: 'flex', justifyContent: 'flex-start', marginLeft: '10px' }}>
                                        <div style={{
                                            border: '1px solid #e9e9e9',
                                            height: '32px',
                                            width: '25px',
                                            backgroundColor: '#f9f9f9',
                                            cursor: 'pointer',
                                            textAlign: 'center',
                                            fontSize: '18px',
                                            borderRight: 'none'
                                        }} onClick={() => decreaseItem(ct)}>-</div>
                                        <div style={{ width: '40px', height: '30px' }}>
                                            <input value={ct.cartCnt} onChange={ev => changeItemCnt(ev, ct)} style={{
                                                maxWidth: '100%',
                                                lineHeight: '28px',
                                                textAlign: 'center',
                                                border: '1px solid #e9e9e9'
                                            }} />
                                        </div>
                                        <div style={{
                                            border: '1px solid #e9e9e9',
                                            height: '32px',
                                            width: '25px',
                                            backgroundColor: '#f9f9f9',
                                            cursor: 'pointer',
                                            textAlign: 'center',
                                            fontSize: '18px'
                                        }} onClick={() => increaseItem(ct)}>+</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            })
        }
        <div>
            {
                subTotal > 0 && <div style={{textAlign: 'right', width: '100%', fontWeight: 'bold'}}>
                    <span>Sub-Total:  </span>
                    <span>{subTotal}</span>
                </div>
            }
            {
                (cart.length !== 0 && !userData.token) && <div style={{
                    backgroundColor: '#fdeebf',
                    color: '#555',
                    border: '1px solid rgba(255,204,51,.75)',
                    borderRadius: '4px',
                    padding: '15px',
                    marginBottom: '20px',
                    marginTop: '20px',
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <span>You must Sign In or Register for an aotactical.com account to buy this item(s).</span>
                    <span>
                        <Link to="/login" style={{textDecoration: 'underline'}}>Sign In</Link>
                        <span> / </span>
                        <Link to="/customer-register" style={{textDecoration: 'underline'}}>Register</Link>
                    </span>
                </div>
            }
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem'}}>
                <Button onClick={continueShopping}>Continue Shopping</Button>
                <Button onClick={checkout} danger disabled={!userData.token}>Checkout</Button>
            </div>
        </div>
    </div>
}

export default MyCart;