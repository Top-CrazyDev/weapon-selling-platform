const router = require("express").Router();
const VisitLog = require("../models/visitLogModel");

router.post("/trackCustomer", async (req, res) => {
	try {
        // const { page } = req.body;

        // const visitLog = new VisitLog({
        //     ip,
        //     userAgent,
        //     page
        // });
        // await visitLog.save()
        res.status(200).json({ message: "Visit logged successfully."})
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;
