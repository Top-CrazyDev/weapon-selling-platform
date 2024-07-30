import React, { useEffect, useContext } from "react";
import apis from "../../api";
import UserContext from "../../utils/UserContext";

const ShippingPolicy = () => {
    const { customerId } = useContext(UserContext);

    // page log
    useEffect(() => {
        const pageLog = async () => {
            await apis.addPageLog({
                customerId,
                page: '/shipping-policy'
            })
        }

        pageLog()
    }, [customerId])
    
    return <div className="terms-page">
        <div>
            <h1>FIREARMS SHIPPING POLICY</h1>
            <p>EFFECTIVE: July 5, 2024</p>
            <p>This Privacy Notice and Policy (this “Policy”) describes how AO Tactical LLC and its subsidiaries and corporate affiliates, (collectively ”we”, “us”, “our”, or “AO Tactical LLC.”) collect and use personal information when you use, access, or respond to our websites as well as any online applications; mobile applications; e-mail; telephone inquiries; sweepstakes, contest and rebate submissions; product and warranty registrations; newsletters; forums; posts; comments; surveys; and the like; and the websites and applications maintained and operated by our third-party contractors (collectively, the “Services”); or when you visit our facilities and properties. Please note that special terms and conditions apply to individuals who are residents of the states of California or Virginia as indicated in Sections 10 and 11 of this Policy. As a result, certain provisions of this Policy may not apply to you.</p>

            <p>Below are some guidelines for shipping firearms and ammunition, along with notes related to specific shippers. We encourage you to review the specific shipper's web site as shippers have different guidelines.</p>

            <h3>You must ship to an FFL holder:</h3>
            <p>Federal law requires all modern firearms be shipped to a holder of a valid Federal Firearms License (FFL). Any person who is legally allowed to own a firearm is legally allowed to ship it to an FFL holder for any legal purpose (including sale or resale).
            </p>
            <p>
            Here is what the ATF "Federal Firearms Regulations Reference Guide"' (ATF P 5300.4) says:
            </p>

            <div style={{border: '1px solid #ccc', backgroundColor: '#fcffc9', padding: '1em'}}>
                <h3>(B9) May a nonlicensee ship a firearm by carrier?</h3>
                A nonlicensee may ship a firearm by carrier to a resident of his or her own state or to a licensee in any state. A common or contract carrier must be used to ship a handgun. In addition, Federal law requires that the carrier be notified that the shipment contains a firearm and prohibits common or contract carriers from requiring or causing any label to be placed on any package indicating that it contains a firearm.

                <small>[18 U.S.C. 922(a)(2)(A), 922(a) (3), 922(a)(5) and 922(e), 27 CFR 178.31, 27 CFR 478.31 and 478.30]</small>

                <h3>(B8) May a nonlicensee ship a firearm through the U. S. Postal Service?</h3>
                A nonlicensee may mail a shotgun or rifle to a resident of his or her own state or to a licensee in any state. Handguns are not mailable. A common or contract carrier must be used to ship a handgun. A nonlicensee may not transfer any firearm to a nonlicensed resident of another state. The Postal Service recommends that longguns be sent by registered mail and that no marking of any kind which would indicate the nature of the contents be placed on the outside of any parcel containing firearms.

                <small>[18 U.S.C. 1715, 922(a)(3), 922(a)(5) and 922 (a)(2)(A)]</small>
            </div>
            <p></p>

            <p>
            The section of the US Code governing modern firearms is called Commerce in Firearms and Ammunition (CFA). This code is available online: http://www.access.gpo.gov/nara/cfr/waisidx_09/27cfr478_09.html
            </p>
            <p>When in doubt, we suggest arranging for transfer through a licensed dealer. Violation of the CFA is a felony, and penalties for violation are severe.</p>

            <h3>If you do not have a Federal Firearms License:</h3>
            <p>Any shipper who does not have an FFL is considered to be an unlicensed person. Unlicensed persons must ship modern firearms to a licensed FFL dealer only. If the buyer is not licensed, they will need to make arrangements to have the item shipped to a licensed FFL dealer in their state.</p>

            <p>Before you ship a gun, the buyer must fax or mail you a copy of the dealer's signed FFL license. You can only ship the gun to the address on the license. You should take the copy of the signed FFL with you when you take the item to be shipped in case the shipper wants to see it.</p>

            <h3>Antique firearms:</h3>
            <p>Antique firearms need not be shipped to a licensed dealer. They can be shipped directly to the buyer.</p>

            <h3>Knives, air guns, accessories, and most gun parts:</h3>
            <p>These items need not be shipped to an FFL holder. Note, however, that each firearm contains at least one part the ATF considers a firearm, typically the part containing the serial number. This part must be treated as a complete firearm when shipping the item.</p>

            <h3>Ammunition:</h3>
            <p>
            Ammunition must be shipped separately from packages which contain firearms (including handguns). Special labeling is required. Some shippers treat ammunition as dangerous or hazardous materials. Guidelines vary by carrier, so please check directly with the carrier for specific details.
            </p>

            <h3>Other rules:</h3>
            <ul>
                <li>You must inform the carrier the package contains a firearm. </li>
                <li>The firearm cannot be shipped loaded.</li>
                <li>Ammunition may not be shipped in the same box as the firearm.</li>
            </ul>
            
            <h3>Notes on specific shippers:</h3>
            <p>Specific shippers, such as US Mail, FedEx, and UPS, have different rules related to firearms and ammunition. Please review their websites for guidelines about shipping firearms and ammunition.</p>

            <h3>UPS:</h3>
            <ul>
                <li>UPS will accept handgun shipments by Next Day Air only.</li>
                <li>Rifles and shotguns can be shipped by UPS ground service.</li>
                <li>UPS will accept shipments of ammunition. Special labeling is required.</li>
            </ul>

            <h3>US Mail - unlicensed persons:</h3>
            <ul>
                <li>
                Unlicensed persons can ship a rifle or shotgun by US Mail.
                </li>
                <li>
                Unlicensed persons cannot ship a handgun by US Mail. Pistols, revolvers, and other firearms capable of being concealed on the person (for example, short-barreled shotguns and short-barreled rifles) are defined as handguns.
                </li>
                <li>
                Postal regulations allow the Post Office to open your package for inspection.
                </li>
                <li>
                Ammunition cannot be shipped by US Mail.
                </li>
            </ul>

            <p>You can search the US Post Office Postal Explorer site for specific USPS regulations regarding firearms and ammunition (Hazardous, Restricted and Perishable Matter).</p>

            <h3>US Mail - licensed persons:</h3>
            <ul>
                <li>Licensed persons can ship rifles, shotguns, or handguns by US Mail. In fact, we suggest you use the USPS, as it is now the most cost-effective way to ship a handgun.</li>
                <li>To ship a rifle or shotgun, you need only inform the Post Office the package contains a firearm.</li>
                <li>A licensed manufacturer, dealer, or importer can ship a handgun via the US Post Office if the licensed dealer fills out a US Post Office Form PS 1508 and files it with the local Post Office branch where the handgun is to be shipped.</li>
            </ul>
            <p>You can search the US Post Office Postal Explorer site for specific USPS regulations.</p>

            <h3>FedEx - licensed persons:</h3>
            <ul>
                <li>FedEx will allow a licensed person to ship firearms. Contact the carrier for details and to arrange shipment.</li>
            </ul>

            <h3>FedEx - unlicensed persons:</h3>
            <ul>
                <li>FedEx will not allow an unlicensed person to ship a firearm. </li>
            </ul>

            <h3>Most other shippers:</h3>
            <p>Most other shippers will no longer accept firearm shipments. Airborne and Roadway have specifically prohibited firearm shipments.</p>

            <h3>Notes on USPS Firearm Regulations:</h3>
            <p>We recommend you read the Post Office regulations on Hazardous, Restricted and Perishable Matter before shipping a firearm through the US Mail.</p>
            <p>The following info comes from the USPS Regulation DMM Issue 54, January 10, 1999, section C-024:</p>
            <div style={{border: '1px solid #ccc', backgroundColor: '#fcffc9', padding: '1em'}}>
                <p>Page C-39, section 3.0, Rifles and Shotguns: "Although unloaded rifles and shotguns not precluded by 1.1e and 1.2 are mailable, mailers must comply with the Gun Control Act or 1968, Public Law 90-618, 18 USC 921, et seq., and the rules and regulations promulgated there under, 27 CFR 178, as well as state and local laws. The mailer may be required by the USPS to establish, by opening the parcel or by written certification, that the gun is unloaded and not precluded by 1.1e."</p>

                <p>Page C-39, section 6.0, PROHIBITED PARCEL MARKING: "For any parcel containing a firearm or a ballistic or switchblade knife, any marking that indicates the contents is not permitted on the outside wrapper or container."</p>

                <h3>The following pertains only to licensed dealers shipping handguns:</h3>
                <p>Page C-37, section 1.3, Authorized Persons: "Subject to 1.4, handguns may be mailed by a licensed manufacturer of firearms, a licensed dealer of firearms, or an authorized agent of the federal government......."</p>
                <p>Page C-38, section 1.5, Manufacturers and Dealers: "Handguns may also be mailed between licensed manufacturers of firearms and licensed dealers of firearms in customary trade shipments, or for repairing or replacing parts."</p>
                <p>Page C-38, section 1.6, Certificate of Manufacturers and Dealers: "A licensed manufacturer or dealer need not file the affidavit under 1.4, but must file with the postmaster a statement on Form 1508 signed by the mailer that he or she is a licensed manufacturer or dealer of firearms, that the parcels containing handguns (or major components thereof) are customary trade shipments or contain such articles for repairing or replacing parts, and that to the best of his or her knowledge or belief the addressees are licensed manufacturers or dealers of firearms."</p>
            </div>
        </div>
    </div>
}

export default ShippingPolicy;