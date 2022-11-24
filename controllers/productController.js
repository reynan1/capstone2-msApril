const Product = require("../models/Product.js")

module.exports.addProduct = (data) => {

	console.log(data + " all products")
	if (data.isAdmin) {
		let newProduct = new Product({
			category: data.product.category,
			productName: data.product.productName,
			description: data.product.description,
			price: data.product.price
		})

		return newProduct.save().then((newProduct, error) => {
			if (error) {
				return error
			}
			return newProduct
		})
	}

	let message = Promise.resolve(`User must be ADMIN to access this site.`)

	return message.then((value) => {
		return value
	})
}

module.exports.getAllProducts = () => {
	console.log("tesign code all products")
	return Product.find({}).then(result => {
		return result
	})
}

module.exports.getActiveProducts = () => {
	return Product.find({ isActive: true }).then(result => {
		return result
	})
}


module.exports.getProduct = (productId) => {
	return Product.findById(productId).then(result => {
		return result
	})
}

module.exports.updateProduct = (productId, newData) => {
	return Product.findByIdAndUpdate(productId, {
		category: newData.category,
		productName: newData.productName,
		description: newData.description,
		price: newData.price
	})
		.then((updateProduct, error) => {
			if (error) {
				return false
			}

			return true
		})
}

module.exports.archiveProduct = (productId) => {
	return Product.findByIdAndUpdate(productId, {
		isActive: false
	})
		.then((archiveProduct, error) => {
			if (error) {
				return false
			}

			return true
		})
}


module.exports.unArchiveProduct = (productId) => {
	return Product.findByIdAndUpdate(productId, {
		isActive: true
	})
		.then((unArchiveProduct, error) => {
			if (error) {
				return false
			}

			return true
		})
}