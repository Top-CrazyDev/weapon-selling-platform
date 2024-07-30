import React, { useState, useEffect, useContext } from "react";
import apis from "../../../api";
import { Select, Button, message, Popconfirm } from 'antd';
import UserContext from "../../../utils/UserContext";

const Setting = () => {
    const [products, setProducts] = useState([]);
    const [selectedSlide, setSelectedSlide] = useState(null);
    const [selectedTop, setSelectedTop] = useState(null);
    const [slideProducts, setSlideProducts] = useState([]);
    const [topProducts, setTopProducts] = useState([]);
    const { setSpinning } = useContext(UserContext);

    useEffect(async () => {
        setSpinning(true)
        await getAllProducts();
        await getSlideProducts();
        await getTopProducts();
        setSpinning(false)
    }, []);

    const getAllProducts = async () => {
        setSpinning(true)
        const res = await apis.getAllProducts();
        setSpinning(false)
        const tmp = [];
        if (res.data.products?.length > 0) {
            res.data.products.map(product => {
                tmp.push({ ...product, key: product._id })
            })
            setProducts(tmp);
        }
    }

    const getSlideProducts = async () => {
        setSpinning(true)
        const res = await apis.getSlideProducts();
        setSpinning(false)
        const tmp = [];
        if (res.data.products?.length > 0) {
            res.data.products.map(product => {
                tmp.push({ ...product, key: product._id })
            })
            setSlideProducts(tmp);
        }
    }

    const getTopProducts = async () => {
        setSpinning(true)
        const res = await apis.getTopProducts();
        setSpinning(false)
        const tmp = [];
        if (res.data.products?.length > 0) {
            res.data.products.map(product => {
                tmp.push({ ...product, key: product._id })
            })
            setTopProducts(tmp);
        }
    }

    const onSlideChange = (value) => {
        setSelectedSlide(value)
    };

    const onTopChange = (value) => {
        setSelectedTop(value)
    };

    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    const addSlide = async () => {
        setSpinning(true)
        const res = await apis.addSlide({ id: selectedSlide });
        if (res.data.success) {
            await getSlideProducts();
        }
        setSpinning(false)
    }

    const addTop = async () => {
        setSpinning(true)
        const res = await apis.addTop({ id: selectedTop });
        if (res.data.success) {
            await getTopProducts();
        }
        setSpinning(false)
    }

    const confirmSlideDelete = async (e, id) => {
        setSpinning(true)
        const res = await apis.removeSlide({ id: id });
        if (res.data.success) {
            await getSlideProducts();
        }
        setSpinning(false)
    };

    const confirmTopDelete = async (e, id) => {
        setSpinning(true)
        const res = await apis.removeTop({ id: id });
        if (res.data.success) {
            await getTopProducts();
        }
        setSpinning(false)
    };

    const cancel = (e) => {
        
    };

    return (
        <div className="home-setting">
            <div className="slide-setting">
                <h2>Home Page Slide</h2>
                <div>
                    <Select
                        showSearch
                        placeholder="Select a product"
                        optionFilterProp="children"
                        onChange={onSlideChange}
                        filterOption={filterOption}
                        options={products}
                        style={{
                            width: '280px'
                        }}
                    />
                    <Button style={{ marginLeft: '10px' }} onClick={addSlide}>Add</Button>
                </div>
                {
                    slideProducts.length === 0 && <div style={{ marginTop: '20px', paddingLeft: '10px' }}>
                        <h4>No Slide Products</h4>
                    </div>
                }
                {
                    slideProducts.length !== 0 && <div style={{ marginTop: '20px', paddingLeft: '10px', display: 'flex', flexFlow: 'row wrap' }}>
                        {
                            slideProducts.map(sp => {
                                return <div style={{ flex: '1 0 25%', maxWidth: '400px', minWidth: '270px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ width: '50%', height: '300px', overflow: 'hidden', maxWidth: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <img style={{ maxWidth: '100%', maxHeight: '100%' }} src={sp.imagelink ? sp.imagelink : "https://www.lipseyscloud.com/images/" + sp.imageName} />
                                    </div>
                                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                        <div>{sp.desc1 ? sp.desc1 : sp.description1}</div>
                                        <div>{sp.desc2 ? sp.desc2 : sp.description2}</div>
                                        <div>{sp.price1 ? sp.price1 : sp.price}</div>
                                    </div>
                                    <div style={{ marginTop: '20px' }}>
                                        <Popconfirm
                                            title="Delete the product"
                                            description="Are you sure to delete this product?"
                                            onConfirm={(ev) => confirmSlideDelete(ev, sp._id)}
                                            onCancel={cancel}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <Button danger>Delete</Button>
                                        </Popconfirm>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                }
            </div>
            <div className="top-seller-setting" style={{ marginTop: '4rem' }}>
                <h2>Top Seller Product</h2>
                <div>
                    <Select
                        showSearch
                        placeholder="Select a product"
                        optionFilterProp="children"
                        onChange={onTopChange}
                        filterOption={filterOption}
                        options={products}
                        style={{
                            width: '350px'
                        }}
                    />
                    <Button style={{ marginLeft: '10px' }} onClick={addTop}>Add</Button>
                </div>
                <div style={{ marginTop: '20px', paddingLeft: '10px' }}>
                {
                    topProducts.length === 0 && <div style={{ marginTop: '20px', paddingLeft: '10px' }}>
                        <h4>No Top Seller Products</h4>
                    </div>
                }
                {
                    topProducts.length !== 0 && <div style={{ marginTop: '20px', paddingLeft: '10px', display: 'flex', flexFlow: 'row wrap' }}>
                        {
                            topProducts.map(tp => {
                                return <div style={{ flex: '1 0 25%', maxWidth: '400px', minWidth: '270px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ width: '50%', height: '300px', overflow: 'hidden', maxWidth: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <img style={{ maxWidth: '100%', maxHeight: '100%' }} src={tp.imagelink ? tp.imagelink : "https://www.lipseyscloud.com/images/" + tp.imageName} />
                                    </div>
                                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                        <div>{tp.desc1 ? tp.desc1 : tp.description1}</div>
                                        <div>{tp.desc2 ? tp.desc2 : tp.description2}</div>
                                        <div>{tp.price1 ? tp.price1 : tp.price}</div>
                                    </div>
                                    <div style={{ marginTop: '20px' }}>
                                        <Popconfirm
                                            title="Delete the product"
                                            description="Are you sure to delete this product?"
                                            onConfirm={(ev) => confirmTopDelete(ev, tp._id)}
                                            onCancel={cancel}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <Button danger>Delete</Button>
                                        </Popconfirm>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                }
                </div>
            </div>
        </div>
    );
}

export default Setting;