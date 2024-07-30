const router = require("express").Router();

router.post("/payment", async(req, res) =>{
    const paymentData = {
        amount: "500",
        currency: 'USD', // Adjust as needed
        card: {
            name:req.body.cardName,
            number: req.body.cardNumber,
            expireMonth: req.body.expireMonth, // Format: MMYY
            expireYear: req.body.expireYear,
            cvv: req.body.cardCVV,
        },
        // Add any other required fields according to Payroc's API documentation
    };
    try {
        const response = await axios.post(PAYROC_API_URL, paymentData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${PAYROC_API_KEY}`,
            },
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Payment error:', error);
        res.status(500).json({ error: error.message });
    }
});

const PAYROC_API_URL = 'https://api.uat.payroc.com/v1/payments';
const PAYROC_API_KEY = '05E5DB5F932B9200681A175FB870FA7ECF482AB85F64F1CF6E2F31BE09010D48F77B666FB4C25EA551719D398D7A549105F3FE3F36A89DB69EEA78BDDB79C5ED';


module.exports = router;