import React, { useEffect, useContext, useState, Children } from "react";
import UserContext from "../../utils/UserContext";
import api from '../../api';
import { Button, Form, Input, message, Switch } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const MySetting = () => {
    const { userData, setSpinning, customerId } = useContext(UserContext);
    const [form] = Form.useForm();
    const [emailOtp, setEmailOtp] = useState(true);
    const [isEdit, setIsEdit] = useState(false);
    
    useEffect(() => {
        let token = localStorage.getItem("aotacticalToken");

        const getUserInfo = async () => {
            setSpinning(true)
            const res = await api.getUserInfo(token)
            setSpinning(false)

            form.setFieldsValue({
                fullName: res.data.fullName,
                username: res.data.username,
                email: res.data.email,
                phone: res.data.phone,
                address: res.data.address,
                password: '',
                passwordCheck: ''
            });
            setEmailOtp(res.data.otp)
        }

        getUserInfo()
    }, [userData])

    // page log
    useEffect(() => {
        const pageLog = async () => {
            await api.addPageLog({
                customerId,
                page: '/my-setting'
            })
        }

        pageLog()
    }, [customerId])

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

    const onOtpChange = (checked) => {
        setEmailOtp(checked);
    };

    const saveEdit = async (ev) => {
        ev.preventDefault();
        const values = form.getFieldsValue();

        if (!values.fullName || values.fullName === "") {
            toast.warning("Please input full name!", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        if (!values.username || values.username === "") {
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
        if(values.password && values.password.length < 6) {
            toast.warning("The password needs to be at least 6 characters long!", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }

        if(values.password) {
            if (!values.passwordCheck || values.passwordCheck === "") {
                toast.warning("Please input password check!", {
                    position: toast.POSITION.TOP_RIGHT
                });
                return;
            }else{
                if (values.password !== values.passwordCheck) {
                    toast.warning("Please input correct password and match!", {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    return;
                }       
            }
        }

        let fullName = values.fullName;
        let userName = values.userName;
        let email = values.email;
        let password = values.password;
        let passwordCheck = values.passwordCheck;
        let phone = values.phone;
        let address = values.address;
        let isOtp = emailOtp;

        if(password && password != "") {
            setSpinning(true)
            await api.updateAccountInfo({
                fullName,
                userName,
                email,
                password,
                passwordCheck,
                phone,
                address,
                isOtp
            })
            setSpinning(false)
        }else{
            setSpinning(true)
            await api.updateAccountInfo({
                fullName,
                userName,
                email,
                phone,
                address,
                isOtp
            })
            setSpinning(false)
        }

        closeEdit()
    };

    const onFinish = (values) => { };

    const edit = () => {
        setIsEdit(true)
    }

    const closeEdit = () => {
        setIsEdit(false)
        form.setFieldsValue({
            password: '',
            passwordCheck: ''
        });
    }

    return <div className="my-setting">
        <ToastContainer />
        <h4>You can edit your personal information.</h4>
        <Form
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            style={{
                maxWidth: 600,
                marginTop: '2rem'
            }}
        >
            <Form.Item
                name="fullName"
                label="Full Name"
            >
                <Input onChange={onFullNameChange} disabled={!isEdit} />
            </Form.Item>
            <Form.Item
                name="email"
                label="Email"
            >
                <Input onChange={onEmailChange} disabled={!isEdit} />
            </Form.Item>
            <Form.Item
                name="username"
                label="User Name"
            >
                <Input onChange={onUserNameChange} disabled={!isEdit} />
            </Form.Item>
            {
                isEdit && <Form.Item
                    name="password"
                    label="Password"
                    placeholder="At least 6 characters"
                >
                    <Input.Password
                        onChange={onPasswordChange}
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                </Form.Item>
            }
            {
                isEdit && <Form.Item
                    name="passwordCheck"
                    label="Password Check"
                >
                    <Input.Password
                        onChange={onPasswordCheckChange}
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                </Form.Item>
            }
            <Form.Item
                name="phone"
                label="Phone"
            > 
                <Input onChange={onPhoneChange} disabled={!isEdit} />
            </Form.Item>
            <Form.Item
                name="address"
                label="Address"
            > 
                <Input onChange={onAddressChange} disabled={!isEdit} />
            </Form.Item>
            <Form.Item
                name="emailOtp"
                label="Email OTP"
            >
                <Switch checkedChildren="Enabled" unCheckedChildren="Disabled" checked={emailOtp} onChange={onOtpChange} disabled={!isEdit} />
            </Form.Item>
        </Form>
        {
            isEdit ? <div>
                <Button onClick={saveEdit} style={{marginRight: '10px'}}>Save</Button>
                <Button danger onClick={closeEdit}>Cancel</Button>
            </div> : <Button type="dashed" onClick={edit}>Edit</Button>
        }
    </div>
}

export default MySetting;