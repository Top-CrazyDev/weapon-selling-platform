const router = require("express").Router();
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

router.post("/tokenIsValid", async (req, res) => {
	try {
		const token = req.header("x-auth-token");
		if (!token) return res.json(false);

		const verified = jwt.verify(token, "aotactical");
		if (!verified) return res.json(false);

		if(verified.id == 0) {
			return res.json(true);
		}else{
			const user = await User.findById(verified.id);
			if (!user) return res.json(false);

			return res.json(true);
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.post("/getUser", auth, async (req, res) => {
	if(req.user != 0) {
		const user = await User.findById(req.user);
		res.status(200).json({
			fullName: user.fullName,
			id: user._id,
		});
	}else{
		res.status(200).json({
			fullName: "AO Tactical Admin",
			id: 0,
		});
	}
});

router.post("/getUserInfo", auth, async (req, res) => {
	const user = await User.findById(req.user);
	res.status(200).json({
		fullName: user.fullName,
		username: user.username,
		email: user.email,
		phone: user.phone,
		address: user.address,
		otp: user.isOtp,
		address2: user.address2,
		zipCode: user.zipCode,
		city: user.city,
		country: user.country,
		state: user.state
	});
});

router.post("/updateAccountInfo", auth, async (req, res) => {
	try {
		if(req.body.password) {
			const salt = await bcrypt.genSalt();
			const passwordHash = await bcrypt.hash(req.body.password, salt);
			req.body.password = passwordHash;
			await User.findOneAndUpdate({_id: req.user}, req.body);
			res.status(200).json({ success: true });
		}else{
			await User.findOneAndUpdate({_id: req.user}, req.body);
			res.status(200).json({ success: true });
		}
	} catch(e) {
		console.error(e)
	}
});

module.exports = router;
