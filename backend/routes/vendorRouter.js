const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../models/userModel");

router.post("/register", async (req, res) => {
	try {		
		let { email, password, passwordCheck, fullName, phone, address, fflNumber } = req.body;

		if (!email || !password || !passwordCheck || !fullName)
			return res.status(400).json({ msg: "Not all fields have been entered." });
		if (password.length < 5)
			return res
				.status(400)
				.json({ msg: "The password needs to be at least 5 characters long." });
		if (password !== passwordCheck)
			return res
				.status(400)
				.json({ msg: "Enter the same password twice for verification." });

		const existingUser = await User.findOne({ email: email });
		if (existingUser)
			return res
				.status(400)
				.json({ msg: "An account with this email already exists." });

		const salt = await bcrypt.genSalt();
		const passwordHash = await bcrypt.hash(password, salt);

		const newUser = new User({
			email,
			password: passwordHash,
			fullName,
            phone,
            address,
            fflNumber,
			role: 'vendor'
		});
		const savedUser = await newUser.save();
		res.json(savedUser);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;
