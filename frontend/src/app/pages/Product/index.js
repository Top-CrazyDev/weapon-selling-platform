import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom';
import apis from '../../api';
import ImageMagnifier from '../../components/ui/ImageMagnifier';
import UserContext from '../../utils/UserContext';
import { Rate, message } from 'antd';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [cnt, setCnt] = useState(1);
    const { cart, setCart, setSpinning, customerId } = useContext(UserContext);

    useEffect(() => {
        const getProdctById = async (id) => {
            setSpinning(true)
            const res = await apis.getProductById({ id: id });
            setProduct(res.data.product)
            setSpinning(false)
        }

        getProdctById(id);
    }, []);

    // page log
    useEffect(() => {
        const pageLog = async () => {
            await apis.addPageLog({
                customerId,
                page: '/product/' + id
            })
        }

        pageLog()
    }, [customerId])

    const inputCartItem = (ev) => {
        if(ev.target.value <= 0) {
            message.info("You can input over 1 item.")
        }else{
            setCnt(ev.target.value)
        }
    }

    const increaseCartItem = (ev) => {
        let tmp = cnt + 1
        if(tmp <= Number(product.available)) {
            setCnt(tmp)
        } else {
            message.info("No more stock.")
        }
    }

    const decreaseCartItem = (ev) => {
        let tmp = cnt - 1
        if(tmp <= 0) {
            message.info("You can input over 1 item.")
        } else {
            setCnt(tmp)
        }
    }

    const addCart = () => {
        if(cart.filter(ct => ct.itemnumber === product.itemnumber).length === 0) {
            setCart([...cart, { ...product, cartCnt: cnt}])
        }else{
            cart.map(ct => {
                if(ct.itemnumber === product.itemnumber) {
                    ct['cartCnt'] += cnt
                }
            })
            setCart([...cart])
        }
    }

    return (
        <div className='product-detail-panel'>
            {
                product.isZander && <div className='product-information'>
                    <div className='product-title'>
                        <h1>
                            {
                                product.desc1
                            }
                            ,
                            <span style={{ marginLeft: '8px' }}>
                                {
                                    product.subcategory
                                }
                            </span>
                        </h1>
                    </div>
                    <div className='product-review-tags'>
                        <div>
                            <Rate allowHalf defaultValue={2.5} />
                            <span style={{ marginLeft: '5px' }}>512 Reviews</span>
                        </div>
                        <div style={{ marginLeft: '10px', marginRight: '10px', paddingTop: '5px' }}> | </div>
                        <div style={{ paddingTop: '5px' }}>
                            38 Questions & Answers
                        </div>
                    </div>
                    <div className='product-sub-content'>
                        {/* <div className='key-value'>
                            <span className='label'>Model: </span>
                            <span className='value'>3701</span>
                        </div> */}
                        <div className='key-value'>
                            <span className='label'>Weight: </span>
                            <span className='value'>{product.weight} kg</span>
                        </div>
                        <div className='key-value'>
                            <span className='label'>Item Number: </span>
                            <span className='value'>{product.itemnumber}</span>
                        </div>
                        <div className='key-value'>
                            <span className='label'>UPC: </span>
                            <span className='value'>{product.upc}</span>
                        </div>
                        <div className='key-value'>
                            <span className='label'>MFG: </span>
                            <span className='value'>{product.manufacturer}</span>
                        </div>
                    </div>
                    <hr />
                    <div className='product-content'>
                        <div className='product-image'>
                            <div>
                                <div className='image-magnifier-container'>
                                    <ImageMagnifier
                                        width={"100%"}
                                        src={product.imagelink}
                                    />
                                </div>
                            </div>
                            <div className='product-description'>
                                <div>
                                    {product.desc2}
                                </div>
                            </div>
                        </div>
                        <div className='add-cart'>
                            <div className='price-line' style={{ color: '#c7511f', fontSize: '18px', fontWeight: 'bold' }}>
                                ${(Number(product.price1) * cnt).toFixed(2)}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                    <div style={{
                                        border: '1px solid #e9e9e9',
                                        height: '42px',
                                        width: '25px',
                                        backgroundColor: '#f9f9f9',
                                        cursor: 'pointer',
                                        textAlign: 'center',
                                        paddingTop: '6px',
                                        fontSize: '18px',
                                        borderRight: 'none'
                                    }} onClick={decreaseCartItem}>-</div>
                                    <div style={{ width: '40px', height: '38px' }}>
                                        <input value={cnt} onChange={inputCartItem} style={{
                                            maxWidth: '100%',
                                            lineHeight: '38px',
                                            textAlign: 'center',
                                            border: '1px solid #e9e9e9'
                                        }} />
                                    </div>
                                    <div style={{
                                        border: '1px solid #e9e9e9',
                                        height: '42px',
                                        width: '25px',
                                        backgroundColor: '#f9f9f9',
                                        cursor: 'pointer',
                                        textAlign: 'center',
                                        paddingTop: '6px',
                                        fontSize: '18px'
                                    }} onClick={increaseCartItem}>+</div>
                                </div>
                                <div style={{
                                    backgroundColor: '#ffd814',
                                    borderRadius: '5px',
                                    textAlign: 'center',
                                    padding: '0 40px',
                                    cursor: 'pointer',
                                    lineHeight: '40px',
                                    fontWeight: 'bold',
                                    marginLeft: '10px'
                                }} onClick={addCart}>
                                    Add To Cart
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {
                product.isLipsey && <div className='product-information'>
                    <div className='product-title'>
                        <h1>
                            {
                                product.description1
                            }
                            ,
                            <span style={{ marginLeft: '8px' }}>
                                {
                                    product.description2
                                }
                            </span>
                        </h1>
                    </div>
                    <div className='product-review-tags'>
                        <div>
                            <Rate allowHalf defaultValue={2.5} />
                            <span style={{ marginLeft: '5px' }}>512 Reviews</span>
                        </div>
                        <div style={{ marginLeft: '10px', marginRight: '10px', paddingTop: '5px' }}> | </div>
                        <div style={{ paddingTop: '5px' }}>
                            38 Questions & Answers
                        </div>
                    </div>
                    <div className='product-sub-content'>
                        <div className='key-value'>
                            <span className='label'>Model: </span>
                            <span className='value'>{product.manufacturerModelNo}</span>
                        </div>
                        {
                            product.weight && <div className='key-value'>
                                <span className='label'>Weight: </span>
                                <span className='value'>{product.weight} kg</span>
                            </div>
                        }
                        <div className='key-value'>
                            <span className='label'>Item Number: </span>
                            <span className='value'>{product.itemNo}</span>
                        </div>
                        <div className='key-value'>
                            <span className='label'>UPC: </span>
                            <span className='value'>{product.upc}</span>
                        </div>
                        <div className='key-value'>
                            <span className='label'>MFG: </span>
                            <span className='value'>{product.manufacturer}</span>
                        </div>
                    </div>
                    <hr />
                    <div className='product-content'>
                        <div className='product-image'>
                            <div>
                                <div className='image-magnifier-container'>
                                    <ImageMagnifier
                                        width={"100%"}
                                        src={"https://www.lipseyscloud.com/images/" + product.imageName}
                                    />
                                </div>
                            </div>
                            <div className='product-description'>
                                <div>
                                    {product.type}
                                </div>
                                <div>
                                    {product.itemGroup}
                                </div>
                                <div>
                                    {product.additionalFeature1}
                                </div>
                                <div>
                                    {product.additionalFeature2}
                                </div>
                                <div>
                                    {product.additionalFeature3}
                                </div>
                            </div>
                        </div>
                        <div className='add-cart'>
                            <div className='price-line' style={{ color: '#c7511f', fontSize: '18px', fontWeight: 'bold' }}>
                                ${(Number(product.price) * cnt).toFixed(2)}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'flex-start', marginRight: '10px' }}>
                                    <div style={{
                                        border: '1px solid #e9e9e9',
                                        height: '42px',
                                        width: '25px',
                                        backgroundColor: '#f9f9f9',
                                        cursor: 'pointer',
                                        textAlign: 'center',
                                        paddingTop: '6px',
                                        fontSize: '18px',
                                        borderRight: 'none'
                                    }} onClick={decreaseCartItem}>-</div>
                                    <div style={{ width: '40px', height: '38px' }}>
                                        <input value={cnt} onChange={inputCartItem} style={{
                                            maxWidth: '100%',
                                            lineHeight: '38px',
                                            textAlign: 'center',
                                            border: '1px solid #e9e9e9'
                                        }} />
                                    </div>
                                    <div style={{
                                        border: '1px solid #e9e9e9',
                                        height: '42px',
                                        width: '25px',
                                        backgroundColor: '#f9f9f9',
                                        cursor: 'pointer',
                                        textAlign: 'center',
                                        paddingTop: '6px',
                                        fontSize: '18px'
                                    }} onClick={increaseCartItem}>+</div>
                                </div>
                                <div style={{
                                    backgroundColor: '#ffd814',
                                    borderRadius: '5px',
                                    textAlign: 'center',
                                    padding: '0 40px',
                                    cursor: 'pointer',
                                    lineHeight: '40px',
                                    fontWeight: 'bold',
                                    marginLeft: '10px'
                                }} onClick={addCart}>
                                    Add To Cart
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default ProductDetail;