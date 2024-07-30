import React from 'react';
import loadable from '@loadable/component';
import Loading from '../components/ui/Loading';

const routes = [
    {
        path: '/',
        key: 'ROOT',
        layout: 'Layout1', // The topped Layout Name
        exact: true,
        component: loadable(() => import('../pages/NewHome'), {
            fallback: <Loading />
        })
    },
    {
        path: '/new-home',
        key: 'ROOT',
        layout: 'Layout1', // The topped Layout Name
        exact: true,
        component: loadable(() => import('../pages/NewHome'), {
            fallback: <Loading />
        })
    },
    {
        path: '/find-ffl',
        key: 'ROOT',
        layout: 'Layout1', // The topped Layout Name
        exact: true,
        component: loadable(() => import('../pages/FFLDealer'), {
            fallback: <Loading />
        })
    },
    {
        path: '/contact-us',
        key: 'ROOT',
        layout: 'Layout1', // The topped Layout Name
        exact: true,
        component: loadable(() => import('../pages/ContactUs'), {
            fallback: <Loading />
        })
    },
    {
        path: '/privacy-policy',
        key: 'ROOT',
        layout: 'Layout1', // The topped Layout Name
        exact: true,
        component: loadable(() => import('../pages/PrivacyPolicy'), {
            fallback: <Loading />
        })
    },
    {
        path: '/shipping-policy',
        key: 'ROOT',
        layout: 'Layout1', // The topped Layout Name
        exact: true,
        component: loadable(() => import('../pages/ShippingPolicy'), {
            fallback: <Loading />
        })
    },
    {
        path: '/return-policy',
        key: 'ROOT',
        layout: 'Layout1', // The topped Layout Name
        exact: true,
        component: loadable(() => import('../pages/ReturnPolicy'), {
            fallback: <Loading />
        })
    },
    {
        path: '/term-agreement',
        key: 'ROOT',
        layout: 'Layout1', // The topped Layout Name
        exact: true,
        component: loadable(() => import('../pages/TermsUserAgreement'), {
            fallback: <Loading />
        })
    },
    {
        path: '/search/:category/:searchkey?',
        key: 'ROOT',
        layout: 'Layout1', // The topped Layout Name
        exact: true,
        component: loadable(() => import('../pages/Search'), {
            fallback: <Loading />
        })
    },
    {
        path: '/advanced-search',
        key: 'ROOT',
        layout: 'Layout1', // The topped Layout Name
        exact: true,
        component: loadable(() => import('../pages/Search/Advanced'), {
            fallback: <Loading />
        })
    },
    {
        path: '/advanced-search-result',
        key: 'ROOT',
        layout: 'Layout1', // The topped Layout Name
        exact: true,
        component: loadable(() => import('../pages/Search/Result'), {
            fallback: <Loading />
        })
    },
    {
        path: '/product/:id',
        key: 'ROOT',
        layout: 'Layout1', // The topped Layout Name
        exact: true,
        component: loadable(() => import('../pages/Product'), {
            fallback: <Loading />
        })
    },
    {
        path: '/addCategoryToProduct',
        key: 'ROOT',
        layout: 'Layout1', // The topped Layout Name
        exact: true,
        component: loadable(() => import('../pages/AddCategoryToProduct'), {
            fallback: <Loading />
        })
    },
    {
        path: '/cart',
        key: 'ROOT',
        layout: 'Layout1', // The topped Layout Name
        exact: true,
        component: loadable(() => import('../pages/Cart'), {
            fallback: <Loading />
        })
    },
    {
        path: '/checkout',
        key: 'ROOT',
        layout: 'Layout1', // The topped Layout Name
        exact: true,
        component: loadable(() => import('../pages/Checkout'), {
            fallback: <Loading />
        })
    },
    {
        path: '/payment',
        key: 'ROOT',
        layout: 'Layout1', // The topped Layout Name
        exact: true,
        component: loadable(() => import('../pages/Payment'), {
            fallback: <Loading />
        })
    },
    {
        path: '/my-cart',
        key: 'ROOT',
        layout: 'Layout1', // The topped Layout Name
        exact: true,
        component: loadable(() => import('../pages/MyCart'), {
            fallback: <Loading />
        })
    },
    {
        path: '/my-wishlist',
        key: 'ROOT',
        layout: 'Layout1', // The topped Layout Name
        exact: true,
        component: loadable(() => import('../pages/MyWishlist'), {
            fallback: <Loading />
        })
    },
    {
        path: '/my-recent',
        key: 'ROOT',
        layout: 'Layout1', // The topped Layout Name
        exact: true,
        component: loadable(() => import('../pages/MyRecent'), {
            fallback: <Loading />
        })
    },
    {
        path: '/my-setting',
        key: 'ROOT',
        layout: 'Layout1', // The topped Layout Name
        exact: true,
        component: loadable(() => import('../pages/MySetting'), {
            fallback: <Loading />
        })
    },
    {
        path: '/product-upload',
        key: 'ROOT',
        layout: 'Layout2', // The topped Layout Name
        exact: true,
        component: loadable(() => import('../pages/Admin/UploadProduct'), {
            fallback: <Loading />
        })
    },
    {
        path: '/product-crud',
        key: 'ROOT',
        layout: 'Layout2', // The topped Layout Name
        exact: true,
        component: loadable(() => import('../pages/Admin/CrudProduct'), {
            fallback: <Loading />
        })
    },
    {
        path: '/acct-crud',
        key: 'ROOT',
        layout: 'Layout2', // The topped Layout Name
        exact: true,
        component: loadable(() => import('../pages/Admin/CrudAccount'), {
            fallback: <Loading />
        })
    },
    {
        path: '/home-setting',
        key: 'ROOT',
        layout: 'Layout2', // The topped Layout Name
        exact: true,
        component: loadable(() => import('../pages/Admin/HomeSetting'), {
            fallback: <Loading />
        })
    },
    {
        path: '/customer-register',
        key: 'ROOT',
        layout: 'Layout', // The topped Layout Name
        exact: true,
        component: loadable(() => import('../pages/Customer/CustomerSignup'), {
            fallback: <Loading />
        })
    },
    {
        path: '/login',
        key: 'ROOT',
        layout: 'Layout', // The topped Layout Name
        exact: true,
        component: loadable(() => import('../pages/Signin'), {
            fallback: <Loading />
        })
    },
    {
        path: '/forgot-password',
        key: 'ROOT',
        layout: 'Layout', // The topped Layout Name
        exact: true,
        component: loadable(() => import('../pages/ForgotPassword'), {
            fallback: <Loading />
        })
    },
    {
        path: '/reset-password/:token',
        key: 'ROOT',
        layout: 'Layout', // The topped Layout Name
        exact: true,
        component: loadable(() => import('../pages/ResetPassword'), {
            fallback: <Loading />
        })
    },
    {
        path: '/vendor-register',
        key: 'ROOT',
        layout: 'Layout', // The topped Layout Name
        exact: true,
        component: loadable(() => import('../pages/Vendor/VendorSignup'), {
            fallback: <Loading />
        })
    },
    {
        path: '/vendor-product',
        key: 'ROOT',
        layout: 'Layout3', // The topped Layout Name
        exact: true,
        component: loadable(() => import('../pages/Vendor/ManageProduct'), {
            fallback: <Loading />
        })
    }
];

export default routes;
