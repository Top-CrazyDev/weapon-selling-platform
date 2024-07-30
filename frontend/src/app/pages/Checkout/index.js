import React, { useEffect, useState, useContext } from "react";
import { Button, Form, Input, message, Checkbox, Select } from 'antd';
import FFLDealer from "../FFLDealer";
import UserContext from "../../utils/UserContext";
import api from '../../api';
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from "react-router-dom";

const { Option } = Select;

const states = [
    { key: 'Alabama', value: 'Alabama'},
    { key: 'Alaska', value: 'Alaska'},
    { key: 'Arizona', value: 'Arizona'},
    { key: 'Arkansas', value: 'Arkansas'},
    { key: 'California', value: 'California'},
    { key: 'Colorado', value: 'Colorado'},
    { key: 'Connecticut', value: 'Connecticut'},
    { key: 'Delaware', value: 'Delaware'},
    { key: 'Florida', value: 'Florida'},
    { key: 'Georgia', value: 'Georgia'},
    { key: 'Hawaii', value: 'Hawaii'},
    { key: 'Idaho', value: 'Idaho'},
    { key: 'Illinois', value: 'Illinois'},
    { key: 'Indiana', value: 'Indiana'},
    { key: 'Iowa', value: 'Iowa'},
    { key: 'Kansas', value: 'Kansas'},
    { key: 'Kentucky', value: 'Kentucky'},
    { key: 'Louisiana', value: 'Louisiana'},
    { key: 'Maine', value: 'Maine'},
    { key: 'Maryland', value: 'Maryland'},
    { key: 'Massachusetts', value: 'Massachusetts'},
    { key: 'Michigan', value: 'Michigan'},
    { key: 'Minnesota', value: 'Minnesota'},
    { key: 'Mississippi', value: 'Mississippi'},
    { key: 'Missouri', value: 'Missouri'},
    { key: 'Montana', value: 'Montana'},
    { key: 'Nebraska', value: 'Nebraska'},
    { key: 'Nevada', value: 'Nevada'},
    { key: 'New Hampshire', value: 'New Hampshire'},
    { key: 'New Jersey', value: 'New Jersey'},
    { key: 'New Mexico', value: 'New Mexico'},
    { key: 'New York', value: 'New York'},
    { key: 'North Carolina', value: 'North Carolina'},
    { key: 'North Dakota', value: 'North Dakota'},
    { key: 'Ohio', value: 'Ohio'},
    { key: 'Oklahoma', value: 'Oklahoma'},
    { key: 'Oregon', value: 'Oregon'},
    { key: 'Pennsylvania', value: 'Pennsylvania'},
    { key: 'Rhode Island', value: 'Rhode Island'},
    { key: 'South Carolina', value: 'South Carolina'},
    { key: 'South Dakota', value: 'South Dakota'},
    { key: 'Tennessee', value: 'Tennessee'},
    { key: 'Texas', value: 'Texas'},
    { key: 'Utah', value: 'Utah'},
    { key: 'Vermont', value: 'Vermont'},
    { key: 'Virginia', value: 'Virginia'},
    { key: 'Washington', value: 'Washington'},
    { key: 'West Virginia', value: 'West Virginia'},
    { key: 'Wisconsin', value: 'Wisconsin'},
    { key: 'Wyoming', value: 'Wyoming'}
];

