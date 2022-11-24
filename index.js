const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes.js");
const productRoutes = require("./routes/productRoutes.js");

const app = express();

mongoose.connect("mongodb+srv://admin:admin123@zuitt.qfnw1x1.mongodb.net/capstone2-msapril?retryWrites=true&w=majority", {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

/* mongoose.connect("mongodb+srv://admin:admin123@zuitt.pzjdphc.mongodb.net/E-Commerce-API?retryWrites=true&w=majority", {
	useNewUrlParser: true,
	useUnifiedTopology: true
}); */

mongoose.connection.once("open", () => console.log("Now connected to MongoDB Atlas"))

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRoutes);
app.use("/products", productRoutes);

app.listen(process.env.PORT || 4000, () => {
	console.log(`ECOMMERCE is now online on port ${process.env.PORT || 4000}`);
})