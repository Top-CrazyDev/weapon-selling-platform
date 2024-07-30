const router = require("express").Router();
const Zander = require("../models/zanderModel");
const Lipsey = require("../models/lipseyModel");

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

router.post("/addSlide", async (req, res) => {
	try {
		const result = await Zander.find({_id: req.body.id});
		if(result.length == 0) {
			const result1 = await Lipsey.find({_id: req.body.id});

			if(result1.length == 0) {
				return res.status(200).json({ success: false })
			}else{
				await Lipsey.findOneAndUpdate({_id: req.body.id}, {featured: 'slide'});	
			}
		}else{
			await Zander.findOneAndUpdate({_id: req.body.id}, {featured: 'slide'});
		}

		return res.status(200).json({ success: true });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.post("/removeSlide", async (req, res) => {
	try {
		const result = await Zander.find({_id: req.body.id});
		if(result.length == 0) {
			const result1 = await Lipsey.find({_id: req.body.id});

			if(result1.length == 0) {
				return res.status(200).json({ success: false })
			}else{
				await Lipsey.findOneAndUpdate({_id: req.body.id}, {featured: ''});	
			}
		}else{
			await Zander.findOneAndUpdate({_id: req.body.id}, {featured: ''});
		}

		return res.status(200).json({ success: true });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.post("/addTop", async (req, res) => {
	try {
		const result = await Zander.find({_id: req.body.id});
		if(result.length == 0) {
			const result1 = await Lipsey.find({_id: req.body.id});

			if(result1.length == 0) {
				return res.status(200).json({ success: false })
			}else{
				await Lipsey.findOneAndUpdate({_id: req.body.id}, {featured: 'top'});	
			}
		}else{
			await Zander.findOneAndUpdate({_id: req.body.id}, {featured: 'top'});
		}

		return res.status(200).json({ success: true });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.post("/removeTop", async (req, res) => {
	try {
		const result = await Zander.find({_id: req.body.id});
		if(result.length == 0) {
			const result1 = await Lipsey.find({_id: req.body.id});

			if(result1.length == 0) {
				return res.status(200).json({ success: false })
			}else{
				await Lipsey.findOneAndUpdate({_id: req.body.id}, {featured: ''});	
			}
		}else{
			await Zander.findOneAndUpdate({_id: req.body.id}, {featured: ''});
		}

		return res.status(200).json({ success: true });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.post("/getSlideProducts", async (req, res) => {
	try {
		const result = await Zander.find({featured: 'slide'});
        const result1 = await Lipsey.find({featured: 'slide'});
		
		return res.status(200).json({ products: [...result, ...result1] });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.post("/getTopProducts", async (req, res) => {
	try {
		const result = await Zander.find({featured: 'top'});
        const result1 = await Lipsey.find({featured: 'top'});

		return res.status(200).json({ products: [...result, ...result1] });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;