const Checkout = () => {
    const history = useHistory()
    const { userData, setSpinning } = useContext(UserContext)
    const [isForm, setIsForm] = useState(false)
    const [form] = Form.useForm()
    const [isEdit, setIsEdit] = useState(false)
    const [checked, setChecked] = useState(false)
    const [isCompleteShippingAddress, setIsCompleteShippingAddress] = useState(false)
    const [userAddress, setUserAddress] = useState(null)
    const [fflDealer, setFflDealer] = useState(null)

    const openFormForAddress = () => {
        setIsForm(true)
    }

    const onFinish = (values) => { };

    const onFirstNameChange = (ev) => {
        form.setFieldsValue({
            firstname: ev.target.value,
        });
    };

    const onLastNameChange = (ev) => {
        form.setFieldsValue({
            lastname: ev.target.value,
        });
    };

    const onAddress1Change = (ev) => {
        form.setFieldsValue({
            address1: ev.target.value,
        });
    };

    const onAddress2Change = (ev) => {
        form.setFieldsValue({
            address2: ev.target.value,
        });
    };

    const onZipCodeChange = (ev) => {
        form.setFieldsValue({
            zipCode: ev.target.value,
        });
    };

    const onCityChange = (ev) => {
        form.setFieldsValue({
            city: ev.target.value,
        });
    };

    const onCountryChange = (value) => {
        form.setFieldsValue({
            country: value,
        });
    };

    const onStateChange = (value) => {
        form.setFieldsValue({
            state: value,
        });
    };

    const onChecking = (ev) => {
        setChecked(ev.target.checked)
    }

    const saveEdit = async (ev) => {
        ev.preventDefault();
        const values = form.getFieldsValue();

        if (!values.firstname || values.firstname === "") {
            toast.warning("Please input First Name!", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        if (!values.lastname || values.lastname === "") {
            toast.warning("Please input Last Name!", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        if (!values.address1 || values.address1 === "") {
            toast.warning("Please input Address!", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        const zipCodePattern = /^(?:\d{5}|\d{5}-\d{4})$/;
        if (!values.zipCode || values.zipCode === "") {
            toast.warning("Please input Zip Code!", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        } else if (!zipCodePattern.test(values.zipCode)) {
            toast.warning("Invalid ZIP Code. Please input a valid format (12345 or 12345-6789).", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        if (!values.city || values.city === "") {
            toast.warning("Please input City!", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        // if (!values.country || values.country === "") {
        //     toast.warning("Please input Country!", {
        //         position: toast.POSITION.TOP_RIGHT
        //     });
        //     return;
        // }
        if (!values.state || values.state === "") {
            toast.warning("Please input State!", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }

        let fullName = values.firstname + " " + values.lastname;
        let address = values.address1;
        let address2 = values.address2;
        let zipCode = values.zipCode;
        let city = values.city;
        let country = 'United States';
        let state = values.state;

        setSpinning(true)
        await api.updateAccountInfo({
            fullName,
            address,
            address2,
            zipCode,
            city,
            country,
            state
        })
        await getUserInfo()
        setSpinning(false)

        setIsEdit(false)
    };

    const edit = () => {
        setIsEdit(true)
    }

    const closeEdit = () => {
        setIsEdit(false)
        if(!userAddress) {
            form.setFieldsValue({
                firstname: null,
                lastname: null,
                address1: null,
                address2: null,
                zipCode: null,
                city: null,
                country: null,
                state: null,
            });
        } else {
            form.setFieldsValue(userAddress);
        }
    }

    const getUserInfo = async () => {
        let token = localStorage.getItem("aotacticalToken");
        setSpinning(true)
        const res = await api.getUserInfo(token)
        setSpinning(false)

        if(res.data.address && res.data.zipCode && res.data.city && res.data.country && res.data.state) {
            const address = {
                firstname: res.data.fullName.split(" ")[0],
                lastname: res.data.fullName.split(" ")[1],
                address1: res.data.address,
                address2: res.data.address2,
                zipCode: res.data.zipCode,
                city: res.data.city,
                country: res.data.country,
                state: res.data.state,
            }
            
            form.setFieldsValue(address)
            setUserAddress(address)
            openFormForAddress()
            setIsCompleteShippingAddress(true)
        }else{
            form.setFieldsValue({
                country: 'United States'
            })
            setIsEdit(true)
        }
    }

    useEffect(() => {
        getUserInfo()
    }, [])

    const AddressForm = () => {
        return <div className="address-form">
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
                    name="firstname"
                    label="First Name"
                >
                    <Input onChange={onFirstNameChange} disabled={!isEdit} />
                </Form.Item>
                <Form.Item
                    name="lastname"
                    label="Last Name"
                >
                    <Input onChange={onLastNameChange} disabled={!isEdit} />
                </Form.Item>
                <Form.Item
                    name="address1"
                    label="Street Address"
                >
                    <Input onChange={onAddress1Change} disabled={!isEdit} />
                </Form.Item>
                <Form.Item
                    name="address2"
                    label="Street Address 2"
                >
                    <Input onChange={onAddress2Change} disabled={!isEdit} />
                </Form.Item>
                <Form.Item
                    name="zipCode"
                    label="Zip/Post Code"
                >
                    <Input onChange={onZipCodeChange} disabled={!isEdit} />
                </Form.Item>
                <Form.Item
                    name="city"
                    label="City"
                >
                    <Input onChange={onCityChange} disabled={!isEdit} />
                </Form.Item>
                <Form.Item
                    name="country"
                    label="Country"
                >
                    <Select
                        onChange={onCountryChange}
                        allowClear
                        showSearch
                        optionFilterProp="children"
                        disabled={!isEdit}
                        defaultValue={{
                            value: 'United States'
                        }}
                    >
                        {
                            [
                                {
                                    key: 'United States',
                                    value: 'United States'
                                }
                            ].map(item => {
                                return <Option value={item.value} key={item.key}>{item.value}</Option>
                            })
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    name="state"
                    label="State/Province"
                >
                    <Select
                        onChange={onStateChange}
                        allowClear
                        showSearch
                        optionFilterProp="children"
                        disabled={!isEdit}
                    >
                        {
                            states.map(item => {
                                return <Option value={item.value} key={item.key}>{item.value}</Option>
                            })
                        }
                    </Select>
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

    useEffect(() => {
        let token = localStorage.getItem("aotacticalToken");

        const getUserInfo = async () => {
            setSpinning(true)
            const res = await api.getUserInfo(token)
            setSpinning(false)

            form.setFieldsValue({
                firstname: res.data.fullName.split(" ")[0],
                lastname: res.data.fullName.split(" ")[1],
                address1: res.data.address,
                address2: res.data.address2,
                zipCode: res.data.zipCode,
                city: res.data.city,
                country: res.data.country,
                state: res.data.state
            });
        }

        getUserInfo()
    }, [userData])

    const pickFFL = (param) => {
        setFflDealer(param)
    }

    const continuePayment = () => {
        history.push("/payment")
    }

    return <div className="my-checkout">
        <ToastContainer />
        <div className="addresses">
            <div className="billing-address">
                <h3>Billing Address</h3>
                <hr></hr>
                {
                    !isForm && <Button onClick={openFormForAddress}>Add Address</Button>
                }
                {
                    isForm && <AddressForm></AddressForm>
                }
            </div>
            {
                isCompleteShippingAddress && <div className="shipping-address">
                    <div style={{paddingLeft: '20px', paddingRight: '20px'}}>
                        <h3>Shipping Address</h3>
                        <hr></hr>
                    </div>
                    
                    <FFLDealer pickFflDealer={pickFFL} />
                </div>
            }
        </div>
        <div className="verify-age">
            <Checkbox onChange={onChecking}>By checking this box you are validating that you are of legal age to purchase firearms and ammunition and are in compliance with all rules and regulations of your jurisdiction</Checkbox>
        </div>
        {
            !fflDealer && <div className="notification">
                Please select an FFL to Continue
            </div>
        }
        <div className="continue-button">
            <Button type="primary" disabled={!fflDealer || !checked} onClick={continuePayment}>Continue to Payment Method</Button>
        </div>
    </div>
}

export default Checkout;