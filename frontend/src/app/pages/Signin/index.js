import { Form, Input, message } from 'antd';
import React, { useState, useContext } from 'react';
import { EyeInvisibleOutlined, EyeTwoTone, FacebookFilled } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import apis from '../../api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom"
import UserContext from '../../utils/UserContext';

const Signin = () => {
    const { setSpinning, customerId } = useContext(UserContext);
    const history = useHistory();
    const [form] = Form.useForm();
    const [showOtpField, setShowOtpField] = useState(false);
    const [otp, setOtp] = useState('');
    const [response, setRes] = useState(null);

    const signin = async (param) => {
        try {
            setSpinning(true)
            const res = await apis.customerSignin(param)
            setSpinning(false)
            if(res.status === 200) {
                if(res.data?.user?.role === 'admin') {
                    localStorage.setItem("aotacticalToken", res.data?.token)
                    localStorage.setItem("aotacticalRole", res.data?.user?.role)
                    // history.push("/product-crud")
                    window.location.href = "/product-crud"
                }else if(res.data?.token){
                    localStorage.setItem("aotacticalToken", res.data?.token)
                    localStorage.setItem("aotacticalRole", res.data?.user?.role)
                    // history.push("/")
                    window.location.href = "/"
                }else{
                    setRes(res.data)
                    setShowOtpField(true);
                    message.info('OTP sent to your email. Check your inbox.');
                }
            }
        } catch(e) {
            setSpinning(false)
            message.error(e.response.data.msg);
        }
    }

    const resendOTP = async () => {
        const values = form.getFieldsValue();

        let email = values.email;
        let password = values.password;

        signin({
            email: email,
            password: password
        });
    }

    const onEmailChange = (ev) => {
        form.setFieldsValue({
            email: ev.target.value,
        });
    };

    const onPasswordChange = (ev) => {
        form.setFieldsValue({
            password: ev.target.value,
        });
    };

    const onSignIn = (ev) => {
        ev.preventDefault();
        const values = form.getFieldsValue();

        if (!values.email || values.email === "") {
            toast.warning("Please input email!", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        if (!values.password || values.password === "") {
            toast.warning("Please input password!", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }

        let email = values.email;
        let password = values.password;

        signin({
            email: email,
            password: password,
            customerId: customerId
        });
    };
 
    const handleOtpVerification = async () => {
        setSpinning(true)
        const res = await apis.handleOtpVerification({
            otp
        })
        setSpinning(false)
        if(res.status === 200) {
            localStorage.setItem("aotacticalToken", res.data.token)
            localStorage.setItem("aotacticalRole", res.data.user?.role)
            const { role } = res.data.user;
            if(role === 'admin')
                window.location.href = "/product-crud"
            else if(role === 'vendor')
                window.location.href = "/vendor-product"
            else
                window.location.href = "/"
        }else{
            message.error('Something went wrong!');
        }
    }

    return (
        <div className="auth-page">
            <ToastContainer />
            <Form
                form={form}
                name="control-hooks"
                style={ !showOtpField ? {
                    maxWidth: 600,
                    display: 'block'
                } : {display: 'none'}}
            >
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input onChange={onEmailChange} />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input.Password
                        onChange={onPasswordChange}
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                </Form.Item>
                <div className='auth-btn' onClick={onSignIn}>
                    Sign In
                </div>
                <div style={{marginTop: '20px', display: 'flex', justifyContent: 'space-between'}}>
                    <div>
                        New Customer? <Link to="/customer-register">Start here</Link>
                    </div>
                    <div>
                        <Link to="/forgot-password" style={{color: '#ff4d4f'}}>Forgot Password?</Link>
                    </div>
                </div>
            </Form>
            {   
                showOtpField && (
                    <>
                        <Input type="text" placeholder="OTP" onChange={(e) => setOtp(e.target.value)} />
                        <div className='auth-btn' style={{marginTop: '1rem'}} onClick={handleOtpVerification}>
                            Verify OTP
                        </div>
                        <div style={{marginTop: '1rem'}}>
                            <span>Haven't you received OTP?</span>
                            <a onClick={resendOTP} style={{marginLeft: '5px', textDecoration: 'underline'}}>Resend OTP</a>
                        </div>
                    </>
                )
            }
        </div>
    );
}

export default Signin;