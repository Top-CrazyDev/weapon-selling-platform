import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import images from "../utils/images";
import { Link } from 'react-router-dom';

const Logo = () => {
    return <Link to="/" style={{
        maxWidth: '250px',
        maxHeight: '210px',
        display: 'block',
        margin: '0 auto',
        position: 'relative'
    }}>
        <LazyLoadImage
            alt={images.logo.alt}
            src={images.logo.src}
            style={{
                maxWidth: '100%',
                maxHeight: '100%'
            }}
        />
    </Link>;
}

const Layout1 = ({ children }) => (
    <React.Fragment>
        <Logo />
        <div className="main" style={{position: 'relative'}}>
            {children}
        </div>
    </React.Fragment>
);

export default Layout1;