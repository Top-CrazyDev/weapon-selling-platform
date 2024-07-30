import React, { useEffect, useState } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import images from "../utils/images";
import { Link } from 'react-router-dom';
import Logout from "./components/Logout";

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

const Menu = () => {
    return (
        <div className="menu-links">
            <Link to="/product-crud" style={{
                fontSize: '18px',
                display: 'inline-block',
                marginLeft: '15px',
                marginRight: '15px',
                color: '#fff'
            }}>Products</Link>
            <Logout />
        </div>
    );
}

const Header = () => {
    return (
        <header>
            <div className="desktop-header">
                <Logo />
                <Menu />
            </div>
            <div className="mobile-header-layout2">
                <Logo />
                <Menu />
            </div>
        </header>
    );
}

const BottomFooter = () => {
    const style = {
        backgroundColor: '#131A22',
        color: '#fff',
        padding: '5px 0',
        textAlign: 'center'
    }

    return (
        <div style={style}>
            © 2024, AO-Tactical <span style={{ marginLeft: '10px' }}>All rights reserved.</span>
        </div>
    );
}

const Footer = () => {
    return (
        <div>
            <BottomFooter />
        </div>
    );
}

const Layout3 = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('aotacticalToken');

        if(!token) {
            window.location.href = "/"
        }else{
            setIsLoggedIn(true)
        }
    }, [])

    return (
        <>
            {
                isLoggedIn && <section style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: 'calc(100vh)'
                }}>
                    <Header />
                    <div className="content" style={{
                        height: '100%'
                    }}>
                        {children}
                    </div>
                    <Footer />
                </section>
            }
        </>
    );
};

export default Layout3;