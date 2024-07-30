const router = require("express").Router();
const Zander = require("../models/zanderModel");
const Lipsey = require("../models/lipseyModel");
const constant = require("../utils/constant");

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

router.post("/upload", async (req, res) => {
	try {
		const data = JSON.parse(req.body.records);
		if (data.length > 0) {
			for (const item of data) {
				const existing = await Zander.findOne({ itemnumber: item["itemnumber"] });

				if (!existing) {
					const newRecord = new Zander({
						available: item["available"],
						subcategory: item["category"],
						desc1: item["desc1"],
						desc2: item["desc2"],
						itemnumber: item["itemnumber"],
						manufacturer: item["manufacturer"],
						mfgpnumber: item["mfgpnumber"],
						msrp: item["msrp"],
						price1: item["price1"],
						price2: item["price2"],
						price3: item["price3"],
						qty1: item["qty1"],
						qty2: item["qty2"],
						qty3: item["qty3"],
						upc: item["upc"],
						weight: item["weight"],
						serialized: item["serialized"],
						mapprice: item["mapprice"],
						allowdirectship: item["allowdirectship"],
						maineachprice: item["maineachprice"]
					});
					await newRecord.save();
				} else {
					await Zander.findOneAndUpdate({ itemnumber: item["itemnumber"] }, {
						available: item["available"],
						subcategory: item["category"],
						desc1: item["desc1"],
						desc2: item["desc2"],
						manufacturer: item["manufacturer"],
						mfgpnumber: item["mfgpnumber"],
						msrp: item["msrp"],
						price1: item["price1"],
						price2: item["price2"],
						price3: item["price3"],
						qty1: item["qty1"],
						qty2: item["qty2"],
						qty3: item["qty3"],
						upc: item["upc"],
						weight: item["weight"],
						serialized: item["serialized"],
						mapprice: item["mapprice"],
						allowdirectship: item["allowdirectship"],
						maineachprice: item["maineachprice"]
					})
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

router.post("/addImgLink", async (req, res) => {
	try {
		const data = JSON.parse(req.body.records);
		if (data.length > 0) {
			for (const item of data) {
				const existing = await Zander.findOne({ itemnumber: item["ItemNumber"] });

				if (existing) {
					if (existing['imagelink'] == '' || !existing['imagelink'])
						await Zander.findOneAndUpdate({ itemnumber: item["ItemNumber"] }, {
							imagelink: item["ImageLink"]
						})
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

router.post("/getProducts", async (req, res) => {
	try {
		Zander.find({}).sort({ subcategory: 'asc' }).exec(function (err, result) {
			return res
				.status(200)
				.json({ products: result });
		});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.post("/getAllProducts", async (req, res) => {
	try {
		const tmp = []

		const result1 = await Zander.find({}).sort({ subcategory: 'asc' }).exec()
		result1.map(re => {
			tmp.push({
				value: re._id,
				label: re.desc1
			})
		})

		const result2 = await Lipsey.find({}).sort({ itemType: 'asc' }).exec()
		result2.map(re => {
			tmp.push({
				value: re._id,
				label: re.description1
			})
		})

		return res.status(200).json({ products: tmp });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.post("/editProduct", async (req, res) => {
	try {
		Zander.findOneAndUpdate({ _id: req.body.key }, req.body.param, function (err, doc) {
			return res
				.status(200)
				.json({ data: doc });
		});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.post("/removeProduct", async (req, res) => {
	try {
		Zander.remove({ _id: req.body.id }).exec(function (err, result) {
			return res
				.status(200)
				.json({ "delete": "success" });
		});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.post("/newProduct", async (req, res) => {
	try {
		const newProduct = await new Zander(req.body);
		await newProduct.save();
		return res
			.status(200)
			.json({ msg: "Product is successfully saved." });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.post("/getProductsByCategory", async (req, res) => {
	// const result = [];

	try {
		// for (const ct of category) {
		// 	const prods = await Zander.find({ category: ct.value, available: { $gt: 0 } }).sort({ price1: 'DESC' }).limit(4).exec();
		// 	const modifiedProds = prods.map(p => ({
		// 		...p.toObject(),
		// 		isZander: true,
		// 		price1: Number(p.price1) + Number(p.price1) * (ct.percent / 100),
		// 	}));
		// 	if (prods.length == 0) {
		// 		const prods1 = await Lipsey.find({ itemType: ct.lipseyValue, quantity: { $gt: 0 } }).sort({ price: 'DESC' }).limit(4).exec();

		// 		const modifiedProds1 = prods1.map(p => ({
		// 			...p.toObject(),
		// 			isLipsey: true,
		// 			price: Number(p.price) + Number(p.price) * (ct.percent / 100),
		// 		}));
		// 		result.push({
		// 			category: {
		// 				value: ct.lipseyValue,
		// 				label: ct.label
		// 			},
		// 			products: modifiedProds1
		// 		})
		// 	} else {
		// 		result.push({
		// 			category: ct,
		// 			products: modifiedProds
		// 		})
		// 	}
		// }

		const promises = [];

		for (const ct of category) {
			const promise = new Promise(async (resolve, reject) => {
				try {
				const prods = await Zander.find({ category: ct.value, available: { $gt: 0 } })
					.sort({ price1: 'DESC' })
					.limit(4)
					.exec();

				const modifiedProds = prods.map(p => ({
					...p.toObject(),
					isZander: true,
					price1: Number(p.price1) + Number(p.price1) * (ct.percent / 100),
				}));

				if (prods.length === 0) {
					const prods1 = await Lipsey.find({ itemType: ct.lipseyValue, quantity: { $gt: 0 } })
					.sort({ price: 'DESC' })
					.limit(4)
					.exec();

					const modifiedProds1 = prods1.map(p => ({
					...p.toObject(),
					isLipsey: true,
					price: Number(p.price) + Number(p.price) * (ct.percent / 100),
					}));

					resolve({
					category: {
						value: ct.lipseyValue,
						label: ct.label,
					},
					products: modifiedProds1,
					});
				} else {
					resolve({
					category: ct,
					products: modifiedProds,
					});
				}
				} catch (error) {
				reject(error);
				}
			});

			promises.push(promise);
		}

		Promise.all(promises)
			.then(async (results) => {
				// Use the results array to update your `result` variable
				result = results;
				console.log(result);
				const result1 = await Zander.find({featured: 'top'});
				const result2 = await Lipsey.find({featured: 'top'});

				return res
					.status(200)
					.json({ result: result, products: [...result1, ...result2] });
			})
			.catch((error) => {
				// Handle any errors that occurred during the promises
				console.error(error);
			});


		
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.post("/getProductsBySearch", async (req, res) => {
	const result = [];
	try {
		if (req.body.category === 'All') {
			const prods = await Zander.find({
				$or: [
					{ desc1: { $regex: new RegExp(req.body.searchkey, 'i') } },
					{ desc2: { $regex: new RegExp(req.body.searchkey, 'i') } }
				]
			})
				.sort({ price1: 'DESC' })
				.skip((req.body.limit - 1) * 8)
				.limit(8)
				.exec();

			prods.map(p => {
				if (!p.mapprice || p.mapprice == '0' || p.mapprice == 0)
					category.map(ct => {
						if (p.category == ct.value)
							p.price1 = Number(p.price1) + Number(p.price1) * (ct.percent / 100);
					})
				else
					p.price1 = p.mapprice

				result.push({ ...p.toObject(), isZander: true })
			})

			if (prods.length == 0) {
				const prods1 = await Lipsey.find({
					$or: [
						{ description1: { $regex: new RegExp(req.body.searchkey, 'i') } },
						{ description2: { $regex: new RegExp(req.body.searchkey, 'i') } }
					]
				})
					.sort({ price: 'DESC' })
					.skip((req.body.limit - 1) * 8)
					.limit(8)
					.exec();

				prods1.map(p => {
					if (!p.retailMap || p.retailMap == '0' || p.retailMap == 0)
						category.map(ct => {
							if (p.itemType == ct.lipseyValue)
								p.price = Number(p.price) + Number(p.price) * (ct.percent / 100);
						})
					else
						p.price = p.retailMap

					result.push({ ...p.toObject(), isLipsey: true })
				})
			}
		} else if (req.body.category === 'top-seller') {
			const prods = await Zander.find({
				featured: 'top'
			})
				.sort({ price1: 'DESC' })
				.skip((req.body.limit - 1) * 8)
				.limit(8)
				.exec();

			prods.map(p => {
				if (!p.mapprice || p.mapprice == '0' || p.mapprice == 0)
					category.map(ct => {
						if (p.category == ct.value)
							p.price1 = Number(p.price1) + Number(p.price1) * (ct.percent / 100);
					})
				else
					p.price1 = p.mapprice

				result.push({ ...p.toObject(), isZander: true })
			})

			if (prods.length == 0) {
				const prods1 = await Lipsey.find({
					featured: 'top'
				})
					.sort({ price: 'DESC' })
					.skip((req.body.limit - 1) * 8)
					.limit(8)
					.exec();

				prods1.map(p => {
					if (!p.retailMap || p.retailMap == '0' || p.retailMap == 0)
						category.map(ct => {
							if (p.itemType == ct.lipseyValue)
								p.price = Number(p.price) + Number(p.price) * (ct.percent / 100);
						})
					else
						p.price = p.retailMap

					result.push({ ...p.toObject(), isLipsey: true })
				})
			}
		} else {
			if (!req.body.searchkey || req.body.searchkey === '') {
				const prods = await Zander.find({ category: req.body.category })
					.sort({ price1: 'DESC' })
					.skip((req.body.limit - 1) * 8)
					.limit(8)
					.exec();

				prods.map(p => {
					if (!p.mapprice || p.mapprice == '0' || p.mapprice == 0)
						category.map(ct => {
							if (p.category == ct.value)
								p.price1 = Number(p.price1) + Number(p.price1) * (ct.percent / 100);
						})
					else
						p.price1 = p.mapprice

					result.push({ ...p.toObject(), isZander: true })
				})

				if (prods.length == 0) {
					const prods1 = await Lipsey.find({ itemType: req.body.category })
						.sort({ price: 'DESC' })
						.skip((req.body.limit - 1) * 8)
						.limit(8)
						.exec();

					prods1.map(p => {
						if (!p.retailMap || p.retailMap == '0' || p.retailMap == 0)
							category.map(ct => {
								if (p.itemType == ct.lipseyValue)
									p.price = Number(p.price) + Number(p.price) * (ct.percent / 100);
							})
						else
							p.price = p.retailMap

						result.push({ ...p.toObject(), isLipsey: true })
					})
				}
			} else {
				const prods = await Zander.find({
					$and: [
						{ category: req.body.category },
						{
							$or: [
								{ desc1: { $regex: new RegExp(req.body.searchkey, 'i') } },
								{ desc2: { $regex: new RegExp(req.body.searchkey, 'i') } }
							]
						}
					]
				})
					.sort({ price1: 'DESC' })
					.skip((req.body.limit - 1) * 8)
					.limit(8)
					.exec();

				prods.map(p => {
					if (!p.mapprice || p.mapprice == '0' || p.mapprice == 0)
						category.map(ct => {
							if (p.category == ct.value)
								p.price1 = Number(p.price1) + Number(p.price1) * (ct.percent / 100);
						})
					else
						p.price1 = p.mapprice

					result.push({ ...p.toObject(), isZander: true })
				})

				if (prods.length == 0) {
					const prods1 = await Lipsey.find({
						$and: [
							{ itemType: req.body.category },
							{
								$or: [
									{ description1: { $regex: new RegExp(req.body.searchkey, 'i') } },
									{ description2: { $regex: new RegExp(req.body.searchkey, 'i') } }
								]
							}
						]
					})
						.sort({ price: 'DESC' })
						.skip((req.body.limit - 1) * 8)
						.limit(8)
						.exec();

					prods1.map(p => {
						if (!p.retailMap || p.retailMap == '0' || p.retailMap == 0)
							category.map(ct => {
								if (p.itemType == ct.lipseyValue)
									p.price = Number(p.price) + Number(p.price) * (ct.percent / 100);
							})
						else
							p.price = p.retailMap

						result.push({ ...p.toObject(), isLipsey: true })
					})
				}
			}
		}

		return res
			.status(200)
			.json({ result: result });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.post("/getProductById", async (req, res) => {
	try {
		Zander.find({
			_id: req.body.id
		}).exec(function (err, result) {
			if (result && result.length > 0) {
				if (result[0].mapprice) {
					result[0].price1 = result[0].mapprice;
				} else {
					category.map(ct => {
						if (result[0].category == ct.value)
							result[0].price1 = Number(result[0].price1) + Number(result[0].price1) * (ct.percent / 100);
					});
				}

				return res
					.status(200)
					.json({ product: { ...result[0].toObject(), isZander: true } });
			} else {
				Lipsey.find({
					_id: req.body.id
				}).exec(function (err, result) {
					if (result && result.length > 0) {
						if (result[0].retailMap) {
							result[0].price = result[0].retailMap;
						} else {
							category.map(ct => {
								if (result[0].category == ct.value)
									result[0].price = Number(result[0].price) + Number(result[0].price) * (ct.percent / 100);
							});
						}

						return res
							.status(200)
							.json({ product: { ...result[0].toObject(), isLipsey: true } });
					}
				})
			}
		});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.post("/addCategoryToProduct", async (req, res) => {
	try {
		Zander.find({}).sort({ subcategory: 'asc' }).exec(function (err, result) {
			result.map(p => {
				let update;
				if (constant.airgunsAccessories.includes(p.itemnumber)) {
					update = "airgunsAccessories"
				}
				if (constant.ammunition.includes(p.itemnumber)) {
					update = "ammunition"
				}
				if (constant.archery.includes(p.itemnumber)) {
					update = "archery"
				}
				if (constant.blackPowderFirearmsAccess.includes(p.itemnumber)) {
					update = "blackPowderFirearmsAccess"
				}
				if (constant.campingOutdoors.includes(p.itemnumber)) {
					update = "campingOutdoors"
				}
				if (constant.clothing.includes(p.itemnumber)) {
					update = "clothing"
				}
				if (constant.firearms.includes(p.itemnumber)) {
					update = "firearms"
				}
				if (constant.firearmsAccessories.includes(p.itemnumber)) {
					update = "firearmsAccessories"
				}
				if (constant.homeAutoAtv.includes(p.itemnumber)) {
					update = "homeAutoAtv"
				}
				if (constant.huntingAccessories.includes(p.itemnumber)) {
					update = "huntingAccessories"
				}
				if (constant.knivesAccessories.includes(p.itemnumber)) {
					update = "knivesAccessories"
				}
				if (constant.opticsAccessories.includes(p.itemnumber)) {
					update = "opticsAccessories"
				}
				if (constant.personalDefense.includes(p.itemnumber)) {
					update = "personalDefense"
				}
				if (constant.reloading.includes(p.itemnumber)) {
					update = "reloading"
				}
				if (constant.shootingAccessories.includes(p.itemnumber)) {
					update = "shootingAccessories"
				}

				Zander.findOneAndUpdate({ _id: p._id }, {
					category: update
				}, function (err, doc) {
					if (err)
						console.log(err)
					else
						console.log("success")
				})
			});
		});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.post("/getProductsByAdvancedSearch", async (req, res) => {
	const { word, wordOption, exclude, upc, fromPrice, toPrice, category, sortBy, itemPerPage, page, type, fresh, used, old } = req.body
	let wordQuery = {}, excludeQuery = {}, upcQuery = {}, priceQuery = {}, categoryQuery = {}

	try {
		if (word && word != "") {
			const wordArray = word.split(" ");

			if (wordOption === 'all') {
				wordQuery = {
					$or: [
						{
							desc1: {
								$all: wordArray.map((word) => new RegExp(`.*${word}.*`, 'i')),
							}
						},
						{
							desc2: {
								$all: wordArray.map((word) => new RegExp(`.*${word}.*`, 'i')),
							}
						}
					]
				}
			} else if (wordOption === 'any') {
				wordQuery = {
					$or: [
						{
							desc1: { $regex: new RegExp(wordArray.join('|'), 'i') }
						},
						{
							desc2: { $regex: new RegExp(wordArray.join('|'), 'i') }
						}
					]
				}
			} else if (wordOption === 'exact') {
				wordQuery = {
					$or: [
						{
							desc1: { $regex: `^${wordArray.join(' ')}$`, $options: 'i' }
						},
						{
							desc2: { $regex: `^${wordArray.join(' ')}$`, $options: 'i' }
						}
					]
				}
			}
		}

		if (exclude && exclude != "") {
			excludeQuery = {
				$or: [
					{
						desc1: { $nin: [exclude] }
					},
					{
						desc2: { $nin: [exclude] }
					}
				]
			}
		}

		if (upc && upc != "") {
			upcQuery = { upc: { $regex: upcText, $options: 'i' } }
		}

		if (fromPrice && toPrice) {
			priceQuery = {
				$or: [
					{ mapprice: { $gte: Number(fromPrice), $lte: Number(toPrice) } },
					{ price1: { $gte: Number(fromPrice), $lte: Number(toPrice) } }
				]
			}
		} else if (fromPrice && !toPrice) {
			priceQuery = {
				$or: [
					{ mapprice: { $gte: Number(fromPrice) } },
					{ price1: { $gte: Number(fromPrice) } }
				]
			}
		} else if (!fromPrice && toPrice) {
			priceQuery = {
				$or: [
					{ mapprice: { $lte: Number(toPrice) } },
					{ price1: { $lte: Number(toPrice) } }
				]
			}
		}

		if (category && category != 'all' && category != 'All') {
			categoryQuery = {
				category: category
			}
		}

		const size = Number(itemPerPage)

		const count = await Zander.countDocuments({
			...wordQuery,
			...excludeQuery,
			...upcQuery,
			...priceQuery,
			...categoryQuery
		});

		const result = await Zander.find({
			...wordQuery,
			...excludeQuery,
			...upcQuery,
			...priceQuery,
			...categoryQuery
		})
			.sort({ createdAt: 'DESC' })
			.skip((page - 1) * size)
			.limit(size)
			.exec();

		const tmp = []
		result.map(r => {
			tmp.push({ ...r.toObject(), isZander: true })
		})

		return res
			.status(200)
			.json({ result: tmp, total: count });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.post("/payment", async(req, res) =>{

	verifyPayment(transactionId)
    .then(result => {
        if (result) {
            console.log('Verified Payment Details:', result);
        }
    })
    .catch(error => {
        console.error('Payment verification error:', error);
    });
});

const API_URL = 'https://api.uat.payroc.com/v1/payments';
const API_KEY = '05E5DB5F932B9200681A175FB870FA7ECF482AB85F64F1CF6E2F31BE09010D48F77B666FB4C25EA551719D398D7A549105F3FE3F36A89DB69EEA78BDDB79C5ED';

async function verifyPayment(transactionId) {
    try {
        const response = await axios.get(`${API_URL}/${transactionId}`, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        // Handle the response
        if (response.data.success) {
            console.log('Payment verified:', response.data);
            return response.data; // Return the payment details
        } else {
            console.error('Payment verification failed:', response.data);
            return null;
        }
    } catch (error) {
        console.error('Error verifying payment:', error.response ? error.response.data : error.message);
        throw error; // Rethrow the error for further handling
    }
}


module.exports = router;