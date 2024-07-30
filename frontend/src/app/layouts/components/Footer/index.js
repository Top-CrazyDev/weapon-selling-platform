import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import images from "../../../utils/images";
import { Link } from 'react-router-dom';

const BackToTop = () => {
    return (
        <div className='back-to-top' onClick={() => window.scrollTo(0, 0)}>
            Back to top
        </div>
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

const Menu = () => {
    const logoContainer = {
        maxWidth: '120px'
    }

    return (
        <div className='footer-menu'>
            <div className='logo-container' style={logoContainer}>
                <LazyLoadImage
                    alt={images.logo.alt}
                    src={images.logo.src}
                    style={{
                        maxWidth: '100%'
                    }}
                />
            </div>
            <div className='menu-links'>
                <div className='link-title'>
                    About Us
                </div>
                <ul>
                    <li>
                        <Link to='/privacy-policy'>
                            Privacy Policy
                        </Link>
                    </li>
                    <li>
                        <Link to='/shipping-policy'>
                            Shipping Policy
                        </Link>
                    </li>
                    <li>
                        <Link to='/return-policy'>
                            Return Policy
                        </Link>
                    </li>
                    <li>
                        <Link to='/term-agreement'>
                            Terms & Conditions
                        </Link>
                    </li>
                    <li>
                        <Link to='/contact-us'>
                            Contact Us
                        </Link>
                    </li>
                </ul>
            </div>
            <div className='menu-links'>
                <div className='link-title'>
                    Account
                </div>
                <ul>
                    <li>
                        <Link to='/login'>
                            Sign In
                        </Link>
                    </li>
                    <li>
                        <Link to='/my-cart'>
                            View Cart
                        </Link>
                    </li>
                    <li>
                        <Link to='/my-wishlist'>
                            My Wishlist
                        </Link>
                    </li>
                </ul>
            </div>
            <div className='menu-links'>
                <div className='link-title'>
                    Coroporate
                </div>
                <ul>
                    <li>
                        <Link to='/vendor-register'>Become a vendor</Link>
                    </li>
                </ul>
            </div>
            <div className='menu-links'>
                <div className='link-title'>
                    Buyer
                </div>
                <ul>
                    <li>
                        <Link to='/find-ffl'>Find An FFL</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

const Footer = () => {
    return  (
        <footer>
            <BackToTop />
            <Menu />
            <BottomFooter />
        </footer>
    );
           
}

export default Footer;