const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require('axios');
const auth = require("../middleware/auth");
const User = require("../models/userModel");
const Customer = require("../models/customerModel");
const randomize = require('randomatic');
const nodemailer = require('nodemailer');
const Zander = require("../models/zanderModel");
const Lipsey = require("../models/lipseyModel");
const crypto = require('crypto');

const category = [
	{
		value: 'airgunsAccessories',
		label: 'Air guns & Accessories',
		percent: 35
	},
	{
		value: 'ammunition',
		label: 'Ammunition',
		percent: 35
	},
	{
		value: 'archery',
		label: 'Archery',
		percent: 20
	},
	{
		value: 'blackPowderFirearmsAccess',
		label: 'Black Powder Firearms & Access',
		percent: 35
	},
	{
		value: 'campingOutdoors',
		label: 'Camping/Outdoors',
		percent: 30
	},
	{
		value: 'clothing',
		label: 'Clothing',
		percent: 35
	},
	{
		value: 'firearms',
		lipseyValue: 'Firearm',
		label: 'Firearms',
		percent: 10
	},
	{
		value: 'firearmsAccessories',
		label: 'Firearms Accessories',
		percent: 35
	},
	{
		value: 'homeAutoAtv',
		label: 'Home/Auto & Atv',
		percent: 30
	},
	{
		value: 'huntingAccessories',
		label: 'Hunting Accessories',
		percent: 35
	},
	{
		value: 'knivesAccessories',
		label: 'Knives & Accessories',
		percent: 35
	},
	{
		value: 'opticsAccessories',
		lipseyValue: 'Optic',
		label: 'Optics & Accessories',
		percent: 35
	},
	{
		value: 'holstersPersonalDefense',
		label: 'Holsters & Personal Defense',
		percent: 35
	},
	{
		value: 'reloading',
		label: 'Reloading',
		percent: 35
	},
	{
		value: 'shootingAccessories',
		label: 'Shooting Accessories',
		percent: 35
	},
	{
		value: '',
		lipseyValue: 'Accessory',
		label: 'Accessory',
		percent: 35
	}
];

