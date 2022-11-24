const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController.js");
const auth = require("../auth.js")


router.post("/create", auth.verify, (req, res) => {
	console.log("working post")
	const data = {
		product: req.body,
		isAdmin: auth.decode(req.headers.authorization).isAdmin
	}

	productController.addProduct(data).then(resultFromController => {
		res.send(resultFromController)
	})
})

router.get("/all", (req, res) => {
	productController.getAllProducts().then(resultFromController => {
		res.send(resultFromController)
	})
})

router.get("/active", (req, res) => {
	productController.getActiveProducts().then(resultFromController => {
		res.send(resultFromController)
	})
})

router.get("/:productId", (req, res) => {
	productController.getProduct(req.params.productId).then(resultFromController => {
		res.send(resultFromController)
	})
})

router.patch("/:productId/update", auth.verify, (req, res) => {
	productController.updateProduct(req.params.productId, req.body).then(resultFromController => {
		res.send(resultFromController)
	})
})

router.patch("/:productId/archive", auth.verify, (req, res) => {
	productController.archiveProduct(req.params.productId).then(resultFromController => {
		res.send(resultFromController)
	})
})


router.patch("/:productId/unarchive", auth.verify, (req, res) => {
	productController.unArchiveProduct(req.params.productId).then(resultFromController => {
		res.send(resultFromController)
	})
})

module.exports = router