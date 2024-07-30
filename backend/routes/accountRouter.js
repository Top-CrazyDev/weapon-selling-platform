const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

router.post("/getAccounts", async (req, res) => {
    try {
        User.find({}).sort({ fullName: 'asc' }).exec(function (err, result) {
            return res
                .status(200)
                .json({ accounts: result });
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/editAccount", async (req, res) => {
    try {
        User.findOneAndUpdate({ _id: req.body.key }, req.body.param, function (err, doc) {
            return res
                .status(200)
                .json({ data: doc });
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/removeAccount", async (req, res) => {
    try {
        User.remove({ _id: req.body.id }).exec(function (err, result) {
            return res
                .status(200)
                .json({ "delete": "success" });
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/newAccount", async (req, res) => {
    try {
        let { email, password, fullName, role, phone, address, fflNumber } = req.body;

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
            role,
            phone,
            address,
            fflNumber
        });
        const savedUser = await newUser.save();
        res.json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;