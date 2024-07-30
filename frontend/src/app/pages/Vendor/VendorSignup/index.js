import { Form, Input, message } from 'antd';
import React, { useContext } from 'react';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import apis from '../../../api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useHistory } from 'react-router-dom'
import UserContext from '../../../utils/UserContext';

const Signup = () => {
    const { setSpinning } = useContext(UserContext);
    const history = useHistory();
    const [form] = Form.useForm();

    const saveAccount = async (param) => {
        setSpinning(true)
        const res = await apis.newVendor(param)
        setSpinning(false)
        if (res.status === 200) {
            emptyForm();
            message.success('Successfully Registered!');
            history.push("/login");
        } else {
            message.error('Something went wrong!');
        }
    }

    const emptyForm = () => {
        form.setFieldsValue({
            fullName: "",
            email: "",
            phone: "",
            address: "",
            password: "",
            passwordCheck: "",
            fflNumber: ""
        });
    }

    const onFullNameChange = (ev) => {
        form.setFieldsValue({
            fullName: ev.target.value,
        });
    };

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

    const onPasswordCheckChange = (ev) => {
        form.setFieldsValue({
            passwordCheck: ev.target.value,
        });
    };

    const onPhoneChange = (ev) => {
        form.setFieldsValue({
            phone: ev.target.value,
        });
    };

    const onAddressChange = (ev) => {
        form.setFieldsValue({
            address: ev.target.value,
        });
    };

    const onFflNumberChange = (ev) => {
        form.setFieldsValue({
            fflNumber: ev.target.value,
        });
    };    

    const onSignUp = (ev) => {
        ev.preventDefault();
        const values = form.getFieldsValue();

        if (!values.fullName || values.fullName === "") {
            toast.warning("Please input full name!", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
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
        if (!values.passwordCheck || values.passwordCheck === "") {
            if (values.password !== values.passwordCheck) {
                toast.warning("Please input correct password and match!", {
                    position: toast.POSITION.TOP_RIGHT
                });
                return;
            }

            toast.warning("Please input password check!", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        if (!values.phone || values.phone === "") {
            toast.warning("Please input phone number!", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        if (!values.address || values.address === "") {
            toast.warning("Please input address!", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }

        let fullName = values.fullName;
        let email = values.email;
        let password = values.password;
        let passwordCheck = values.passwordCheck;
        let phone = values.phone;
        let address = values.address;
        let fflNumber = values.fflNumber;        

        saveAccount({
            fullName: fullName,
            email: email,
            password: password,
            passwordCheck: passwordCheck,
            phone: phone,
            address: address,
            fflNumber: fflNumber
        });
    };

    const onFinish = (values) => { };

    return (
        <div className="auth-page">
            <ToastContainer />
            <h2 style={{marginBottom: '25px'}}>Create Vendor Account</h2>
            <Form
                form={form}
                name="control-hooks"
                onFinish={onFinish}
                style={{
                    maxWidth: 600,
                }}
            >
                <Form.Item
                    name="fullName"
                    label="Full Name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input onChange={onFullNameChange} />
                </Form.Item>
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
                <Form.Item
                    name="passwordCheck"
                    label="Password Check"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input.Password
                        onChange={onPasswordCheckChange}
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                </Form.Item>
                <Form.Item
                    name="phone"
                    label="Phone Number"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input onChange={onPhoneChange} />
                </Form.Item>
                <Form.Item
                    name="address"
                    label="Address"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input onChange={onAddressChange} />
                </Form.Item>
                <Form.Item
                    name="fflNumber"
                    label="FFL Number"
                >
                    <Input onChange={onFflNumberChange} />
                </Form.Item>
            </Form>
            <div className='auth-btn' onClick={onSignUp}>
                Sign Up
            </div>
            <div className='' style={{marginTop: '20px', marginBottom: '10px'}}>
                By creating an account, you agree to Aotactical's <Link>Conditions of Use</Link> and <Link>Privacy Notice</Link>.
            </div>
            <div>
                Already have an account? <Link to="/login">Sign in</Link>
            </div>
        </div>
    );
}

export default Signup;