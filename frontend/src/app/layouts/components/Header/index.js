import React, { useState, useContext, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import images from "../../../utils/images";
import {
    ShoppingCartOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Input, Select, Drawer, Button } from 'antd';
import categories from '../../../utils/category';
import Cart from '../../../pages/Cart';
import UserContext from '../../../utils/UserContext';
import { Link, useLocation, BrowserRouter as Router, useHistory } from 'react-router-dom';
import apis from '../../../api';

const { Search } = Input;

const Logo = () => {
    return <Link to="/" className='logo-container'>
        <LazyLoadImage
            alt={images.logo.alt}
            src={images.logo.src}
            style={{
                maxWidth: '100%'
            }}
        />
    </Link>;
}

const ProductSearch = () => {
    const history = useHistory();
    const [category, setCategory] = useState("All");
    const [search, setSearch] = useState("");
    const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
    const location = useLocation();

    const queryParameters = new URLSearchParams(location.search)

    const handleChange = (value) => {
        setCategory(value)
    };

    const onSearchChange = (ev) => {
        setSearch(ev.target.value)
    }

    const onSearch = (value, _e, info) => {
        if (!isAdvancedSearch) {
            if (category !== 'All' || value !== '')
                history.push(`/search/${category}/${value}`)
        } else {
            const wordOption = queryParameters.get('wordOption');
            const exclude = queryParameters.get('exclude');
            const upc = queryParameters.get('upc');
            const fromPrice = queryParameters.get('fromPrice');
            const toPrice = queryParameters.get('toPrice');
            const sortBy = queryParameters.get('sortBy');
            const itemPerPage = queryParameters.get('itemPerPage');

            let route = '/advanced-search-result?'
            if (search != "")
                route += 'word' + "=" + search + '&'
            if (wordOption && wordOption != "")
                route += 'wordOption' + "=" + wordOption + '&'
            if (exclude && exclude != "")
                route += 'exclude' + "=" + exclude + '&'
            if (upc && upc != "")
                route += 'upc' + "=" + upc + '&'
            if (fromPrice && fromPrice != "")
                route += 'fromPrice' + "=" + fromPrice + '&'
            if (toPrice && toPrice != "")
                route += 'toPrice' + "=" + toPrice + '&'
            if (category != "")
                route += 'category' + "=" + category + '&'
            if (sortBy && sortBy != "")
                route += 'sortBy' + "=" + sortBy + '&'
            if (itemPerPage && itemPerPage != "")
                route += 'itemPerPage' + "=" + itemPerPage + '&'

            history.push(route)
        }
    };

    const productSearchConatiner = {
        display: 'flex'
    }

    useEffect(() => {
        if (window.location.pathname.includes("/search")) {
            setCategory(window.location.pathname.split("/search/")[1].split("/")[0])
            if (window.location.pathname.split("/search/")[1].split("/")[1]) {
                setSearch(window.location.pathname.split("/search/")[1].split("/")[1])
            } else {
                setSearch("")
            }
        } else {
            setCategory("All")
            setSearch("")
        }

        if (window.location.pathname.includes("/advanced-search-result")) {
            setSearch(queryParameters.get('word'))
            const category = queryParameters.get('category');
            if (!category || category === 'all') {
                setCategory("All")
            } else {
                setCategory(category)
            }
            setIsAdvancedSearch(true)
        } else {
            setIsAdvancedSearch(false)
        }
    }, [location])

    return <div className='product-search_container' style={productSearchConatiner}>
        <Select
            defaultValue="All"
            style={{
                width: 200,
            }}
            value={category}
            size="large"
            onChange={handleChange}
            options={categories}
        />
        <Search
            placeholder="Search Product"
            enterButton="Search"
            size="large"
            value={search}
            onChange={onSearchChange}
            onSearch={onSearch}
        />
        <Link to={"/advanced-search"} style={{ color: '#f3a847', fontSize: '15px', lineHeight: '40px', marginLeft: '10px' }}>Advanced</Link>
    </div>;
}

const Account = () => {
    // const history = useHistory();
    const [open, setOpen] = useState(false);
    const { userData, customerId, setCart } = useContext(UserContext);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const Acct = () => {
        return <div className='account' style={{
            display: 'flex',
            alignItems: 'center',
            marginLeft: '20px',
            position: 'relative'
        }} onClick={showDrawer}>
            <UserOutlined
                style={{
                    fontSize: '24px',
                }}
            />
            <span style={{
                fontSize: '18px',
                display: 'inline-block',
                marginLeft: '5px'
            }}>
                Account
            </span>
        </div>
    }

    useEffect(() => {
        const getCartForCustomer = async () => {
            const res = await apis.getCartForCustomer({
                id: customerId
            })
            setCart(res.data.result?.cart)

            // if(res.data.result?.logs.length > 0) {
            //     history.push(res.data.result?.logs[0].page)
            // }
        }

        if (customerId) {
            getCartForCustomer()
        }
    }, [customerId])

    const AdminInfo = () => {
        return userData.user?.id === 0 && <div style={{}}>
            <div>
                <h2>You're an {userData.user.fullName}</h2>
            </div>
        </div>
    }

    const NotLogin = () => {
        return !userData.token && <div style={{}}>
            <div>
                <h4>Registered Users</h4>
                <p style={{ color: 'rgba(0, 0, 0, 0.85)' }}>Have an account? Sign in now.</p>
                <Link to="/login">Sign In</Link>
            </div>
            <hr style={{ margin: '1.5rem 0' }} />
            <div>
                <h4>New Customer</h4>
                <p style={{ color: 'rgba(0, 0, 0, 0.85)' }}>New to AO Tactical? Create an account to get started today.</p>
                <Link to="/customer-register">Create an Account</Link>
            </div>
        </div>
    }

    const Login = () => {
        const logout = () => {
            localStorage.setItem("aotacticalToken", "");
            localStorage.setItem("aotacticalRole", "");
            window.location.href = "/"
        }

        return userData.token ? <div style={{}}>
            <div>
                <h3 style={{ fontWeight: 'bold' }}>Account</h3>
                <div style={{ marginBottom: '10px' }}>
                    <Link onClick={onClose} style={{ color: 'rgba(0, 0, 0, 0.85)' }} to="/my-cart">View Cart</Link>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <Link onClick={onClose} style={{ color: 'rgba(0, 0, 0, 0.85)' }} to="/my-wishlist">My Wishlist</Link>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <Link onClick={onClose} style={{ color: 'rgba(0, 0, 0, 0.85)' }} to="/my-recent">Recently Viewed</Link>
                </div>
                <div style={{ marginBottom: '30px' }}>
                    <Link onClick={onClose} style={{ color: 'rgba(0, 0, 0, 0.85)' }} to="/my-setting">Setting</Link>
                </div>
                <hr />
                <a onClick={logout} style={{
                    color: 'rgba(0, 0, 0, 0.85)'
                }}>
                    Logout
                </a>
            </div>
        </div> : <div></div>
    }

    return <div className='account-container' style={{ display: 'flex' }}>
        <Cart />
        <Acct />
        <Drawer
            title={userData.user ? 'Welcome, ' + userData.user.fullName : 'Account'}
            minWidth={350}
            onClose={onClose}
            getContainer={false}
            visible={open}
            styles={{
                body: {
                    paddingBottom: 80,
                },
            }}
        >
            <AdminInfo />
            <NotLogin />
            <Login />
        </Drawer>
    </div>
}

const Header = () => {
    return <>
        <header>
            <div className='desktop-header'>
                <Logo />
                <ProductSearch />
                <Account />
            </div>
            <div className='mobile-header'>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Logo />
                    <Account />
                </div>
                <ProductSearch />
            </div>
        </header>
    </>;
}

export default Header;