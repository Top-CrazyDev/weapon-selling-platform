import React, { useEffect, useContext } from "react";
import apis from "../../api";
import UserContext from "../../utils/UserContext";

const ReturnPolicy = () => {
    const { customerId } = useContext(UserContext);

    // page log
    useEffect(() => {
        const pageLog = async () => {
            await apis.addPageLog({
                customerId,
                page: '/return-policy'
            })
        }

        pageLog()
    }, [customerId])
    
    return <div className="terms-page">
        <div>
            <h1>RETURN POLICY</h1>
            <p>EFFECTIVE: July 5, 2024</p>

            <p>All items listed on aotactical.com are considered as-is/no return, unless the seller specifically states otherwise in the listing. The item should be returned in the same package as it was sent unless the item was damaged in shipping. (See Item Damaged in Shipping.)
            </p>
            <p>
            If the seller accepts return of the item, they can submit an “Item Returned” credit request to recover their fees.</p>

            <h3>Item Damaged in Shipping</h3>
            <p>
            The seller is responsible for making sure an item is delivered to a buyer. If the item is lost or damaged in shipping, the seller is responsible for refunding the buyer’s payment, whether or not the item was insured. We strongly recommend sellers insure all packages with the carrier. 
            </p>
            <p>
            Buyers should immediately report to the seller and the shipping company any damage to the package. It is important to keep all original packaging, including cartons and contents, until the issue is resolved. The shipper may need it for inspection. Different shipping companies have different claims procedures, including time limits for filing claims. 
            </p>
            <p>
            For specific shipper information, see:
            </p>
            <p>
            USPS: <a href="https://www.usps.com/help/claims.htm">https://www.usps.com/help/claims.htm</a>
            </p>
            <p>
            UPS: <a href="https://wwwapps.ups.com/webClaims/create?loc=en_US&report_type=1&WT.svl=PNRO_L1">https://wwwapps.ups.com/webClaims/create?loc=en_US&report_type=1&WT.svl=PNRO_L1</a>
            </p>
            <p>
            FedEx: <a href="http://www.fedex.com/us/fcl/pckgenvlp/online-claims/index.html">http://www.fedex.com/us/fcl/pckgenvlp/online-claims/index.html</a>
            </p>
        </div>
    </div>
}

export default ReturnPolicy;