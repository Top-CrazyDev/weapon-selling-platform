import React, { useState, useContext, useEffect } from "react";
import { Input, message, Button, Select } from 'antd';
import categories from '../../../utils/category';
import { useHistory } from 'react-router-dom';
import UserContext from "../../../utils/UserContext";
import apis from "../../../api";

const AdvancedSearch = () => {
    const { customerId } = useContext(UserContext);

    const history = useHistory()

    const [param, setParam] = useState({
        word: "",
        wordOption: "all",
        exclude: "",
        upc: "",
        fromPrice: null,
        toPrice: null,
        category: "all",
        sortBy: "most_relevant",
        itemPerPage: 24
    })

    const onSearchWordChange = (ev) => {
        setParam({...param, word: ev.target.value})
    }

    const onSearchWordOptionChange = (value) => {
        setParam({...param, wordOption: value})
    }

    const onExcludeWordChange = (ev) => {
        setParam({...param, exclude: ev.target.value})
    }

    const onUpcChange = (ev) => {
        setParam({...param, upc: ev.target.value})
    }

    const onFromPriceChange = (ev) => {
        setParam({...param, fromPrice: ev.target.value})
    }

    const onToPriceChange = (ev) => {
        setParam({...param, toPrice: ev.target.value})
    }

    const onCategoryChange = (value) => {
        setParam({...param, category: value})
    }

    const onSortByChange = (value) => {
        setParam({...param, sortBy: value})
    }

    const onItemPerPageChange = (value) => {
        setParam({...param, itemPerPage: value})
    }

    const onClearFields = () => {
        setParam({
            ...param,
            word: "",
            wordOption: "all",
            exclude: "",
            upc: "",
            fromPrice: null,
            toPrice: null,
            category: "all",
            sortBy: "most_relevant",
            itemPerPage: 24
        })
    }

    const search = () => {
        let route = "/advanced-search-result?"
        for (const key in param) {
            if(param[key] && param[key] != "")
                route += key + "=" + param[key] + '&'
        }
        history.push(route)
    }

    // page log
    useEffect(() => {
        const pageLog = async () => {
            await apis.addPageLog({
                customerId,
                page: '/advanced-search'
            })
        }

        pageLog()
    }, [customerId])
    
    return <div className="advanced-search">
        <h2 style={{color: '#006400'}}>Advanced Search</h2>
        <div className="search-box">
            <div className="action">
                <Button type="dashed" onClick={onClearFields}>Clear Fields</Button>
                <Button onClick={search}>Search</Button>
            </div>
            <div className="field">
                <div className="label">
                    <span>Search Words</span>
                </div>
                <div className="value">
                    <div className="input">
                        <Input onChange={onSearchWordChange} value={param.word} />
                    </div>
                    <div className="input">
                        <Select
                            defaultValue={'all'}
                            style={{
                                width: '100%',
                            }}
                            onChange={onSearchWordOptionChange}
                            options={[
                                {
                                    value: 'all',
                                    label: 'All of these words',
                                },
                                {
                                    value: 'any',
                                    label: 'Any of these words',
                                },
                                {
                                    value: 'exact',
                                    label: 'Exact Phrase',
                                }
                            ]}
                        />
                    </div>
                </div>
            </div>
            <div className="field">
                <div className="label">
                    <span>Words to Exclude</span>
                </div>
                <div className="input">
                    <Input onChange={onExcludeWordChange} value={param.exclude} />
                </div>
            </div>
            <div className="field">
                <div className="label">
                    <span>Search By UPC</span>
                </div>
                <div className="input">
                    <Input onChange={onUpcChange} value={param.upc} />
                </div>
            </div>
            <div className="field">
                <div className="label">
                    <span>Current Price</span>
                </div>
                <div className="value">
                    <div className="input">
                        <Input type="number" onChange={onFromPriceChange} value={param.fromPrice} />
                    </div>
                    <div>to</div>
                    <div className="input">
                        <Input type="number" onChange={onToPriceChange} value={param.toPrice} />
                    </div>
                </div>
            </div>
            <div className="field">
                <div className="label">
                    <span>Search Category</span>
                </div>
                <div className="input">
                    <Select
                        value={param.category}
                        style={{
                            width: '100%',
                        }}
                        onChange={onCategoryChange}
                        options={[{
                            label: 'All',
                            value: 'all'
                        }, ...categories]}
                    />
                </div>
            </div>
            <div className="field">
                <div className="label">
                    <span>Sort By</span>
                </div>
                <div className="input">
                    <Select
                        value={param.sortBy}
                        style={{
                            width: '100%',
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
            <div className="field">
                <div className="label">
                    <span>Items per Page</span>
                </div>
                <div className="input">
                    <Select
                        value={param.itemPerPage}
                        style={{
                            width: '100%',
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
            <div className="action">
                <Button type="dashed" onClick={onClearFields}>Clear Fields</Button>
                <Button onClick={search}>Search</Button>
            </div>
        </div>
    </div>
}

export default AdvancedSearch;