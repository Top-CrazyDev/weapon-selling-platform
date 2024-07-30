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

const MyRecent = () => {
    const [products, setProducts] = useState([]);
    const { setSpinning, customerId } = useContext(UserContext);

    useEffect(async () => {
        setSpinning(true)
        const res = await apis.getRecentForCustomer({
            id: customerId
        });
        if(res.data.result.length > 0)
            setProducts(res.data.result)

        setSpinning(false)

        const pageLog = async () => {
            await apis.addPageLog({
                customerId,
                page: '/my-recent'
            })
        }
        pageLog()
    }, [customerId]);

    // useEffect(() => {
    //     console.log("products:", products)
    // }, [products])

    return (
        <div className="search">
            <div style={{ maxWidth: '1440px', margin: '40px auto' }}>
                <div style={{paddingLeft: '20px'}}>
                    
                </div>
                <div className='product-list' style={productList}>
                    {/* {
                        products.length !== 0 && products.map(p => {
                            return <ZanderCard key={p._id} product={p} />
                            // if(p.isZander) 
                            //     return <ZanderCard key={p._id} product={p} />
                            // if(p.isLipsey) 
                            //     return <LipseyCard key={p._id} product={p} />
                        })
                    } */}
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
                        products.length === 0 && <div style={{marginLeft: '5px'}}>No Recently Viewed Products</div>
                    }
                </div>
            </div>
            <PersonalizedRecommendations />
        </div>
    );
}

export default MyRecent;