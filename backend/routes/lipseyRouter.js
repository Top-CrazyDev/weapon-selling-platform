const router = require("express").Router();
const Lipsey = require("../models/lipseyModel");
const Zander = require("../models/zanderModel");
const axios = require('axios');

router.post("/upload", async (req, res) => {
    try {
        const response = await axios({
            method: 'post',
            url: 'https://api.lipseys.com/api/Integration/Authentication/Login',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                Email: 'joe@aotactical.com', 
                Password: 'loveJesus4ever'
            }
        })
        if(response.data?.token) {
            const result = await axios({
                method: 'get',
                url: 'https://api.lipseys.com/api/Integration/Items/CatalogFeed',
                headers: {
                    'Content-Type': 'application/json',
                    Token: response.data.token
                }
            })

            for(const d of result.data?.data) {
                const existing = await Lipsey.find({ itemNo: d.itemNo }).exec();

                if(existing.length == 0) {
                    const newLipsey = await new Lipsey({...d});
                    await newLipsey.save();
                }else{
                    await Lipsey.findOneAndUpdate({ itemNo: d.itemNo }, {...d});
                }

                const sameZander = await Zander.find({upc: d.upc}).exec();
                if(sameZander.length !== 0) {
                    await Lipsey.findOneAndUpdate({ itemNo: d.itemNo }, { isDuplicateWithZander: true });
                }
            }
        }

        return res
            .status(200)
            .json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;