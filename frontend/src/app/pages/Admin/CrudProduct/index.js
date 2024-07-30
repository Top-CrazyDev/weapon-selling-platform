import { Button, Modal, Form, InputNumber, Input, Popconfirm, Table, Typography, Select, Checkbox, message } from 'antd';
import React, { useState, useEffect, useContext } from 'react';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apis from '../../../api';
import category from '../../../utils/category';
import UserContext from '../../../utils/UserContext';

const { Option } = Select;

const Products = () => {
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
    const [products, setProducts] = useState([]);
    const [productsTmp, setProductsTmp] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    const [productId, setProductId] = useState('');
    const [mode, setMode] = useState('create');
    const [filterEmployee, setFilterEmployee] = useState(true);
    const [filterContractor, setFilterContractor] = useState(true);
    const [filterFullName, setFilterFullName] = useState(null);

    const isEditing = (record) => record.key === editingKey;

    const edit = (record) => {
        setProductId(record._id)
        setMode("update")
        form.setFieldsValue({
            available: record.available,
            category: record.category,
            subcategory: record.subcategory,
            desc1: record.desc1,
            desc2: record.desc2,
            itemnumber: record.itemnumber,
            manufacturer: record.manufacturer,
            mfgpnumber: record.mfgpnumber,
            msrp: record.msrp,
            price1: record.price1,
            price2: record.price2,
            price3: record.price3,
            qty1: record.qty1,
            qty2: record.qty2,
            qty3: record.qty3,
            upc: record.upc,
            weight: record.weight,
            serialized: record.serialized,
            mapprice: record.mapprice,
            allowdirectship: record.allowdirectship,
            maineachprice: record.maineachprice,
            imagelink: record.imagelink,
        });
        showModal();
    };

    const remove = async (record) => {
        setSpinning(true)
        await apis.removeProduct(record.key)
        getProducts();
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
            title: 'Image',
            dataIndex: 'imagelink',
            width: '15%',
            editable: true,
            render: (text, record) => {
                return <div style={{
                    maxWidth: '200px',
                    maxHeight: '200px'
                }}>
                    <img src={text} alt='Image Not Found' style={{maxWidth: '100%', maxHeight: '100%'}} />
                </div>
            }
        },
        {
            title: 'Available',
            dataIndex: 'available',
            width: '3.33%',
            editable: true
        },
        {
            title: 'Category',
            dataIndex: 'category',
            width: '3.33%',
            editable: true
        },
        {
            title: 'Sub Category',
            dataIndex: 'subcategory',
            width: '3.33%',
            editable: true
        },
        {
            title: 'Description1',
            dataIndex: 'desc1',
            width: '3.33%',
            editable: true
        },
        {
            title: 'Description2',
            dataIndex: 'desc2',
            width: '3.33%',
            editable: true
        },
        {
            title: 'Item Number',
            dataIndex: 'itemnumber',
            width: '3.33%',
            editable: true
        },
        {
            title: 'Manufacturer',
            dataIndex: 'manufacturer',
            width: '3.33%',
            editable: true
        },
        {
            title: 'MFGP Number',
            dataIndex: 'mfgpnumber',
            width: '3.33%',
            editable: true
        },
        {
            title: 'MSRP',
            dataIndex: 'msrp',
            width: '3.33%',
            editable: true
        },
        {
            title: 'Price 1',
            dataIndex: 'price1',
            width: '3.33%',
            editable: true
        },
        {
            title: 'Price 2',
            dataIndex: 'price2',
            width: '3.33%',
            editable: true
        },
        {
            title: 'Price 3',
            dataIndex: 'price3',
            width: '3.33%',
            editable: true
        },
        {
            title: 'QTY 1',
            dataIndex: 'qty1',
            width: '3.33%',
            editable: true
        },
        {
            title: 'QTY 2',
            dataIndex: 'qty2',
            width: '3.33%',
            editable: true
        },
        {
            title: 'QTY 3',
            dataIndex: 'qty3',
            width: '3.33%',
            editable: true
        },
        {
            title: 'UPC',
            dataIndex: 'upc',
            width: '3.33%',
            editable: true
        },
        {
            title: 'Weight',
            dataIndex: 'weight',
            width: '3.33%',
            editable: true
        },
        {
            title: 'Serialized',
            dataIndex: 'serialized',
            width: '3.33%',
            editable: true
        },
        {
            title: 'Map Price',
            dataIndex: 'mapprice',
            width: '3.33%',
            editable: true
        },
        {
            title: 'Allow Direct Ship',
            dataIndex: 'allowdirectship',
            width: '3.33%',
            editable: true
        },
        {
            title: 'Main Each Price',
            dataIndex: 'maineachprice',
            width: '3.33%',
            editable: true
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            width: '10%',
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
        await getProducts();
        setSpinning(false)
    }, []);

    const getProducts = async () => {
        setSpinning(true)
        const res = await apis.getProducts();
        setSpinning(false)
        const tmp = [];
        if (res.data.products?.length > 0) {
            res.data.products.map(product => {
                tmp.push({ ...product, key: product._id })
            })
            setProducts(tmp);
            setProductsTmp(tmp);
        }
    }

    const saveProduct = async (param) => {
        setSpinning(true)
        const data = await apis.newProduct(param);
        setSpinning(false)
        if (data.status === 200) {
            emptyForm();
            getProducts();
            message.success('Successfully Saved!');
        }else{
            message.error('Something went wrong!');
        }
    }

    const emptyForm = () => {
        form.setFieldsValue({
            available: "",
            category: "",
            subcategory: "",
            desc1: "",
            desc2: "",
            itemnumber: "",
            manufacturer: "",
            mfgpnumber: "",
            msrp: "",
            price1: "",
            price2: "",
            price3: "",
            qty1: "",
            qty2: "",
            qty3: "",
            upc: "",
            weight: "",
            serialized: "",
            mapprice: "",
            allowdirectship: "",
            maineachprice: "",
            imagelink: ""
        });
    }

    const reSaveProduct = async (param) => {
        const data = {
            key: productId,
            param: param
        }
        const res = await apis.editProduct(data);
        if (res.status === 200) {
            emptyForm();
            getProducts();
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

    const onAvailableChange = (ev) => {
        form.setFieldsValue({
            available: ev.target.value,
        });
    };

    const onCategoryChange = (value) => {
        form.setFieldsValue({
            category: value,
        });
    };

    const onSubCategoryChange = (ev) => {
        form.setFieldsValue({
            subcategory: ev.target.value,
        });
    };
    const onDesc1Change = (ev) => {
        form.setFieldsValue({
            desc1: ev.target.value,
        });
    };
    const onDesc2Change = (ev) => {
        form.setFieldsValue({
            desc2: ev.target.value,
        });
    };
    const onItemNumberChange = (ev) => {
        form.setFieldsValue({
            itemnumber: ev.target.value,
        });
    };
    const onManufacturerChange = (ev) => {
        form.setFieldsValue({
            manufacturer: ev.target.value,
        });
    };
    const onMfgpNumberChange = (ev) => {
        form.setFieldsValue({
            mfgpnumber: ev.target.value,
        });
    };
    const onMsrpChange = (ev) => {
        form.setFieldsValue({
            msrp: ev.target.value,
        });
    };
    const onPrice1Change = (ev) => {
        form.setFieldsValue({
            price1: ev.target.value,
        });
    };
    const onPrice2Change = (ev) => {
        form.setFieldsValue({
            price2: ev.target.value,
        });
    };
    const onPrice3Change = (ev) => {
        form.setFieldsValue({
            price3: ev.target.value,
        });
    };
    const onQty1Change = (ev) => {
        form.setFieldsValue({
            qty1: ev.target.value,
        });
    };
    const onQty2Change = (ev) => {
        form.setFieldsValue({
            qty2: ev.target.value,
        });
    };
    const onQty3Change = (ev) => {
        form.setFieldsValue({
            qty3: ev.target.value,
        });
    };
    const onUpcChange = (ev) => {
        form.setFieldsValue({
            upc: ev.target.value,
        });
    };
    const onWeightChange = (ev) => {
        form.setFieldsValue({
            weight: ev.target.value,
        });
    };
    const onSerializedChange = (value) => {
        form.setFieldsValue({
            serialized: value,
        });
    };
    const onMapPriceChange = (ev) => {
        form.setFieldsValue({
            mapprice: ev.target.value,
        });
    };
    const onAllowdirectshipChange = (value) => {
        form.setFieldsValue({
            allowdirectship: value,
        });
    };
    const onMainEachPriceChange = (ev) => {
        form.setFieldsValue({
            maineachpric: ev.target.value,
        });
    };
    const onImageLinkChange = (ev) => {
        form.setFieldsValue({
            imagelink: ev.target.value,
        });
    };

    const createProduct = (ev) => {
        ev.preventDefault();
        const values = form.getFieldsValue();

        if (!values.available || values.available === "") {
            toast.warning("Please input available!", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        if (!values.category || values.category === "") {
            toast.warning("Please select category!", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        if (!values.subcategory || values.subcategory === "") {
            toast.warning("Please input sub category!", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        if (!values.desc1 || values.desc1 === "") {
            toast.warning("Please input description1!", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        if (!values.desc2 || values.desc2 === "") {
            toast.warning("Please input description2!", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        if (!values.manufacturer || values.manufacturer === "") {
            toast.warning("Please input manufacuturer!", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        if (!values.mfgpnumber || values.mfgpnumber === "") {
            toast.warning("Please input mfgp number!", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        if (!values.msrp || values.msrp === "") {
            toast.warning("Please input msrp!", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        if (!values.price1 || values.price1 === "") {
            toast.warning("Please input price1!", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        if (!values.qty1 || values.qty1 === "") {
            toast.warning("Please input qty1!", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        if (!values.upc || values.upc === "") {
            toast.warning("Please input upc!", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        if (!values.weight || values.weight === "") {
            toast.warning("Please input weight!", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        if (!values.serialized || values.serialized === "") {
            toast.warning("Please select serialized!", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        if (!values.mapprice || values.mapprice === "") {
            toast.warning("Please input map price!", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        if (!values.allowdirectship || values.allowdirectship === "") {
            toast.warning("Please select allow direct ship!", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        if (!values.maineachprice || values.maineachprice === "") {
            toast.warning("Please input main each price!", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        

        let available = values.available;
        let category = values.category;
        let subcategory = values.subcategory;
        let desc1 = values.desc1;
        let desc2 = values.desc2;
        let itemnumber = values.itemnumber;
        let manufacturer = values.manufacturer;
        let mfgpnumber = values.mfgpnumber;
        let msrp = values.msrp;
        let price1 = values.price1;
        let price2 = values.price2;
        let price3 = values.price3;
        let qty1 = values.qty1;
        let qty2 = values.qty2;
        let qty3 = values.qty3;
        let upc = values.upc;
        let weight = values.weight;
        let serialized = values.serialized;
        let mapprice = values.mapprice;
        let allowdirectship = values.allowdirectship;
        let maineachprice = values.maineachprice;
        let imagelink = values.imagelink;
        
        saveProduct({
            available: available,
            category:category,
            subcategory: subcategory,
            desc1: desc1,
            desc2: desc2,
            itemnumber: itemnumber,
            manufacturer: manufacturer,
            mfgpnumber: mfgpnumber,
            msrp: msrp,
            price1: price1,
            price2: price2,
            price3: price3,
            qty1: qty1,
            qty2: qty2,
            qty3: qty3,
            upc: upc,
            weight: weight,
            serialized: serialized,
            mapprice: mapprice,
            allowdirectship: allowdirectship,
            maineachprice: maineachprice,
            imagelink: imagelink
        });

        setIsModalOpen(false);
    };

    const updateProduct = (ev) => {
        ev.preventDefault();
        const values = form.getFieldsValue();

        if (!values.available || values.available === "") {
            toast.warning("Please input available!", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        if (!values.category || values.category === "") {
            toast.warning("Please select category!", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        if (!values.subcategory || values.subcategory === "") {
            toast.warning("Please input sub category!", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        if (!values.desc1 || values.desc1 === "") {
            toast.warning("Please input description1!", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        if (!values.desc2 || values.desc2 === "") {
            toast.warning("Please input description2!", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        if (!values.manufacturer || values.manufacturer === "") {
            toast.warning("Please input manufacuturer!", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        if (!values.mfgpnumber || values.mfgpnumber === "") {
            toast.warning("Please input mfgp number!", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        if (!values.msrp || values.msrp === "") {
            toast.warning("Please input msrp!", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        if (!values.price1 || values.price1 === "") {
            toast.warning("Please input price1!", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        if (!values.qty1 || values.qty1 === "") {
            toast.warning("Please input qty1!", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        if (!values.upc || values.upc === "") {
            toast.warning("Please input upc!", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        if (!values.weight || values.weight === "") {
            toast.warning("Please input weight!", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        if (!values.serialized || values.serialized === "") {
            toast.warning("Please select serialized!", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        if (!values.mapprice || values.mapprice === "") {
            toast.warning("Please input map price!", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        if (!values.allowdirectship || values.allowdirectship === "") {
            toast.warning("Please select allow direct ship!", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        if (!values.maineachprice || values.maineachprice === "") {
            toast.warning("Please input main each price!", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }

        let available = values.available;
        let category = values.category;
        let subcategory = values.subcategory;
        let desc1 = values.desc1;
        let desc2 = values.desc2;
        let itemnumber = values.itemnumber;
        let manufacturer = values.manufacturer;
        let mfgpnumber = values.mfgpnumber;
        let msrp = values.msrp;
        let price1 = values.price1;
        let price2 = values.price2;
        let price3 = values.price3;
        let qty1 = values.qty1;
        let qty2 = values.qty2;
        let qty3 = values.qty3;
        let upc = values.upc;
        let weight = values.weight;
        let serialized = values.serialized;
        let mapprice = values.mapprice;
        let allowdirectship = values.allowdirectship;
        let maineachprice = values.maineachprice;
        let imagelink = values.imagelink;

        reSaveProduct({
            available: available,
            category:category,
            subcategory: subcategory,
            desc1: desc1,
            desc2: desc2,
            itemnumber: itemnumber,
            manufacturer: manufacturer,
            mfgpnumber: mfgpnumber,
            msrp: msrp,
            price1: price1,
            price2: price2,
            price3: price3,
            qty1: qty1,
            qty2: qty2,
            qty3: qty3,
            upc: upc,
            weight: weight,
            serialized: serialized,
            mapprice: mapprice,
            allowdirectship: allowdirectship,
            maineachprice: maineachprice,
            imagelink: imagelink
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

    // const filterEmployeeChange = (e) => {
    //     setFilterEmployee(e.target.checked);
    // }

    // const filterContractorChange = (e) => {
    //     setFilterContractor(e.target.checked);
    // }

    // const filterProducts = () => {
    //     let tmp = productsTmp, tmp1 = [], tmp2 = [];

    //     tmp.map(t => {
    //         if(filterEmployee && filterContractor) {
    //             if(t.payType === 'employee' || t.payType === 'contractor') {
    //                 tmp1.push(t)
    //             }
    //         }else if(filterEmployee && !filterContractor) {
    //             if(t.payType === 'employee') {
    //                 tmp1.push(t)
    //             }
    //         }else if(!filterEmployee && filterContractor) {
    //             if(t.payType === 'contractor') {
    //                 tmp1.push(t)
    //             }
    //         }else{
    //             return;
    //         }
    //     })

    //     if(filterFullName && filterFullName !== "") {
    //         tmp1.map(t => {
    //             if(t.fullName.toLowerCase().includes(filterFullName.toLowerCase())) {
    //                 tmp2.push(t)
    //             }
    //         })
    //     }else{
    //         tmp2 = [...tmp1]
    //     }

    //     setProducts(tmp2);
    // }

    // const filterClear = () => {
    //     setProducts(productsTmp)
    //     setFilterContractor(true)
    //     setFilterEmployee(true)
    //     setFilterFullName(null)
    // }

    // const productFullNameSearch = (ev) => {
    //     setFilterFullName(ev.target.value)
    // }

    return (
        <div className='page-container'>
            <div className='w-100 m-auto' style={{padding: '0 10px'}}>
                <div style={{marginBottom: '1rem', marginTop: '1rem'}}>
                    <Button className='new-product' onClick={() => showModal('create')}>
                        New Product
                    </Button>
                </div>
                {/* <div className='filter-options desktop-filter'>
                    <Checkbox checked={filterEmployee} onChange={e => filterEmployeeChange(e)}>Employee</Checkbox>
                    <Checkbox checked={filterContractor} onChange={e => filterContractorChange(e)}>Contractor</Checkbox>
                    <div>
                        <Input placeholder='Search a full name' value={filterFullName} onChange={productFullNameSearch} />
                    </div>
                    <Button onClick={filterProducts}>
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
                            title={mode === 'create' ? "Create New Product" : "Update Product"}
                            visible={isModalOpen}
                            onCancel={handleCancel}
                            footer={mode === 'create' ? [
                                <Button type="primary" htmlType="submit" onClick={createProduct}>
                                    Create
                                </Button>,
                                <Button htmlType="button" onClick={onReset}>
                                    Reset
                                </Button>,
                                <Button type="link" htmlType="button" onClick={handleCancel}>
                                    Cancel
                                </Button>
                            ] : [
                                <Button type="primary" htmlType="submit" onClick={updateProduct}>
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
                                    name="available"
                                    label="Available"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input onChange={onAvailableChange} />
                                </Form.Item>
                                <Form.Item
                                    name="category"
                                    label="Category"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Select
                                        placeholder="Select A Category"
                                        onChange={onCategoryChange}
                                        allowClear
                                        showSearch
                                        optionFilterProp="children"
                                    >
                                        {
                                            category.map(ct => {
                                                return <Option value={ct.value} key={ct.value}>{ct.label}</Option>
                                            })
                                        }
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name="subcategory"
                                    label="Sub Category"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input onChange={onSubCategoryChange} />
                                </Form.Item>
                                <Form.Item
                                    name="desc1"
                                    label="Description1"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input onChange={onDesc1Change} />
                                </Form.Item>
                                <Form.Item
                                    name="desc2"
                                    label="Description2"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input onChange={onDesc2Change} />
                                </Form.Item>
                                <Form.Item
                                    name="itemnumber"
                                    label="Item Number"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input onChange={onItemNumberChange} />
                                </Form.Item>
                                <Form.Item
                                    name="manufacturer"
                                    label="Manufacturer"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input onChange={onManufacturerChange} />
                                </Form.Item>
                                <Form.Item
                                    name="mfgpnumber"
                                    label="MFGP Number"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input onChange={onMfgpNumberChange} />
                                </Form.Item>
                                <Form.Item
                                    name="msrp"
                                    label="MSRP"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input onChange={onMsrpChange} />
                                </Form.Item>
                                <Form.Item
                                    name="price1"
                                    label="Price1"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input onChange={onPrice1Change} />
                                </Form.Item>
                                <Form.Item
                                    name="price2"
                                    label="Price2"
                                    rules={[
                                        {
                                            required: false,
                                        },
                                    ]}
                                >
                                    <Input onChange={onPrice2Change} />
                                </Form.Item>
                                <Form.Item
                                    name="price3"
                                    label="Price3"
                                    rules={[
                                        {
                                            required: false,
                                        },
                                    ]}
                                >
                                    <Input onChange={onPrice3Change} />
                                </Form.Item>
                                <Form.Item
                                    name="qty1"
                                    label="QTY1"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input onChange={onQty1Change} />
                                </Form.Item>
                                <Form.Item
                                    name="qty2"
                                    label="QTY2"
                                    rules={[
                                        {
                                            required: false,
                                        },
                                    ]}
                                >
                                    <Input onChange={onQty2Change} />
                                </Form.Item>
                                <Form.Item
                                    name="qty3"
                                    label="QTY3"
                                    rules={[
                                        {
                                            required: false,
                                        },
                                    ]}
                                >
                                    <Input onChange={onQty3Change} />
                                </Form.Item>
                                <Form.Item
                                    name="upc"
                                    label="UPC"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input onChange={onUpcChange} />
                                </Form.Item>
                                <Form.Item
                                    name="weight"
                                    label="Weight"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input onChange={onWeightChange} />
                                </Form.Item>
                                <Form.Item
                                    name="serialized"
                                    label="Serialized"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Select
                                        placeholder="Select A Serialized"
                                        onChange={onSerializedChange}
                                        allowClear
                                        showSearch
                                        optionFilterProp="children"
                                    >
                                        {
                                            ['YES', 'NO'].map(serialized => {
                                                return <Option value={serialized} key={serialized}>{serialized}</Option>
                                            })
                                        }
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name="mapprice"
                                    label="Map Price"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input onChange={onMapPriceChange} />
                                </Form.Item>
                                <Form.Item
                                    name="allowdirectship"
                                    label="Allow Direct Ship"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Select
                                        placeholder="Select A Allow Direct Ship"
                                        onChange={onAllowdirectshipChange}
                                        allowClear
                                        showSearch
                                        optionFilterProp="children"
                                    >
                                        {
                                            ['YES', 'NO'].map(ads => {
                                                return <Option value={ads} key={ads}>{ads}</Option>
                                            })
                                        }
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name="maineachprice"
                                    label="Main Each Price"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input onChange={onMainEachPriceChange} />
                                </Form.Item>
                                <Form.Item
                                    name="imagelink"
                                    label="Image Link"
                                    rules={[
                                        {
                                            required: false,
                                        },
                                    ]}
                                >
                                    <Input onChange={onImageLinkChange} />
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
                            dataSource={products}
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

export default Products;
