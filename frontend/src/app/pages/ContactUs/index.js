import { Form, Input, message, Select, Checkbox, Button } from 'antd';
import React, { useState, useContext, useEffect } from 'react';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import apis from '../../api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useHistory } from "react-router-dom"
import UserContext from '../../utils/UserContext';

const { TextArea } = Input;
const { Option } = Select;

const ContactUs = () => {
    const { setSpinning, customerId } = useContext(UserContext);

    const [ppua, setPpua] = useState(false)

    const [form] = Form.useForm();

    const onFinish = (values) => { };

    const onEmailChange = (ev) => {
        form.setFieldsValue({
            email: ev.target.value,
        });
    }

    const onSubjectChange = (ev) => {
        form.setFieldsValue({
            subject: ev.target.value,
        });
    }

    const onWhatChange = (ev) => {
        form.setFieldsValue({
            what: ev,
        });
    }

    const onDescriptionChange = (ev) => {
        form.setFieldsValue({
            description: ev.target.value,
        });
    }

    const onPPUAChange = (ev) => {
        setPpua(ev.target.checked)
    }

    const onSubmit = async (ev) => {
        ev.preventDefault();
        const values = form.getFieldsValue();

        if (!values.email || values.email === "") {
            toast.warning("Please input email!", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        if (!values.subject || values.subject === "") {
            toast.warning("Please input subject!", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        if (!values.what || values.what === "") {
            toast.warning("Please select what question you have about!", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        if (!values.description || values.description === "") {
            toast.warning("Please input description!", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        if(!ppua) {
            toast.warning("Please check privacy policy and user agreement!", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }

        const param = {...values, ppua}

        setSpinning(true)
        await apis.submitContact(param)
        setSpinning(false)
        message.success("Successfully Submit!")
    }

    // page log
    useEffect(() => {
        const pageLog = async () => {
            await apis.addPageLog({
                customerId,
                page: '/contact-us'
            })
        }

        pageLog()
    }, [customerId])
    
    return (
        <div className='contact-page'>
            <ToastContainer />
            <h2 style={{marginBottom: '25px'}}>Contact Us</h2>
            <Form
                form={form}
                name="control-hooks"
                onFinish={onFinish}
                style={{
                    maxWidth: 1200,
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
                <Form.Item
                    name="subject"
                    label="Subject"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input onChange={onSubjectChange} />
                </Form.Item>
                <Form.Item
                    name="what"
                    label="What do you have a question about?"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        placeholder=""
                        onChange={onWhatChange}
                        allowClear
                        showSearch
                        optionFilterProp="children"
                        defaultValue={""}
                    >
                        {
                            [
                                {
                                    label: "-",
                                    value: ""
                                },
                                {
                                    label: "Account, Login or Registration",
                                    value: "auth"
                                },
                                {
                                    label: "Buying (Search, Bids, Purchase, Orders)",
                                    value: "buying"
                                },
                                {
                                    label: "Selling (Listing, Payments, Fees, Taxes)",
                                    value: "selling"
                                },
                                {
                                    label: "OutdoorPay",
                                    value: "outdoorpay"
                                },
                                {
                                    label: "Legal and Data Issues",
                                    value: "issues"
                                }
                            ].map(ct => {
                                return <Option value={ct.value} key={ct.value}>{ct.label}</Option>
                            })
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Description"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <TextArea onChange={onDescriptionChange} />
                    <small>
                    Please enter the details of your request. A member of our support staff will respond as soon as possible.
                    </small>
                </Form.Item>
                <Checkbox onChange={onPPUAChange}>I agree to the GunBroker.com <Link to="/privacy-policy">Privacy Policy</Link> and <Link to="user-agreement">User Agreement</Link></Checkbox>
            </Form>

            <Button style={{marginTop: '2rem'}} onClick={onSubmit}>Submit</Button>
        </div>
    );
}

export default ContactUs;