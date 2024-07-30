import Axios from "axios";
import constant from "../utils/constant";

const token = localStorage.getItem("aotacticalToken");
// const config = { 
//     headers: { 
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${token}`
//     } 
// }

const uploadProduct = (data) => Axios.post(constant.BACKEND_URL + "/products/upload", { records: JSON.stringify(data) });
const addImgLink = (data) => Axios.post(constant.BACKEND_URL + "/products/addImgLink", { records: JSON.stringify(data) });
const getProducts = () => Axios.post(constant.BACKEND_URL + "/products/getProducts", {});
const getProductsByCategory = () => Axios.post(constant.BACKEND_URL + "/products/getProductsByCategory", {});
const getProductsBySearch = (data) => Axios.post(constant.BACKEND_URL + "/products/getProductsBySearch", data);
const getProductsByAdvancedSearch = (data) => Axios.post(constant.BACKEND_URL + "/products/getProductsByAdvancedSearch", data);
const removeProduct = (id) => Axios.post(constant.BACKEND_URL + "/products/removeProduct", { id: id });
const editProduct = (data) => Axios.post(constant.BACKEND_URL + "/products/editProduct", data);
const newProduct = (param) => Axios.post(constant.BACKEND_URL + "/products/newProduct", param);
const getProductById = (param) => Axios.post(constant.BACKEND_URL + "/products/getProductById", param);
const addCategoryToProduct = (param) => Axios.post(constant.BACKEND_URL + "/products/addCategoryToProduct", param);

const removeAccount = (id) => Axios.post(constant.BACKEND_URL + "/accounts/removeAccount", { id: id });
const editAccount = (data) => Axios.post(constant.BACKEND_URL + "/accounts/editAccount", data);
const newAccount = (param) => Axios.post(constant.BACKEND_URL + "/accounts/newAccount", param);
const getAccounts = () => Axios.post(constant.BACKEND_URL + "/accounts/getAccounts", {});

const getAllProducts = () => Axios.post(constant.BACKEND_URL + "/products/getAllProducts", {});

const newCustomer = (param) => Axios.post(constant.BACKEND_URL + "/customers/register", param);
const customerSignin = (param) => Axios.post(constant.BACKEND_URL + "/customers/login", param);
const handleOtpVerification = (param) => Axios.post(constant.BACKEND_URL + "/customers/handleOtpVerification", param);
const forgotPassword = (param) => Axios.post(constant.BACKEND_URL + "/customers/forgot-password", param);
const resetPassword = (param) => Axios.post(constant.BACKEND_URL + "/customers/reset-password/" + param.token, param);

const newVendor = (param) => Axios.post(constant.BACKEND_URL + "/vendors/register", param);

const checkLogin = (token) => Axios.post(constant.BACKEND_URL + "/users/tokenIsValid", null, { headers: { "x-auth-token": token } });
const getUserInfo = (token) => Axios.post(constant.BACKEND_URL + "/users/getUserInfo", null, { headers: { "x-auth-token": token } });
const updateAccountInfo = (param) => Axios.post(constant.BACKEND_URL + "/users/updateAccountInfo", param, { headers: { "x-auth-token": token } });

const addSlide = (param) => Axios.post(constant.BACKEND_URL + "/admin/addSlide", param);
const removeSlide = (param) => Axios.post(constant.BACKEND_URL + "/admin/removeSlide", param);
const addTop = (param) => Axios.post(constant.BACKEND_URL + "/admin/addTop", param);
const removeTop = (param) => Axios.post(constant.BACKEND_URL + "/admin/removeTop", param);
const getSlideProducts = () => Axios.post(constant.BACKEND_URL + "/admin/getSlideProducts", {});
const getTopProducts = () => Axios.post(constant.BACKEND_URL + "/admin/getTopProducts", {});

const getFflDealers = (param) => Axios.post(constant.BACKEND_URL + "/customers/getFflDealers", param);

const logVisitPage = (param) => Axios.post(constant.BACKEND_URL + "/track/trackCustomer", param);

const addToCart = (param) => Axios.post(constant.BACKEND_URL + "/customers/addToCart", param);
const getCartForCustomer = (param) => Axios.post(constant.BACKEND_URL + "/customers/getCartForCustomer", param);

const addToWishlist = (param) => Axios.post(constant.BACKEND_URL + "/customers/addToWishlist", param);
const getWishlistForCustomer = (param) => Axios.post(constant.BACKEND_URL + "/customers/getWishlistForCustomer", param);
const getRecentForCustomer = (param) => Axios.post(constant.BACKEND_URL + "/customers/getRecentForCustomer", param);

const submitContact = (param) => Axios.post(constant.BACKEND_URL + "/customers/submitContact", param);

const addPageLog = (param) => Axios.post(constant.BACKEND_URL + "/customers/addPageLog", param);
const addpayment = (param) => Axios.post(constant.BACKEND_URL + "/payment/payment", param);

const apis = {
    uploadProduct,
    addImgLink,
    getProducts,
    removeProduct,
    editProduct,
    newProduct,
    getProductsByCategory,
    getProductsBySearch,
    removeAccount,
    getAccounts,
    newAccount,
    editAccount,
    newCustomer,
    customerSignin,
    forgotPassword,
    newVendor,
    getProductById,
    addCategoryToProduct,
    checkLogin,
    getAllProducts,
    addSlide,
    removeSlide,
    addTop,
    removeTop,
    getSlideProducts,
    getTopProducts,
    getFflDealers,
    handleOtpVerification,
    getUserInfo,
    updateAccountInfo,
    getProductsByAdvancedSearch,
    logVisitPage,
    addToCart,
    getCartForCustomer,
    addToWishlist,
    getWishlistForCustomer,
    getRecentForCustomer,
    submitContact,
    addPageLog,
    resetPassword,
    addpayment
}

export default apis