const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const userController = require("../controllers/userController.js");
const auth = require("../auth.js");


// routes folder - is where all http method and endpoints are located

router.post("/register", (req, res) => {
	userController.registerUser(req.body).then(resultFromController => res.send(resultFromController));
})

router.post("/login", (req, res) => {
	userController.loginUser(req.body).then(resultFromController => res.send(resultFromController));

})

router.post("/checkEmail", (req, res) => {
	userController.checkEmailExists(req.body).then(resultFromController => res.send(resultFromController));
})



/*Added*/



router.post("/checkOut", auth.verify, (req, res) => {
	// use JS object

	let data = {
		// to check userId if logged-in or registered
		userId: auth.decode(req.headers.authorization).id,

		isAdmin: auth.decode(req.headers.authorization).isAdmin,

		productId: req.body.productId,
	}

	userController.checkOut(data).then(resultFromController => res.send(resultFromController));
})


router.get("/:userId/details", auth.verify, (req, res) => {

	//  adding data from middle ware token get the id og login user
	let data = {
		// to check userId if logged-in or registered
		userId: auth.decode(req.headers.authorization).id,

		isAdmin: auth.decode(req.headers.authorization).isAdmin,

		productId: req.body.productId

	}

	userController.getUserDetails(data).then(resultFromController => res.send(resultFromController));
})

module.exports = router;