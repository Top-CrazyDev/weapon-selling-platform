import { Form, Input, message } from 'antd';
import React, { useContext } from 'react';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import apis from '../../../api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useHistory } from "react-router-dom"
import UserContext from '../../../utils/UserContext';

const Signup = () => {
    const history = useHistory()
    const [form] = Form.useForm();
    const { setSpinning } = useContext(UserContext);

    const saveAccount = async (param) => {
        try {
            setSpinning(true)
            const data = await apis.newCustomer(param)
            setSpinning(false)
            if (data.status === 200) {
                emptyForm();
                message.success('Successfully Registered!');
                history.push("/login");
            }
        } catch(e) {
            setSpinning(false)
            message.error(e.response.data.msg)
        }
    }

    const emptyForm = () => {
        form.setFieldsValue({
            fullName: "",
            email: "",
            password: "",
            passwordCheck: ""
        });
    }

    const onFullNameChange = (ev) => {
        form.setFieldsValue({
            fullName: ev.target.value,
        });
    };

    const onUserNameChange = (ev) => {
        form.setFieldsValue({
            username: ev.target.value,
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

    const onSignUp = (ev) => {
        ev.preventDefault();
        const values = form.getFieldsValue();

        if (!values.fullName || values.fullName === "") {
            toast.warning("Please input full name!", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        if (!values.userName || values.userName === "") {
            toast.warning("Please input username!", {
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
        }else{
            if(values.password.length < 6) {
                toast.warning("The password needs to be at least 6 characters long!", {
                    position: toast.POSITION.TOP_RIGHT
                });
                return;
            }
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

        let fullName = values.fullName;
        let userName = values.userName;
        let email = values.email;
        let password = values.password;
        let passwordCheck = values.passwordCheck;

        saveAccount({
            fullName: fullName,
            username: userName,
            email: email,
            password: password,
            passwordCheck: passwordCheck
        });
    };

    const onFinish = (values) => { };

    return (
        <div className="auth-page">
            <ToastContainer />
            <h2 style={{marginBottom: '25px'}}>Create Account</h2>
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
                    name="userName"
                    label="User Name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input onChange={onUserNameChange} />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    placeholder="At least 6 characters"
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