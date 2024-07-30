import React, { useEffect, useContext } from "react";
import apis from "../../api";
import UserContext from "../../utils/UserContext";

const PrivacyPolicy = () => {
    const { customerId } = useContext(UserContext);

    // page log
    useEffect(() => {
        const pageLog = async () => {
            await apis.addPageLog({
                customerId,
                page: '/privacy-policy'
            })
        }

        pageLog()
    }, [customerId])
    
    return <div className="terms-page">
        <div>
            <h1>PRIVACY POLICY</h1>
            <p>EFFECTIVE: July 5, 2024</p>
            <p>This Privacy Notice and Policy (this “Policy”) describes how AO Tactical LLC and its subsidiaries and corporate affiliates, (collectively ”we”, “us”, “our”, or “AO Tactical LLC.”) collect and use personal information when you use, access, or respond to our websites as well as any online applications; mobile applications; e-mail; telephone inquiries; sweepstakes, contest and rebate submissions; product and warranty registrations; newsletters; forums; posts; comments; surveys; and the like; and the websites and applications maintained and operated by our third-party contractors (collectively, the “Services”); or when you visit our facilities and properties. Please note that special terms and conditions apply to individuals who are residents of the states of California or Virginia as indicated in Sections 10 and 11 of this Policy. As a result, certain provisions of this Policy may not apply to you.</p>
        </div>

        <div>
            <h2>1. INFORMATION WE COLLECT</h2>
            <p>Through your use of our Services or access to our facilities or properties we collect personal information, which is information that identifies you as an individual, relates to you as an identifiable individual, or that, along with other information, could identify you. In the preceding twelve months, we collected the following types of personal information:</p>

            <h3>(I) INFORMATION YOU PROVIDE TO US</h3>
            <p>We collect personal information from you when you use our Services. We do not require you to provide any personal information in order to navigate our websites. We collect information from you when (1) you provide it voluntarily to us in response to a request for such information, and (2) automatically by means which are part of the applications needed to provide the Services to you. For example, we may request your identifiers, such as: your name, age (birthdate), gender, company name, mailing and billing addresses, e-mail addresses, phone numbers, and zip codes.  We also collect financial information such as credit card information.  We collect commercial information including products or services purchased, obtained, or considered, and purchasing or consuming histories or tendencies. We may also collect other information that you submit in connection with our Services, including product reviews, sweepstakes or contest entries, consumer rebate submissions, product or warranty registration, and other similar information. Information obtained automatically through application usage consists primarily of anonymous usage statistics, but also includes first- and third-party “Cookies” (as defined hereafter). For proper functionality of the Services, a minimum of anonymous usage data and first-party Cookies are required to be collected.</p>

            <p>We collect personal information from you when you access our facilities or properties.  We require visitors to our facilities and properties to provide a valid, government-issued photo identification document. Such documents will include your likeness (photograph), and may also include your name, age (birthdate), gender, mailing address, business address, employer, identification number (such as license or passport number), biographical information (such as height, weight, eye color, hair color, fingerprints, etc.), and signature. We also require visitors to read and sign a Visitor Certification.</p>

            <h3>(II)INFORMATION WE GET FROM THIRD PARTIES</h3>
            <p>We use third-party contractors (which includes, for example, service providers, licensees, and industry partners) to help us provide our Services.  As part of these activities we obtain information collected by our third-party contractors such as: website or application visitor activity, eCommerce conversions, sweepstakes or contest participation, campaign tracking, consumer rebate submissions, product or warranty registration, and other similar information.</p>
            <p>We may provide links to social media platforms such as Facebook and Instagram. These third-party applications may collect information about your IP address, and they may set Cookies for the purposes these third-party contractors have described in their privacy policies.  Your interaction with those applications is governed by the privacy policies of the companies that provide them, and not by this Policy.</p>

            <h3>(III) INFORMATION COLLECTED AUTOMATICALLY</h3>
            <p>We may, directly or indirectly (through a third party), collect internet or electronic network activity about you and your use of our Services whenever you use the Services.  For example, we may collect information about your IP address, your user behavior (e.g., click activity), Services traffic statistics, operating system, and browser type. This data generally does not personally identify you and is automatically collected (as third-party Cookies) when you use our Services. This anonymous information is helpful for marketing purposes and improving our Services.</p>

            <h3>(IV) COOKIES AND OTHER TRACKING TECHNOLOGIES</h3>
            <p>“Cookies” are small pieces of information that are stored by your web browser software on your computer’s hard drive or temporarily in your computer’s memory. We or our third-party providers place and store internet Cookies on your hard drive. Cookies can save any of the types of information noted above. Cookies enable us to personalize your viewing experience. When you revisit our website, we can recognize you by the Cookie and customize your experience at this website accordingly. We, and our third-party contractors, may use technology such as Cookies and web beacons/pixel tags to provide: e-commerce services within the application, advertising conversion analysis, marketing campaign analysis, user behavior and application usage analysis, user registration and authentication, and to provide a customized, more relevant user experience.</p>
        </div>

        <div>
            <h2>2. HOW WE USE YOUR INFORMATION</h2>
            <p>We use your personal information to provide the Services to you (including the marketing of our Services and products), to improve our Services and products, and to protect our legal rights. We limit the collection of personal information to that which is relevant for these purposes. For visitors to our facilities and properties, we use your personal information in accordance with our security procedures and facility access agreements, and to comply with applicable laws and regulations. We will not store, access, transmit, retain or otherwise use personal information in any way that is incompatible with the purposes for which it has been collected or stored as described in this Policy without your consent.</p>
            <p>We process your information for the following purposes as necessary to: provide the Services to you; to perform our contract with you; as part of our legitimate interest in the improvement and marketing of our Services and products, and in the security of our Services and facilities/properties. We apply appropriate safeguards to protect your information including as described <a href="#choice">SECURITY, CHOICES ABOUT YOUR INFORMATION</a> and <a href="#howlong">RIGHTS OF RESIDENTS IN THE EUROPEAN UNION (EU):</a></p>
            <ul>
                <li>Facilitate your orders.</li>
                <li>Communicate with you: to communicate with you about our Services (including the notifications that are part of our Services); to send you account updates or other communications regarding your account or to inform you of any changes to our Services; to send you notifications or communications about new features or information available regarding our Services or products, or that we feel might be of interest to you, such as news, legislative alerts, marketing and promotional materials or offers (including, for example, promotional materials and offers from industry partners, our third-party contractors, or programs or offers where we are a co-sponsor), surveys, and the like.  You can opt-out by following the opt-out instructions provided in our communications to you.</li>
                <li>Provide Customer Support: to provide you support or other services you request. For example, we may need your information in order to provide technical support or answer questions about our Services and products.</li>
                <li>To maintain and improve our Services: We analyze how our users interact with our Services in order to maintain and improve our Services. We also use information that we collect to diagnose any problems with our Services.</li>
                <li>Benchmarking: We aggregate your information in order to gain insights into our Services.</li>
            </ul>
            <p>In our processing of your information, we also share your personal information to defend our rights and the rights of others, to efficiently maintain our business, and to comply with the law as described in this Policy.</p>
        </div>

        <div>
            <h2>3. HOW WE SHARE INFORMATION</h2>
            <p>We may share your information for a variety of purposes, including: with our third-party contractors; among our subsidiaries and corporate affiliates; in connection with a corporate restructuring; to prevent harm; to comply with the law; and to protect our legal rights. The legal basis for this is our legitimate interest in providing our Services, complying with the law, and protecting our rights and those of others. We apply appropriate safeguards for this sharing of your information including as described below and in <a href="#choice">SECURITY, CHOICES ABOUT YOUR INFORMATION</a>, and <a href="#howlong">RIGHTS OF RESIDENTS IN THE EUROPEAN UNION (EU)</a>.</p>
            <ul>
                <li>
                    <strong>Third-Party Contractors:</strong> We share information with third-party contractors that help us perform functions related to our Services and process your transactions, including, but not limited to conducting product reviews or surveys, administering sweepstakes or contests, processing consumer rebate submissions, processing product or warranty registrations, placing orders, delivering packages, analyzing and maintaining data, and other similar functions.  These third-party contractors will only use your personal information for the purposes required to perform their functions.
                </li>
                <li>
                    <strong>Marketing</strong>: We may share your anonymous marketing information with Internet search engines (e.g., Google Analytics) and social media platforms (e.g., Facebook and Instagram) for re-marketing purposes.
                </li>
                <li>
                    <strong>Corporate Structure</strong>: We would share information if we are involved or intend to be involved in a merger, acquisition, consolidation, change of control, or sale of all or a portion of our assets or in connection with bankruptcy or liquidation proceedings.
                </li>
                <li>
                    <strong>To Prevent Harm</strong>: We may share information if we believe it is necessary in order to detect, investigate, prevent, or take action against illegal activities, fraud, or situations involving potential threats to the rights, property, or personal safety of any person.
                </li>
                <li>
                    <strong>To Protect Our Rights and As Required by Law</strong>: We will share information where we are legally required to do so, such as in response to court orders or legal process, to exercise our legal rights, to defend against legal claims or demands, or to comply with the requirements of any mandatory applicable law. We will also share information as necessary to enforce the Terms and any other terms that you have agreed to, including to protect the rights, property, or safety of AO Tactical LLC., its users, or any other person, or the copyright-protected content of the Services.
                </li>
                <li>
                    <strong>Ensure authorized visitors to our facilities and properties are properly screened in accordance with our security procedures, facilities access agreements, and applicable law.</strong>
                </li>
                <li>
                    <strong>With your consent</strong>: We will request your permission to use or share your personal information for a specific purpose that is not compatible with the purposes listed here. We will notify you and request consent before you provide the personal information or before the personal information you have already provided is shared for such purpose.
                </li>
            </ul>
        </div>

        <div>
            <h2>4. SECURITY</h2>
            <p>
            The security of your personal information is important to us. We maintain reasonable physical, technical, and administrative security measures to protect and limit access to your personal information. No method of transmission over the Internet or electronic storage technology is 100% secure. Therefore, while we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
            </p>
        </div>

        <div id="choice">
            <h2>5. CHOICES ABOUT YOUR INFORMATION</h2>
            <h3>(I) ACCESS, CORRECT OR DELETE YOUR INFORMATION</h3>
            <p>
            You may use your account to access or correct the information you provided to us and which is associated with your account by contacting us by mail at AO Tactical LLC. 7811 W Sinclair Street West Baden Springs, IN 47469, U.S.A., or by emailing us at <a href="mailto:admin@aotactical.com">admin@aotactical.com</a>. Please include your name, mailing address and e-mail address when you contact us. You must describe the information that you want to access, remove, correct, or modify in sufficient detail to allow us to locate that information in our records. We may require you to verify your identity before allowing you to access, remove, correct, or modify your Personally Identifiable Information. Please note that a request to remove or modify information may prevent us from providing certain products or services to you. We will not remove or modify information associated with your prior purchase or registration of a product.
            </p>
            <p>
            Even if you terminate your account, keep in mind that deletion of your personal information by our third-party contractors may not be immediate and that deleted personal information may persist in backup copies for a reasonable period of time and as required by applicable laws and regulations. See: <a href="#howlong">HOW LONG DO WE KEEP YOUR INFORMATION</a>. In the event that we refuse a request under rights of access, we will provide the individual with a reason as to why. Individuals residing in the EU, or in the states of California or Virginia, also have the rights described in <a href="#howlong">RIGHTS OF RESIDENTS IN THE EUROPEAN UNION (EU)</a>.
            </p>

            <h3>
            (II) DO NOT TRACK
            </h3>
            <p>
                We take no action in response to “Do Not Track” requests received from user’s web browsing software.
            </p>

            <h3>(III) COOKIES AND ADVERTISING COOKIES:</h3>
            <p>If you would like to opt out of accepting Cookies altogether, you can either (a) select the “I do not accept Cookies” option on the bar which loads upon your initial visit to our website or mobile app or (b) generally, you may set your browser to not accept Cookies or to notify you when you are sent a Cookie, giving you the chance to decide whether or not to accept it. Please note that certain functions of our websites may not function properly if your web browser does not accept Cookies or if you choose not to accept Cookies. If you choose to opt out, we will place an “Opt-out Cookie” on your computer. The Opt-out Cookie is browser specific and device specific and only lasts until Cookies are cleared from your browser or device. The Opt-out Cookie will not work for Essential Cookies that are important to how our websites and mobile apps work. If the Cookie is removed or deleted, if you upgrade your browser or if you visit us from a different computer, you will need to return and update your preferences.</p>

            <p>
            AO Tactical uses Cookies to collect information around abandoned shopping carts. A cart is considered abandoned within one hour of inactivity/lack of purchase. Once the cart is considered abandoned, a short message service (“SMS”) message (otherwise known as a “text message”) will be sent reminding you that the cart is considered abandoned and is subject to its contents being deleted.
            </p>

            <p>
            <strong>Marketing</strong>: If you do not want us to share your information for marketing purposes, or want additional information about our disclosures of certain categories of your information to third parties for marketing purposes, requests may be submitted by mail at AO Tactical LLC., 7811 W Sinclair Street West Baden Springs, IN 47469, U.S.A., or by email at <a href="mailto:admin@aotactical.com">admin@aotactical.com</a>. Within thirty (30) days of receiving such a request, your name will be removed off of our marketing list and/or we will provide a list of the categories of Personally Identifiable Information disclosed to third parties for third-party direct marketing purposes during the immediately preceding calendar year, along with the names and addresses of these third parties. Except as may otherwise be provided in this Policy as similar rights pertain to residents of certain states, this request may be made by a user no more than once per calendar year.
            </p>
        </div>

        <div id="howlong">
            <h2>6. HOW LONG DO WE KEEP YOUR INFORMATION</h2>
            <p>
            We will retain your personal information as long as necessary for the fulfillment of the purposes contained in this Policy, in accordance with our records retention policies, and in accordance with applicable laws and regulations. For visitors to our facilities and properties, we will retain an image of your government-issued photo identification for up to ninety (90) days from the date of your visit. Notwithstanding the foregoing, we will retain your personal information for longer periods for specific purposes to the extent that we are obliged to do so in order to comply with applicable laws and regulations, court orders, and/or as necessary to protect our legal rights or for certain business requirements. For example, when we process your payments, we will retain this data for longer periods of time as required for tax or accounting purposes. More specifically, we will retain some information for longer periods of time for the following reasons:
            </p>
            <ul>
                <li>
                    <strong>Security, fraud & abuse prevention</strong>: i.e. to protect you, other people, and us from fraud, abuse, and unauthorized access.
                </li>
                <li>
                    <strong>Financial record-keeping</strong>: When you make a payment to us we are often required to retain this information for extended periods of time for purposes of accounting, dispute resolution, and compliance with tax, anti-money laundering, and other financial regulations.
                </li>
                <li>
                    <strong>Complying with legal or regulatory requirements</strong>: To meet any applicable law, regulation, legal process, valid court order, valid law enforcement or governmental request, as required to enforce our terms of service, or as necessary to investigate security incidents and other violations.
                </li>
                <li>
                    <strong>Direct communications with us</strong>: If you have directly communicated with us, through a customer support channel, feedback form, or a bug report, we may retain reasonable records of those communications.
                </li>
            </ul>
            <p>Even if you delete your account, keep in mind that the deletion by our third-party contractors may not be immediate and that the deleted information may persist in backup copies for a reasonable period of time.</p>
        </div>

        <div>
            <h2>7. CROSS BORDER TRANSFERS OF INFORMATION</h2>
            <p>We may transfer your personal information to a jurisdiction outside the country where you reside, including processing personal information in the United States of America.  Because not all jurisdictions may require the same levels of privacy protection as your jurisdiction of residence, your use of the Services constitutes your agreement to transfer your personal information. Even where we do make such transfers, the rights and obligations under this Policy will remain applicable to your personal information, except where prohibited by local law.</p>
        </div>

        <div id="rights">
            <h2>8. RIGHTS OF RESIDENTS OF THE EUROPEAN UNION (EU)</h2>
            <p>If EU data protection laws apply to the processing of your data, we will be the data controller and you would be entitled by law to access, correct, amend, or delete personal information about you that we hold. A list of these rights is below. Please note that these rights are not absolute and certain exemptions apply. To exercise these rights please contact us by mail at AO Tactical LLC., 7811 W Sinclair Street West Baden Springs, IN 47469, U.S.A., or by email at <a href="mailto:admin@aotactical.com">admin@aotactical.com</a>. For your protection, we may need to verify your identity before responding to your request, such as verifying that the email address from which you send the request matches your email address that we have on file. In the event that we refuse a request under rights of access, we will provide you a reason as to why.</p>
            <ul>
                <li>
                    <strong>The right to access</strong>: You have the right to ask us for copies of your personal information. This right has some exemptions, which means you may not always receive all the information we process. When making a request, please provide an accurate description of the data you want access to.
                </li>
                <li>
                    <strong>The right to rectification</strong>: You have the right to ask us to rectify information you think is inaccurate. You also have the right to ask us to complete information you think is incomplete.
                </li>
                <li>
                    <strong>The right to erasure</strong>: You have the right to ask us to erase your personal information in certain circumstances, including (i) when your personal information is no longer necessary for the purposes for which it was collected or processed or (ii) your information must be erased to comply with a legal obligation in EU Union or Member State law.
                </li>
                <li>
                    <strong>The right to restrict processing</strong>: You have the right to ask us to restrict the processing of your information in certain circumstances, including (i) when the accuracy of the information is brought into question or (ii) when we no longer need the information for purposes of the processing but you require such information for the establishment, exercise, or defense of a legal claim. See <a href="#choice">CHOICES ABOUT YOUR INFORMATION</a> for some ways you can restrict processing.
                </li>
                <li>
                    <strong>The right to object to processing</strong>: You have the right to object to processing if we are able to process your information because the process is in our legitimate interests. See <a href="#choice">CHOICES ABOUT YOUR INFORMATION</a> for some ways you can object to processing.
                </li>
                <li>
                    <strong>The right to data portability</strong>: This only applies to information you have given us. You have the right to ask that we transfer the information you gave us from one organization to another, or give it to you.
                </li>
                <li>
                    <strong>The right to lodge a complaint with the supervisory authority.</strong>
                </li>
            </ul>
        </div>

        <div>
            <h2>9. CALIFORNIA PRIVACY RIGHTS</h2>
            <p>If you are a resident of the state California (a “California Consumer”), you have certain rights, including but not limited to the collection, use, correction, deletion. transfer, and processing of your “Personal Information”, as defined by the California Consumer Privacy Act of 2018 (and as amended by the California Privacy Rights Act of 2020) and any applicable implementing regulations (collectively the “CCPA”). Any capitalized terms not otherwise defined in this Section 9 of the Policy shall have the same meaning given to them in the CCPA. We reserve the right to limit these rights where permitted under applicable law, including where your identity cannot be reasonably verified or to the extent your rights adversely affect the rights and freedoms of others. To exercise any of the rights below, please contact us via the contact information below. Only you or a person that you authorize to act on your behalf, may make a verifiable consumer request related to your Personal Information.</p>

            <h3>A. OUR COLLECTION AND USE OF PERSONAL INFORMATION</h3>
            <p>You have the Right to Know what Personal Information we may have collected about you within any given 12-month period (for additional information about how to make a request of us, please see Section 9.C(I) of this Policy). As a general matter, within the 12-month period preceding the last update of this Policy, we may have collected the following categories of Personal Information about you:</p>

            <ul>
                <li>
                    <strong>Your Online Activity</strong>: While browsing our website, we may have collected information about you such as your internet and other network activity including but not limited to your browsing history, your search history, and your interaction with our applications, websites, and advertisements.
                </li>
                <li>
                    <strong>Your Identifiers</strong>: identifiers can include, but are not limited to, your real name, IP address, unique personal identifiers including but not limited to Cookies, beacons, device identifiers, pixel tags, and other such similar identifiers, and email address.
                </li>
            </ul>

            <p>We do not collect any Personal Information that would be considered Sensitive Personal Information under the CCPA.</p>

            <p>In the preceding twelve (12) months as of the last update to this Policy, we have not sold Personal Information about consumers; this includes, but is not limited to, Personal Information of minors under sixteen (16) years of age.</p>

            <p>In the preceding twelve (12) months as of the last update to this Policy, we may have used your Personal Information for any purposes specifically described on our website (including any associated apps and services) and for the following business purposes as specified in the CCPA:</p>

            <ul>
                <li>To better understand how our visitors use and interact with the AO Tactical LLC. websites and services;</li>
                <li>To enhance the online experience of our visitors;</li>
                <li>To provide you information pertaining to us;</li>
                <li>To perform services and associated analytics;</li>
                <li>To detect and resolve security incidents, protect against malicious, deceptive, fraudulent, or illegal activity, and associated legal prosecution; and</li>
                <li>To identify and repair errors that may impair website functionality and experience.</li>
            </ul>

            <h3>B. THIRD PARTY DISCLOSURE OF PERSONAL INFORMATION</h3>
            <p>In the preceding twelve (12) months as of the last update to this Policy, we may have disclosed your Personal Information as indicated below for those business purposes outlined in Section 9(A) above:</p>
            <hr></hr>
            <div style={{display: 'flex', justifyContent: 'space-between', gap: '20px'}}>
                <div>
                Third Party Categories
                </div>
                <div>Types of Personal Information</div>
            </div>
            <hr></hr>
            <div style={{display: 'flex', justifyContent: 'space-between', gap: '20px'}}>
                <div>
                Vendors, consultants, and others who provide services to you on our behalf
                </div>
                <div>Identifiers and Online Activity</div>
            </div>
            <hr></hr>
            <div style={{display: 'flex', justifyContent: 'space-between', gap: '20px'}}>
                <div>
                Data analytics providers, and data marketing service providers, third party web analytics providers
                </div>
                <div>Identifiers and Online Activity</div>
            </div>
            <br />
            <p>In addition to the above, we may also share your Personal Information as required pursuant to applicable governmental entity requests and law enforcement requests, or as otherwise may be required pursuant to applicable law or regulation.</p>

            <h3>
            C. CALIFORNIA CONSUMER INDIVIDUAL RIGHTS
            </h3>
            <h4>(I) RIGHTS TO ACCESS, CORRECTION, DELETION, AND OPT-OUT OF SALE OR SHARING</h4>
            <p>You have the right to request that we disclose the Personal Information we collect, use, and disclose about you to third parties, as well as other rights regarding the use, access, accuracy, and sharing of your information including:</p>

            <ul>
                <li><strong>Access</strong>: You have the right to request, twice in any given 12-month period, that we disclose to you any Personal Information that we may have collected, used, disclosed, and sold about you.</li>
                <li>
                    <strong>Correction</strong>: You have the right to request that we correct any inaccuracies within the Personal Information that we may have collected about you. We may, however, deny certain requests, or only partially fulfill a request if required pursuant to other legal rights and obligations we may have.
                </li>
                <li>
                    <strong>Deletion</strong>: You have the right to request that we delete Personal Information we may have collected from you, subject to applicable legal exceptions that may otherwise apply to us. We may, however, deny certain requests, or only partially fulfill a request if required pursuant to other legal rights and obligations we may have. We may take reasonable steps to verify your identity as described in the Policy, and request a confirmation from you prior to deleting your Personal Information.
                </li>
                <li>
                    <strong>Opt-Out of Sale or Sharing</strong>: You may also have to right to opt-out of the sale of your Personal Information or the sharing of your Personal Information for cross-context behavioral advertising; however, we do not sell or share Personal Information for cross-context advertising.
                </li>
            </ul>

            <h4>(II) SUBMITTING REQUESTS</h4>
            <p>
                You can submit a request by emailing us at <a href="mailto:admin@aotactical.com">admin@aotactical.com</a>.
            </p>

            <h4>(III) VERIFYING REQUESTS</h4>
            <p>We provide California Consumers with the ability to submit requests through our telephone number and our email address. We must verify that the person requesting information or deletion is the California Consumer about whom the request relates in order to process the request. To verify a California Consumer’s identity, we may request up to up to three pieces of Personal Information about you when you make a request to compare against our records. We cannot respond to your request or provide you with Personal Information if we cannot verify your identity. Making a verifiable consumer request does not require you to create an account with us. We will only use Personal Information provided in your request to verify your identity and will delete any information you provide after processing the request. We reserve the right to take additional steps as necessary to verify the identity of California Consumers where we have reason to believe a request is fraudulent.</p>

            <h4>(IV) AUTHORIZED AGENT</h4>
            <p>Consumers may use an authorized agent to submit their request. The authorized agent must be registered with the California Secretary of State and be authorized to submit requests on behalf of a consumer. If you are an authorized agent and a consumer has given you signed permission to submit a request on his or her behalf, please send a copy of your signed permission by the consumer to us. Failure to submit proof of signed permission may result in us denying the consumer’s request. We will require the consumer to verify his or her identity and directly confirm with us that the consumer has provided you with permission to submit the request.</p>

            <h4>(V) RIGHT TO EQUAL SERVICE</h4>
            <p>We will not discriminate against you because you exercised any of your rights, including, but not limited to, by:</p>
            <ul>
                <li>Denying goods or services to you.</li>
                <li>Charging different prices or rates for goods or services, including through the use of discounts or other benefits or imposing penalties.</li>
                <li>Providing a different level or quality of goods or services to you.</li>
                <li>Suggesting that you will receive a different price or rate for goods or services or a different level or quality of goods or services.</li>
            </ul>

            <h3>D. CALIFORNIA PRIVACY RIGHTS: SHINE THE LIGHT</h3>
            <p>Under California’s “Shine the Light” law, California residents who provide certain Personal Information in connection with obtaining products or services for personal, family or household use are entitled to request and obtain from us once a calendar year information about the customer information we shared, if any, with other businesses for their own direct marketing uses. If applicable, this information would include the categories of customer information and the names and addresses of those businesses with which we shared customer information for the immediately prior calendar year.</p>
            <p>To obtain this information please contact us at the information provided herein. We will provide the requested information to you pursuant to the contact information provided to us.</p>
            <p>Please be aware that not all information sharing is covered by the “Shine the Light” requirements and only information on covered sharing will be included in our response.</p>
        </div>

        <div>
            <h2>10. VIRGINIA PRIVACY RIGHTS</h2>
            <p>If you are a resident of the state Virginia (a “Virginia Consumer”), you have certain rights, including but not limited to the collection, use, correction, deletion. transfer, and processing of your personal data pursuant to the Virginia Consumer Data Protection Act of 2022 and any applicable implementing regulations (collectively the “VCDPA”). Any capitalized terms not otherwise defined in this Section 10 of the Policy shall have the same meaning given to them in the VCDPA.</p>

            <h3>A. OUR COLLECTION AND USE OF PERSONAL DATA</h3>
            <p>We may collect the following categories of personal data about you:</p>
            <ul>
                <li>
                    <strong>Your Online Activity</strong>: While browsing our website, we may have collected information about you such as your internet and other network activity including but not limited to your browsing history, your search history, and your interaction with our applications, websites, and advertisements.
                </li>
                <li>
                    <strong>Your Identifiers</strong>: identifiers can include, but are not limited to, your real name, IP address, unique personal identifiers including but not limited to Cookies, beacons, device identifiers, pixel tags, and other such similar identifiers, and email address.
                </li>
            </ul>
            <p>We do not collect any personal data that would be considered “sensitive” under the VCDPA.</p>
            <p>We may use your personal data for any purposes specifically described on our website (including any associated apps and services) and for the following business purposes:</p>
            <ul>
                <li>To better understand how our visitors use and interact with the AO Tactical LLC. websites and services;</li>
                <li>To enhance the online experience of our visitors;</li>
                <li>To provide you information pertaining to us;</li>
                <li>To perform services and associated analytics;</li>
                <li>To detect and resolve security incidents, protect against malicious, deceptive, fraudulent, or illegal activity, and associated legal prosecution; and</li>
                <li>To identify and repair errors that may impair website functionality and experience.</li>
            </ul>

            <h3>B. THIRD PARTY DISCLOSURE OF PERSONAL DATA</h3>
            <p>We may disclose your personal data as indicated below for those business purposes outlined in Section 10(A) above:</p>
            <hr></hr>
            <div style={{display: 'flex', justifyContent: 'space-between', gap: '20px'}}>
                <div>
                Third Party Categories
                </div>
                <div>Types of Personal Data</div>
            </div>
            <hr></hr>
            <div style={{display: 'flex', justifyContent: 'space-between', gap: '20px'}}>
                <div>
                Vendors, consultants, and others who provide services to you on our behalf
                </div>
                <div>Identifiers and Online Activity</div>
            </div>
            <hr></hr>
            <div style={{display: 'flex', justifyContent: 'space-between', gap: '20px'}}>
                <div>
                Data analytics providers, and data marketing service providers, third party web analytics providers
                </div>
                <div>Identifiers and Online Activity</div>
            </div>
            <br />
            <p>In addition to the above, we may also share your personal data as required pursuant to applicable governmental entity requests and law enforcement requests, or as otherwise may be required pursuant to applicable law or regulation.</p>

            <h3>C. VIRGINIA CONSUMER INDIVIDUAL RIGHTS</h3>
            <h4>(I) RIGHTS TO ACCESS, CORRECTION, DELETION, AND OPT-OUT OF SALE OR TARGETED ADVERTISING</h4>
            <p>You have the right to request that we disclose the personal data we collect, use, and disclose about you to third parties, as well as other rights regarding the use, access, accuracy, and sharing of your information including:</p>
            <ul>
                <li>Access: You may have the right to request the personal data that we may have collected, used, disclosed, and sold about you. If you request this information more than twice in any given twelve (12) month period, we may charge you a fee to answer your request.</li>
                <li>Correction: You have the right to request that we correct any inaccuracies within the personal data that we may have collected about you. We may, however, deny certain requests, or only partially fulfill a request if required pursuant to other legal rights and obligations we may have.</li>
                <li>Deletion: You have the right to request that we delete personal data we may have collected from you, subject to applicable legal exceptions that may otherwise apply to us. We may, however, deny certain requests, or only partially fulfill a request if required pursuant to other legal rights and obligations we may have. We may take reasonable steps to verify your identity as described in the Policy, and request a confirmation from you prior to deleting your Personal Data.</li>
                <li>Opt-Out of Sale: You may also have to right to opt-out of the sale of your personal data; however, we do not sell any personal data.</li>
                <li>Opt-Out of Targeted Advertising: You may also have to right to opt-out of the processing of your personal data for purposes of targeted advertising; however, we do not any personal data for targeted advertising.</li>
            </ul>

            <h4>(IV) SUBMITTING REQUESTS</h4>
            <p>You can submit a request by emailing us at <a href="mailto:admin@aotactical.com">admin@aotactical.com</a>.</p>

            <h4>(V) VERIFYING REQUESTS</h4>
            <p>We provide Virginia Consumers with the ability to submit requests through our telephone number and our email address. We must verify that the person requesting information or deletion is the Virginia Consumer about whom the request relates in order to process the request. To verify a Virginia Consumer’s identity, we may request up to three pieces of personal data about you when you make a request to compare against our records. We cannot respond to your request or provide you with personal data if we cannot verify your identity. Making a verifiable consumer request does not require you to create an account with us. We will only use personal data provided in your request to verify your identity and will delete any information you provide after processing the request. We reserve the right to take additional steps as necessary to verify the identity of Virginia Consumers where we have reason to believe a request is fraudulent.</p>

            <h4>(VI) AUTHORIZED AGENT</h4>
            <p>Virginia Consumers may use an authorized agent to submit their request. If you are an authorized agent and a Virginia Consumer has given you signed permission to submit a request on his or her behalf, please send a copy of your signed permission by the Virginia Consumer to us. Failure to submit proof of signed permission may result in us denying the Virginia Consumer’s request. We will require the Virginia Consumer to verify his or her identity and directly confirm with us that the consumer has provided you with permission to submit the request.</p>

            <h4>(VII) APPEALING REJECTED REQUESTS</h4>
            <p>If we reject your request, you will receive a notification with the reason or reasons for the request’s rejection and instructions of how to make an appeal. If you choose to make an appeal, it must be submitted within fifteen (15) days of your receipt of the rejection notice. We will then respond to your appeal within sixty (60) days of your having submitted it to us.</p>
        </div>

        <div>
            <h2>11. CHILDREN’S PRIVACY</h2>
            <p>Our websites and Services are not intended for use by children. We do not knowingly collect personal information from children under the age of sixteen (16) years. If we become aware that a child under sixteen (16) has provided us with personal information, we take steps to delete such personal information without undue delay. The use of our Services for purchases is intended for persons eighteen (18) years of age and older.</p>
        </div>

        <div>
            <h2>12. THIRD PARTY WEBSITE LINKS</h2>
            <p>This Policy applies solely to our Services. Our Services may contain links to websites owned or operated by third parties. Your use of third-party websites is done at your own risk and subject to any terms and conditions of use, privacy policies, and other practices or procedures for such websites. We are not responsible or liable for the content of or your use of any third-party websites that you may access through links on our Services.</p>
        </div>

        <div>
            <h2>13. CHANGES TO THIS PRIVACY POLICY</h2>
            <p>We may update or modify this Policy from time to time. We will post the changes to this page and will indicate the date they go into effect. We encourage you to review our Policy to stay informed. If we make changes that materially affect your privacy rights we will notify you of the changes by posting a prominent notice on our website or using other appropriate methods that we select, such as sending you an email.</p>
        </div>

        <div>
            <h2>14. CONTACT US</h2>
            <p>Any questions or concerns about the interpretation or operation of this Policy or about what may or may not be done with regard to your information should be directed to: AO Tactical LLC. 7811 W Sinclair Street West Baden Springs, IN 47469, U.S.A., or by emailing us at <a href="mailto:admin@aotactical.com">admin@aotactical.com</a>.</p>
        </div>
    </div>
}

export default PrivacyPolicy;