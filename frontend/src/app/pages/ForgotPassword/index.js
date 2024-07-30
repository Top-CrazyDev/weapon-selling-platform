import { Form, Input, message } from 'antd';
import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import apis from '../../api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom"

const ForgotPassword = () => {
    const [form] = Form.useForm();
    const [isSent, setIsSent] = useState(false)

    const onEmailChange = (ev) => {
        form.setFieldsValue({
            email: ev.target.value,
        });
    };

    const onRequest = async (ev) => {
        ev.preventDefault();
        const values = form.getFieldsValue();

        if (!values.email || values.email === "") {
            toast.warning("Please input email!", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }

        let email = values.email;
        
        try {
            const res = await apis.forgotPassword({
                email: email
            })

            if(res.data.success) {
                setIsSent(true)
            }
        } catch(e) {
            message.error(e.response.data);
        }
    };

    return (
        <div className="auth-page">
            <ToastContainer />
            {
                !isSent && <Form
                    form={form}
                    name="control-hooks"
                    style={{
                        maxWidth: 600,
                        display: 'block'
                    }}
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

                    <div className='auth-btn' onClick={onRequest}>
                        Request
                    </div>
                </Form>
            }
            {
                isSent && <div>
                    <h4 style={{marginBottom: '0'}}>The reset password link has been successfully sent to your email. It will take some time to arrive into your email if you don't receive the email yet.</h4>
                    <br />
                    <Link to="/login">Back to Sign In</Link>
                </div>
            }
        </div>
    );
}

export default ForgotPassword;