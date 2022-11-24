const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const auth = require("../auth.js");
const Product = require("../models/Product.js");


module.exports.registerUser = (reqBody) => {
	let newUser = new User({
		firstName: reqBody.firstName,
		lastName: reqBody.lastName,
		mobileNo: reqBody.mobileNo,
		email: reqBody.email,
		password: bcrypt.hashSync(reqBody.password, 10)
	})

	return newUser.save().then((user, error) => {
		if (error) {
			return false;
		} else {
			return true;
		}
	})
}

module.exports.loginUser = (reqBody) => {
	return User.findOne({ email: reqBody.email }).then(result => {
		if (result == null) {
			return true;

		} else {
			const isPasswordCorrect = bcrypt.compareSync(reqBody.password, result.password);
			if (isPasswordCorrect) {
				return { access: auth.createAccessToken(result) }
			}
		}
	})
}

module.exports.checkEmailExists = (reqBody) => {
	return User.find({ email: reqBody.email }).then(result => {
		if (result.length > 0) {
			return true;
		} else {
			return false;
		}
	})
}



/*Added*/


module.exports.checkOut = async (data) => {
	if (!data.isAdmin) {

		// Adds productId in the user's order array
		// call User Model. query method from the parameter data 
		let isUserUpdated = await User.findById(data.userId).then(user => {
			// call user.orderedItems using dot notation
			user.orderedItems.push({
				productId: data.productId,
			});

			return user.save().then((user, error) => {
				if (error) {
					return false;
				} else {
					return true;
				}
			})

		})


		let isProductUpdated = await Product.findById(data.productId).then(product => {
			// data or can use reqBody 
			product.customers.push({ userId: data.userId });

			return product.save().then((product, error) => {
				if (error) {
					return false;
				} else {
					return true;
				}
			})
		})

		if (isUserUpdated && isProductUpdated) {
			return true;
		} else {
			return false;
		}

	}
}



module.exports.getUserDetails = (data) => {
	return User.findById(data.userId).then(result => {
		result.password = ""
		return result;
	})
}