router.post("/register", async (req, res) => {
	try {
		let { email, username, password, passwordCheck, fullName } = req.body;

		if (!email || !username || !password || !passwordCheck || !fullName)
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
				.json({ msg: "Email already exists." });

		const existingUser1 = await User.findOne({ username: username });
		if (existingUser1)
			return res
				.status(400)
				.json({ msg: "Username already exists." });

		const salt = await bcrypt.genSalt();
		const passwordHash = await bcrypt.hash(password, salt);

		const newUser = new User({
			email,
			username,
			password: passwordHash,
			fullName,
			role: 'customer'
		});
		const savedUser = await newUser.save();
		res.json(savedUser);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

async function sendOtpEmail(email, otp) {
	try {
		const transporter = nodemailer.createTransport({
			host: 'smtp.office365.com',
			port: 587,
			secure: false,
			auth: {
				user: 'admin@aotactical.com',
				pass: 'loveJesus4ever!'
			},
		});

		const mailOptions = {
			from: 'admin@aotactical.com',
			to: email,
			subject: 'OTP Verification',
			text: `Your OTP is: ${otp}`,
		};

		const info = await transporter.sendMail(mailOptions);
		console.log('Email sent: ' + info.response);
	} catch (error) {
		console.error('Error sending email:', error);
	}
}

router.post("/login", async (req, res) => {
	try {
		const { email, password, customerId } = req.body;

		if (!email || !password)
			return res.status(400).json({ msg: "Not all fields have been entered." });

		if (email == '' && password == '') {
			const token = jwt.sign({ id: 0 }, 'aotactical', {
				expiresIn: '365d'
			});
			return res.status(200).json({
				token,
				user: {
					id: 0,
					role: 'admin',
					fullName: 'Admin',
				},
			});
		} else {
			const user = await User.findOne({ email: email });
			if (!user)
				return res
					.status(400)
					.json({ msg: "No account with this email has been registered." });

			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

			await Customer.findOneAndUpdate({ id: customerId }, { id: user._id })

			if (user.isOtp) {
				const generatedOtp = randomize('0', 6);
				user.otp = generatedOtp;
				console.log("generatedOtp=>", generatedOtp)
				await user.save();

				sendOtpEmail(email, generatedOtp);

				return res.status(200).json({ success: true });
			} else {
				const token = jwt.sign({ id: user._id }, "aotactical", {
					expiresIn: '365d'
				});

				return res.status(200).json({
					token,
					user: {
						id: user._id,
						role: user.role,
						fullName: user.fullName,
					},
				});
			}
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.post("/handleOtpVerification", async (req, res) => {
	try {
		const { otp } = req.body;

		const user = await User.findOne({ otp });

		if (!user) {
			return res.json({ success: false, message: 'Invalid OTP' });
		}

		user.otp = '';
		await user.save();

		const token = jwt.sign({ id: user._id }, "aotactical", {
			expiresIn: '365d'
		});

		return res.status(200).json({
			token,
			user: {
				id: user._id,
				role: user.role,
				fullName: user.fullName,
			},
		});
	} catch (err) {
		console.error('Error during OTP verification:', err.message);
		return res.status(500)
			.json(
				{
					success: false,
					message: 'An error occurred during OTP verification'
				}
			);
	}
});

router.post('/forgot-password', async (req, res) => {
	const { email } = req.body;

	const user = await User.findOne({ email });
	if (!user) {
		return res.status(400).send('No Account with this email.');
	}

	const token = crypto.randomBytes(32).toString('hex');
	user.resetToken = token;
	user.resetTokenExpiration = Date.now() + 3600000; // 1 hour
	await user.save();

	const transporter = nodemailer.createTransport({
		host: 'smtp.office365.com',
		port: 587,
		secure: false,
		auth: {
			user: 'admin@aotactical.com',
			pass: 'loveJesus4ever!'
		}
	});

	const resetUrl = `http://aotactical.com/reset-password/${token}`;
	// const resetUrl = `http://localhost:3000/reset-password/${token}`;
	// console.log(resetUrl)
	
	await transporter.sendMail({
		from: 'admin@aotactical.com',
		to: email,
		subject: 'Password Reset',
		html: `<p>You requested a password reset. Click <a href="${resetUrl}">here</a> to reset your password.</p>`
	});

	return res.status(200).json({
		success: true
	});
});

router.post('/reset-password/:token', async (req, res) => {
	const { token } = req.params;
	const { newPassword } = req.body;

	const user = await User.findOne({
		resetToken: token,
		resetTokenExpiration: { $gt: Date.now() }
	});

	if (!user) {
		return res.status(400).send('Token is invalid or has expired');
	}

	const salt = await bcrypt.genSalt();
	const passwordHash = await bcrypt.hash(newPassword, salt);
	user.password = passwordHash
	user.resetToken = undefined;
	user.resetTokenExpiration = undefined;
	await user.save();

	return res.status(200).json({
		success: true
	});
});

router.post("/getFflDealers", async (req, res) => {
	return await axios.post('https://ffl-api.garidium.com', {
		"action": "get_ffl_list",
		"data": req.body
	}, {
		headers: {
			"x-api-key": "YRvEyLpSgm6K0aPjPN3uI8nzbjyaaPHDaaQhSJpr"
		}
	})
		.then(response => {
			return res.status(200).json({
				dealers: response.data
			})
		})
		.catch(error => {
			console.error(error);
		});
});

router.post("/addToCart", async (req, res) => {
	try {
		const existing = await Customer.findOne({ id: req.body.id });

		if (!existing) {
			const newCustomerCart = new Customer({
				id: req.body.id,
				cart: req.body.cart
			})

			const savedData = await newCustomerCart.save();

			res.status(200).json({ savedCart: savedData });
		} else {
			const updated = await Customer.findOneAndUpdate({ id: req.body.id }, { cart: req.body.cart });

			res.status(200).json({ savedCart: updated });
		}
	} catch (e) {
		console.error(e)
		res.status(500).json({ error: "Oops! Something went wrong." })
	}
});

router.post("/getCartForCustomer", async (req, res) => {
	try {
		const existing = await Customer.findOne({ id: req.body.id });

		if (existing)
			res.status(200).json({ result: existing });
		else
			res.status(200).json({ result: { cart: [] } });
	} catch (e) {
		console.error(e)
		res.status(500).json({ error: "Oops! Something went wrong." })
	}
});

router.post("/addToWishlist", async (req, res) => {
	try {
		const existing = await Customer.findOne({ id: req.body.id });

		if (existing.wishlist.filter(w => w._id == req.body.item._id).length == 0) {
			const wishlist = [...existing.wishlist, req.body.item]
			const updated = await Customer.findOneAndUpdate({ id: req.body.id }, { wishlist: wishlist });

			res.status(200).json({ savedCart: updated });
		} else {
			res.status(200).json({ savedCart: "duplicated" });
		}
	} catch (e) {
		console.error(e)
		res.status(500).json({ error: "Oops! Something went wrong." })
	}
});

router.post("/getWishlistForCustomer", async (req, res) => {
	try {
		const existing = await Customer.findOne({ id: req.body.id });

		res.status(200).json({ result: existing });
	} catch (e) {
		console.error(e)
		res.status(500).json({ error: "Oops! Something went wrong." })
	}
});

router.post("/getRecentForCustomer", async (req, res) => {
	try {
		const existing = await Customer.findOne({ id: req.body.id });
		let recent = [];
		existing.logs.map(log => {
			if (log.page.includes("/product/")) {
				recent.push(log.page.split("/product/")[1])
			}
		})
		recent = [...new Set(recent)];
		const result = []
		await Promise.all(
			recent.map((id) => Zander.findById({ _id: id }))
		)
			.then((documents) => {
				documents.map(doc => {
					if (doc)
						result.push({ ...doc.toObject(), isZander: true })
				})
			})
			.catch((error) => {
				console.error(error);
			});
		await Promise.all(
			recent.map((id) => Lipsey.findById({ _id: id }))
		)
			.then((documents) => {
				documents.map(doc => {
					if (doc)
						result.push({ ...doc.toObject(), isLipsey: true })
				})
			})
			.catch((error) => {
				console.error(error);
			});

		const final = []
		for (const ct of category) {
			result.map(r => {
				if (r.category == ct.value) {
					if (r.isZander) {
						final.push({ ...r, price1: Number(r.price1) + Number(r.price1) * (ct.percent / 100) })
					} else {
						final.push({ ...r, price: Number(r.price) + Number(r.price) * (ct.percent / 100) })
					}
				}
			})
		}

		res.status(200).json({ result: final });
	} catch (e) {
		console.error(e)
		res.status(500).json({ error: "Oops! Something went wrong." })
	}
});

router.post("/submitContact", async (req, res) => {
	try {
		const transporter = nodemailer.createTransport({
			host: 'smtp.office365.com',
			port: 587,
			secure: false,
			auth: {
				user: 'admin@aotactical.com',
				pass: 'loveJesus4ever!'
			},
		});

		const mailOptions = {
			from: req.body.email,
			to: 'admin@aotactical.com',
			subject: req.body.subject,
			text: `${req.body.what} - ${req.body.description}`,
		};

		const info = await transporter.sendMail(mailOptions);
		console.log('Email sent: ' + info.response);

		res.status(200).json({ success: true });
	} catch (e) {
		console.error(e)
		res.status(500).json({ error: "Oops! Something went wrong." })
	}
});

router.post("/addPageLog", async (req, res) => {
	try {
		const customer = await Customer.findOne({ id: req.body.customerId })
		if (customer) {
			const logs = customer.logs;
			logs.push({
				page: req.body.page,
				visitedAt: new Date()
			})

			await Customer.findOneAndUpdate({ id: req.body.customerId }, { logs: logs });

			res.status(200).json({ addPageLog: true });
		} else {
			res.status(200).json({ addPageLog: false });
		}
	} catch (e) {
		console.error(e)
		res.status(500).json({ error: "Oops! Something went wrong." })
	}
});

module.exports = router;
