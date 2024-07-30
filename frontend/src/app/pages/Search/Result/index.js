import React, { useEffect, useState, useContext } from "react";
import {
    BrowserRouter as Router,
    useLocation,
    Link,
    useHistory
} from "react-router-dom"
import { RightSquareFilled, PlusCircleOutlined } from '@ant-design/icons';
import { Input, Radio, Button, Select, Pagination } from "antd";
import apis from "../../../api";
import ZanderCard from '../../../components/ui/ZanderCard';
import UserContext from "../../../utils/UserContext";

const productList = {
    margin: '40px auto 40px auto',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    gap: '20px'
}

const Result = () => {
    const { setSpinning, customerId } = useContext(UserContext);

    const history = useHistory();
    const location = useLocation()
    const queryParameters = new URLSearchParams(location.search)
    const word = queryParameters.get('word');
    const wordOption = queryParameters.get('wordOption');
    const exclude = queryParameters.get('exclude');
    const upc = queryParameters.get('upc');
    const fromPrice = queryParameters.get('fromPrice');
    const toPrice = queryParameters.get('toPrice');
    const category = queryParameters.get('category');
    const sortBy = queryParameters.get('sortBy');
    const itemPerPage = queryParameters.get('itemPerPage');

    const [type, setType] = useState(null);
    const [sort, setSort] = useState("most_relevant");
    const [productStatus, setProductStatus] = useState({
        fresh: false,
        used: false,
        old: false
    })
    const [itemPerPageValue, setItemPerPageValue] = useState(itemPerPage)
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [pageCnt, setPageCnt] = useState(10)
    const [products, setProducts] = useState([])
    const [fromPriceValue, setFromPriceValue] = useState(fromPrice)
    const [toPriceValue, setToPriceValue] = useState(toPrice)

    useEffect(() => {
        const getProductsByAdvancedSearch = async () => {
            setSpinning(true)
            const res = await apis.getProductsByAdvancedSearch({word, wordOption, exclude, upc, fromPrice, toPrice, category, sortBy, itemPerPage, page, type, ...productStatus})
            setProducts(res.data.result)
            setTotal(res.data.total)
            setSpinning(false)
        }
        getProductsByAdvancedSearch()
    }, [word, wordOption, exclude, upc, fromPrice, toPrice, category, sortBy, itemPerPage, type, productStatus.old, productStatus.fresh, productStatus.used, page, itemPerPageValue])

    const typeChange = ({ target: { value } }) => {
        setType(value)
    }

    const onSortByChange = (value) => {
        setSort(value)
    }

    const newProduct = () => {
        setProductStatus({
            ...productStatus,
            fresh: !productStatus.fresh
        })
    }

    const usedProduct = () => {
        setProductStatus({
            ...productStatus,
            used: !productStatus.used
        })
    }
    
    const oldProduct = () => {
        setProductStatus({
            ...productStatus,
            old: !productStatus.old
        })
    }

    const onItemPerPageChange = (value) => {
        setItemPerPageValue(value)

        const word = queryParameters.get('word');
        const wordOption = queryParameters.get('wordOption');
        const exclude = queryParameters.get('exclude');
        const upc = queryParameters.get('upc');
        const fromPrice = queryParameters.get('fromPrice');
        const toPrice = queryParameters.get('toPrice');
        const category = queryParameters.get('category');
        const sortBy = queryParameters.get('sortBy');

        let route = '/advanced-search-result?'
        if(word && word !== "")
            route += 'word' + "=" + word + '&'
        if(wordOption && wordOption !== "")
            route += 'wordOption' + "=" + wordOption + '&'
        if(exclude && exclude !== "")
            route += 'exclude' + "=" + exclude + '&'
        if(upc && upc !== "")
            route += 'upc' + "=" + upc + '&'
        if(fromPrice && fromPrice !== "")
            route += 'fromPrice' + "=" + fromPrice + '&'
        if(toPrice && toPrice !== "")
            route += 'toPrice' + "=" + toPrice + '&'
        if(category && category !== "")
            route += 'category' + "=" + category + '&'
        if(sortBy && sortBy !== "")
            route += 'sortBy' + "=" + sortBy + '&'
        if(value && value !== "")
            route += 'itemPerPage' + "=" + value + '&'

        history.push(route)
    }

    const pageChange = (page, size) => {
        setPage(page)
        setItemPerPageValue(size)
    }

    const onFromPriceChange = (ev) => {
        setFromPriceValue(ev.target.value)
    }

    const onToPriceChange = (ev) => {
        setToPriceValue(ev.target.value)
    }

    const onPriceChange = () => {
        const word = queryParameters.get('word');
        const wordOption = queryParameters.get('wordOption');
        const exclude = queryParameters.get('exclude');
        const upc = queryParameters.get('upc');
        const sortBy = queryParameters.get('sortBy');
        const itemPerPage = queryParameters.get('itemPerPage');

        let route = '/advanced-search-result?'
        if(word && word !== "")
            route += 'word' + "=" + word + '&'
        if(wordOption && wordOption !== "")
            route += 'wordOption' + "=" + wordOption + '&'
        if(exclude && exclude !== "")
            route += 'exclude' + "=" + exclude + '&'
        if(upc && upc !== "")
            route += 'upc' + "=" + upc + '&'
        if(fromPriceValue && fromPriceValue !== "")
            route += 'fromPrice' + "=" + fromPriceValue + '&'
        if(toPriceValue && toPriceValue !== "")
            route += 'toPrice' + "=" + toPriceValue + '&'
        if(category && category !== "")
            route += 'category' + "=" + category + '&'
        if(sortBy && sortBy !== "")
            route += 'sortBy' + "=" + sortBy + '&'
        if(itemPerPage && itemPerPage !== "")
            route += 'itemPerPage' + "=" + itemPerPage + '&'

        history.push(route)
    }

    // page log
    useEffect(() => {
        const pageLog = async () => {
            let route = '/advanced-search-result?'
            if(word && word !== "")
                route += 'word' + "=" + word + '&'
            if(wordOption && wordOption !== "")
                route += 'wordOption' + "=" + wordOption + '&'
            if(exclude && exclude !== "")
                route += 'exclude' + "=" + exclude + '&'
            if(upc && upc !== "")
                route += 'upc' + "=" + upc + '&'
            if(fromPrice && fromPrice !== "")
                route += 'fromPrice' + "=" + fromPrice + '&'
            if(toPrice && toPrice !== "")
                route += 'toPrice' + "=" + toPrice + '&'
            if(category && category !== "")
                route += 'category' + "=" + category + '&'
            if(sortBy && sortBy !== "")
                route += 'sortBy' + "=" + sortBy + '&'
            if(itemPerPage && itemPerPage !== "")
                route += 'itemPerPage' + "=" + itemPerPage + '&'
            
            await apis.addPageLog({
                customerId,
                page: route
            })
        }

        pageLog()
    }, [customerId])

    return <div className="advanced-search-result">
        <div className="sidebar-filter">
            <div className="title">
                <h4>Filters</h4>
                <a href="/advanced-search-result">Clear All</a>
            </div>
            <hr />
            <div className="price">
                <h5>Price Range</h5>
                <div className="price-form">
                    <span>$ </span>
                    <Input value={fromPriceValue} onChange={onFromPriceChange} />
                    <span> to </span>
                    <span> $ </span>
                    <Input value={toPriceValue} onChange={onToPriceChange} />
                    <RightSquareFilled onClick={onPriceChange} style={{ fontSize: '32px', cursor: 'pointer', color: '#006400' }} />
                </div>
            </div>
            {/* <hr />
            <div className="Categories">

            </div> */}
        </div>
        <div className="search-result">
            <div className="search-options">
                <div className="search-keys">
                    <div>
                        <div style={{ fontSize: '16px', color: '#555' }}>
                            {
                                word && category && (category != "All" && category != "all") ? `Results for ${word} in ${category}` : null 
                            }
                            {
                                !word && category && (category != "All" && category != "all") ? `Results for ${category}` : null 
                            }
                            {
                                word && (!category || category === "All" || category === "all") ? `Results for ${word}` : null 
                            }
                            {
                                !word && !category && products.length === 0 && <span>No results found or search too broad</span>
                            }
                        </div>
                        <div>
                            <a style={{ color: '#006400' }}>
                                <PlusCircleOutlined />
                                <span style={{ marginLeft: '4px' }}>
                                    Save this search
                                </span>
                            </a>
                            <span> | </span>
                            <span>{ products.length } Items Found</span>
                        </div>
                    </div>
                </div>
                <div className="search-key-buttons">
                    <div>
                        <Radio.Group options={[
                            {
                                label: 'Buy Now',
                                value: 'buynow',
                            },
                            {
                                label: 'Auctions',
                                value: 'auctions',
                            },
                            {
                                label: 'Take a Shot',
                                value: 'take_shot',
                            },
                        ]} onChange={typeChange} value={type} optionType="button" buttonStyle="solid" />
                    </div>
                    <div>
                        <Button onClick={newProduct} type={productStatus.fresh ? "primary" : ""}>New</Button>
                        <Button onClick={usedProduct} type={productStatus.used ? "primary" : ""}>Used</Button>
                        <Button onClick={oldProduct} type={productStatus.old ? "primary" : ""}>Old Stock</Button>
                    </div>
                    <div>
                        <Select
                            value={sort}
                            style={{
                                width: '200px',
                            }}
                            onChange={onSortByChange}
                            options={[
                                {
                                    value: 'most_relevant',
                                    label: 'Most Relevant First',
                                },
                                {
                                    value: 'time_ending_soonest',
                                    label: 'Time: Ending Soonest',
                                },
                                {
                                    value: 'time_ending_latest',
                                    label: 'Time: Ending Latest',
                                },
                                {
                                    value: 'price_low_high',
                                    label: 'Price: Low to High',
                                },
                                {
                                    value: 'price_high_low',
                                    label: 'Price: High to Low',
                                },
                                {
                                    value: 'bid_low_high',
                                    label: 'Bid Count: Low to High',
                                },
                                {
                                    value: 'bid_high_low',
                                    label: 'Bid Count: High to Low',
                                },
                                {
                                    value: 'time_old_new',
                                    label: 'Time: Oldest to Newest',
                                },
                                {
                                    value: 'time_new_old',
                                    label: 'Time: Newest to Oldest',
                                }
                            ]}
                        />
                    </div>
                </div>
            </div>
            <div className="searched-products">
                <div className="products">
                    {
                        products.length === 0 && <p>
                            There are <span style={{color: '#006400', fontWeight: 'bold'}}>0</span> items that match your criteria.
                            Please specify either a Keyword or a Category to perform this search. For more complex searches you may use the <Link style={{color: '#006400', fontWeight: 'bold'}} to="/advanced-search">Advanced Search</Link> function.
                        </p>
                    }
                    {
                        products.length !== 0 && <div className='product-list' style={productList}>
                            {
                                products.length !== 0 && products.map(p => {
                                    return <ZanderCard key={p._id} product={p} />
                                })
                            }
                        </div>
                    }
                </div>
                <hr />
                <div className="pagination">
                    <div>
                        <Pagination
                            total={total}
                            showTotal={(total) => `Total ${total} items`}
                            onChange={pageChange}
                            defaultCurrent={page}
                            defaultPageSize={itemPerPageValue}
                            pageSize={itemPerPageValue}
                            current={page}
                            style={{marginBottom: '20px', marginTop: '20px'}}
                        />
                    </div>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <span style={{marginRight: '10px'}}>
                            Results per page
                        </span>
                        <Select
                            value={itemPerPageValue}
                            style={{
                                width: '80px',
                            }}
                            onChange={onItemPerPageChange}
                            options={[
                                {
                                    value: 6,
                                    label: 6,
                                },
                                {
                                    value: 12,
                                    label: 12,
                                },
                                {
                                    value: 24,
                                    label: 24,
                                },
                                {
                                    value: 48,
                                    label: 48,
                                },
                                {
                                    value: 96,
                                    label: 96,
                                }
                            ]}
                        />
                    </div>
                </div>
            </div>
        </div>
        <div className="empty-sidebar"></div>
    </div>
}

export default Result;