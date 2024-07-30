import { Button, Modal, Form, InputNumber, Input, Popconfirm, Table, Typography, Select, Checkbox, message } from 'antd';
import React, { useState, useEffect, useContext } from 'react';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import apis from '../../../api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserContext from '../../../utils/UserContext';

const { Option } = Select;

const Accounts = () => {
    const history = useHistory();
    const { setSpinning } = useContext(UserContext);

    const EditableCell = ({
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps
    }) => {
        let inputNode = <Input />
        if (inputType === 'number')
            inputNode = <InputNumber />
        if (inputType === 'checkbox')
            inputNode = <Checkbox />
        if (inputType === 'select')
            inputNode = <Select />

        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item
                        name={dataIndex}
                        style={{
                            margin: 0,
                        }}
                        rules={[
                            {
                                required: true,
                                message: `Please Input ${title}!`,
                            },
                        ]}
                    >
                        {inputNode}
                    </Form.Item>
                ) : (
                    children
                )}
            </td>
        );
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [accounts, setAccounts] = useState([]);
    const [accountsTmp, setAccountsTmp] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    const [accountId, setAccountId] = useState('');
    const [mode, setMode] = useState('create');
    const [filterAccount, setFilterAccount] = useState(true);
    const [filterContractor, setFilterContractor] = useState(true);
    const [filterFullName, setFilterFullName] = useState(null);

    const isEditing = (record) => record.key === editingKey;

    const edit = (record) => {
        setAccountId(record._id)
        setMode("update")
        form.setFieldsValue({
            fullName: record.fullName,
            email: record.email,
            phone: record.phone,
            address: record.address,
            fflNumber: record.fflNumber,
            role: record.role
        });
        showModal();
    };

    const remove = async (record) => {
        setSpinning(true)
        await apis.removeAccount(record.key)
        getAccounts();
        setSpinning(false)
        message.success('Successfully Saved!');
    }

    const cancel = () => {
        setEditingKey('');
    };

    const columns = [
        {
            title: 'No',
            render: (text, record, index) => index + 1,
            width: '5%',
            editable: false,
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
            width: '15%',
            editable: true
        },
        {
            title: 'Email',
            dataIndex: 'email',
            width: '15%',
            editable: true
        },
        {
            title: 'Role',
            dataIndex: 'role',
            width: '15%',
            editable: true
        },
        {
            title: 'Phone Number',
            dataIndex: 'phone',
            width: '15%',
            editable: true
        },
        {
            title: 'Address',
            dataIndex: 'address',
            width: '15%',
            editable: true
        },
        {
            title: 'FFL Number',
            dataIndex: 'fflNumber',
            width: '15%',
            editable: true
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_, record) => {
                return <>
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        Edit
                    </Typography.Link>
                    <span style={{ marginLeft: '5px', marginRight: '5px' }}>|</span>
                    <Popconfirm title="Sure to delete?" onConfirm={() => remove(record)}>
                        <a>Delete</a>
                    </Popconfirm>
                </>
            },
        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    useEffect(async () => {
        setSpinning(true)
        await getAccounts();
        setSpinning(false)
    }, []);

    const getAccounts = async () => {
        setSpinning(true)
        const res = await apis.getAccounts();
        setSpinning(false)
        const tmp = [];
        if (res.data.accounts?.length > 0) {
            res.data.accounts.map(account => {
                tmp.push({ ...account, key: account._id })
            })
            setAccounts(tmp);
            setAccountsTmp(tmp);
        }
    }

    const saveAccount = async (param) => {
        setSpinning(true)
        const data = await apis.newAccount(param)
        setSpinning(false)
        if (data.status === 200) {
            emptyForm();
            getAccounts();
            message.success('Successfully Saved!');
        }else{
            message.error('Something went wrong!');
        }
    }

    const emptyForm = () => {
        form.setFieldsValue({
            fullName: "",
            email: "",
            role: "",
            phone: "",
            address: "",
            fflNumber: "",
            password: "",
            passwordCheck: ""
        });
    }

    const reSaveAccount = async (param) => {
        const data = {
            key: accountId,
            param: param
        }
        setSpinning(true)
        const res = await apis.editAccount(data);
        setSpinning(false)
        if (res.status === 200) {
            emptyForm();
            getAccounts();
            message.success('Successfully Updated!');
        }
    }

    const showModal = (param) => {
        if(param === 'create'){
            setMode("create")
        }else{
            setMode("edit")
        }
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        onReset();
    };

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

    const onRoleChange = (value) => {
        form.setFieldsValue({
            role: value,
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

    const createAccount = (ev) => {
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
            if (values.password !==  values.passwordCheck) {
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
        if (!values.role || values.role === "") {
            toast.warning("Please select role!", {
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
        let role = values.role;
        let phone = values.phone;
        let address = values.address;
        let fflNumber = values.fflNumber;
        
        saveAccount({
            fullName: fullName,
            email: email,
            password: password,
            passwordCheck: passwordCheck,
            role: role,
            phone: phone,
            address: address,
            fflNumber: fflNumber
        });

        setIsModalOpen(false);
    };

    const updateAccount = (ev) => {
        ev.preventDefault();
        const values = form.getFieldsValue();

        if (!values.fullName || values.fullName === "") {
            toast.warning("Please input account full name!", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        if (!values.email || values.email === "") {
            toast.warning("Please input account email!", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        if (values.password !== values.passwordCheck) {
            toast.warning("Please input correct password and match!", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        if (!values.role || values.role === "") {
            toast.warning("Please select role!", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        if (!values.phone || values.phone === "") {
            toast.warning("Please input account phone number!", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        if (!values.address || values.address === "") {
            toast.warning("Please input account address!", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }

        let fullName = values.fullName;
        let email = values.email;
        let role = values.role;
        let phone = values.phone;
        let address = values.address;
        let fflNumber = values.fflNumber;
        let password = values.password;
        let passwordCheck = values.passwordCheck;

        reSaveAccount({
            fullName: fullName,
            email: email,
            password: password,
            passwordCheck: passwordCheck,
            role: role,
            phone: phone,
            address: address,
            fflNumber: fflNumber
        });

        emptyForm()
        setIsModalOpen(false);
    };

    const onFinish = (values) => {};

    const onReset = () => {
        emptyForm();
    };

    useEffect(() => {
        emptyForm();
    }, []);

    const filterAccountChange = (e) => {
        setFilterAccount(e.target.checked);
    }

    const filterContractorChange = (e) => {
        setFilterContractor(e.target.checked);
    }

    const filterAccounts = () => {
        let tmp = accountsTmp, tmp1 = [], tmp2 = [];

        tmp.map(t => {
            if(filterAccount && filterContractor) {
                if(t.role === 'employee' || t.role === 'contractor') {
                    tmp1.push(t)
                }
            }else if(filterAccount && !filterContractor) {
                if(t.role === 'employee') {
                    tmp1.push(t)
                }
            }else if(!filterAccount && filterContractor) {
                if(t.role === 'contractor') {
                    tmp1.push(t)
                }
            }else{
                return;
            }
        })

        if(filterFullName && filterFullName !== "") {
            tmp1.map(t => {
                if(t.fullName.toLowerCase().includes(filterFullName.toLowerCase())) {
                    tmp2.push(t)
                }
            })
        }else{
            tmp2 = [...tmp1]
        }

        setAccounts(tmp2);
    }

    const filterClear = () => {
        setAccounts(accountsTmp)
        setFilterContractor(true)
        setFilterAccount(true)
        setFilterFullName(null)
    }

    const accountFullNameSearch = (ev) => {
        setFilterFullName(ev.target.value)
    }

    return (
        <div className='page-container'>
            <div className='w-100 m-auto' style={{padding: '0 10px'}}>
                <div style={{marginBottom: '1rem', marginTop: '1rem'}}>
                    <Button className='new-account' onClick={() => showModal('create')}>
                        New Account
                    </Button>
                </div>
                {/* <div className='filter-options desktop-filter'>
                    <div>
                        <Input placeholder='Search a full name' value={filterFullName} onChange={accountFullNameSearch} />
                    </div>
                    <Button onClick={filterAccounts}>
                        Filter
                    </Button>
                    <Button onClick={filterClear} danger>
                        Clear
                    </Button>
                </div> */}
                <div className='page-content'>
                    <ToastContainer />
                    <div className=''>
                        <Modal
                            title={mode === 'create' ? "Create New Account" : "Update Account"}
                            visible={isModalOpen}
                            onCancel={handleCancel}
                            footer={mode === 'create' ? [
                                <Button type="primary" htmlType="submit" onClick={createAccount}>
                                    Create
                                </Button>,
                                <Button htmlType="button" onClick={onReset}>
                                    Reset
                                </Button>,
                                <Button type="link" htmlType="button" onClick={handleCancel}>
                                    Cancel
                                </Button>
                            ] : [
                                <Button type="primary" htmlType="submit" onClick={updateAccount}>
                                    Save
                                </Button>,
                                <Button type="link" htmlType="button" onClick={handleCancel}>
                                    Cancel
                                </Button>
                            ]}
                        >
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
                                {
                                    mode === 'create' ? <>
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
                                    </> : <>
                                        <Form.Item
                                            name="password"
                                            label="Password"
                                        >
                                            <Input.Password
                                                onChange={onPasswordChange}
                                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            name="passwordCheck"
                                            label="Password Check"
                                        >
                                            <Input.Password
                                                onChange={onPasswordCheckChange}
                                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                            />
                                        </Form.Item>
                                    </>
                                }
                                <Form.Item
                                    name="role"
                                    label="Role"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Select
                                        placeholder="Select A Role"
                                        onChange={onRoleChange}
                                        allowClear
                                        showSearch
                                        optionFilterProp="children"
                                    >
                                        {
                                            ['admin', 'vendor', 'customer'].map(role => {
                                                return <Option value={role} key={role}>{role}</Option>
                                            })
                                        }
                                    </Select>
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
                                    rules={[
                                        {
                                            required: false,
                                        },
                                    ]}
                                >
                                    <Input onChange={onFflNumberChange} />
                                </Form.Item>
                            </Form>
                        </Modal>
                    </div>
                    <Form form={form} component={false}>
                        <Table
                            components={{
                                body: {
                                    cell: EditableCell,
                                },
                            }}
                            scroll={{ x: 1000 }}
                            bordered
                            dataSource={accounts}
                            columns={mergedColumns}
                            rowClassName="editable-row"
                            pagination={{
                                onChange: cancel,
                                position: ['bottomLeft'],
                                showSizeChanger: true,
                                pageSizeOptions: ['10', '20', '30', '50', '100', '1000', '10000']
                            }}
                        />
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Accounts;
