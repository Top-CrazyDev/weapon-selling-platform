import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

const Layout1 = ({ children }) => (
    <React.Fragment>
        <Header />
        <div className="main">
            {children}
        </div>
        <Footer />
    </React.Fragment>
);

export default Layout1;