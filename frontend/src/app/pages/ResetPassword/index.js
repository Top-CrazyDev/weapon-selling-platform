import { Form, Input, message } from 'antd';
import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import apis from '../../api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom"
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
    const history = useHistory();
    const { token } = useParams();
    const [form] = Form.useForm();
    const [isSet, setIsSet] = useState(false)

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

    const onSubmit = async (ev) => {
        ev.preventDefault();
        const values = form.getFieldsValue();

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

        let password = values.password;
        let passwordCheck = values.passwordCheck;
        
        try {
            const res = await apis.resetPassword({
                newPassword: password,
                passwordCheck: passwordCheck,
                token
            })

            if(res.data.success) {
                setIsSet(true)
                setTimeout(() => {
                    window.location.href = "/login"
                }, 3000)
            }
        } catch(e) {
            message.error(e.response.data);
        }
    };

    return (
        <div className="auth-page">
            <ToastContainer />
            {
                !isSet && <Form
                    form={form}
                    name="control-hooks"
                    style={{
                        maxWidth: 600,
                        display: 'block'
                    }}
                >
                    <Form.Item
                        name="password"
                        label="New Password"
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

                    <div className='auth-btn' onClick={onSubmit}>
                        Submit
                    </div>

                    <br />
                    <Link to="/login">Back to Sign In</Link>
                </Form>
            }
            {
                isSet && <div>
                    <h4>The password has been reset successfully. You will be redirect to Sign In page...</h4>
                </div>
            }
        </div>
    );
}

export default ResetPassword;