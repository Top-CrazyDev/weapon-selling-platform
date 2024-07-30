import React, { useEffect, useState, useContext } from "react";
import { useParams } from 'react-router-dom';
import apis from '../../api';
import ZanderCard from '../../components/ui/ZanderCard';
import LipseyCard from '../../components/ui/LipseyCard';
import PersonalizedRecommendations from "../Components/PersonalizedRecommendations";
import UserContext from "../../utils/UserContext";

const productList = {
    margin: '40px auto 40px auto',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    gap: '20px'
}

const Search = () => {
    const { category, searchkey } = useParams();
    const [products, setProducts] = useState([]);
    const [pageCnt, setPageCnt] = useState(2);
    const { setSpinning, customerId } = useContext(UserContext);

    useEffect(async () => {
        setSpinning(true)
        const res = await apis.getProductsBySearch({
            category: category,
            searchkey: searchkey,
            limit: 1
        });

        setProducts(res.data.result)
        setSpinning(false)
    }, [category, searchkey]);

    const loadMoreProducts = async () => {
        setSpinning(true)
        const res = await apis.getProductsBySearch({
            category: category,
            searchkey: searchkey,
            limit: pageCnt
        });
        setSpinning(false)
        const productTmp = [...products, ...res.data.result];
        setProducts(productTmp);
        let cntIncrease = pageCnt + 1;
        setPageCnt(cntIncrease)
    }

    // page log
    useEffect(() => {
        const pageLog = async () => {
            let page = "/search"
            if(category && category !== "") {
                page += "/" + category;

                if(searchkey && searchkey !== "") {
                    page += "/" + searchkey;
                }
            }
            await apis.addPageLog({
                customerId,
                page: page
            })
        }

        pageLog()
    }, [customerId])

    return (
        <div className="search">
            <div style={{ maxWidth: '1440px', margin: '40px auto' }}>
                <div style={{paddingLeft: '20px'}}>
                    Search Result by <strong>{category}, {searchkey}</strong>
                </div>
                <div className='product-list' style={productList}>
                    {
                        products.length !== 0 && products.map(p => {
                            return p.isZander && <ZanderCard key={p._id} product={p} />
                        })
                    }
                    {
                        products.length !== 0 && products.map(p => {
                            return p.isLipsey && <LipseyCard key={p._id} product={p} />
                        })
                    }
                    {
                        products.length === 0 && <div style={{marginLeft: '5px'}}>No products matched</div>
                    }
                </div>
                {
                    products.length > 7 && <div className="see-more-products" onClick={loadMoreProducts}>
                        <a>See More...</a>
                    </div>
                }
            </div>
            <PersonalizedRecommendations />
        </div>
    );
}

export default Search;