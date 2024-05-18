// const express = require("express");
// const app = express();
// const morgan = require("morgan");
// const mongoose = require("mongoose");

// require("dotenv/config");

// // //middleware
// app.use(express.json());
// app.use(morgan("tiny"));

// const api = process.env.API_URL;

// //http://localhost:3001/api/v1/products

// const productSchema = mongoose.Schema({
//   name: String,
//   image: String,
//   countInStock: Number,
// });

// const Product = mongoose.model("Product", productSchema);

// app.get(`${api}/products`, (req, res) => {
//   const product = {
//     id: 1,
//     name: "Product 1",
//     image: "image.jpg",
//   };
//   res.send(product);
// });

// app.post(`${api}/products`, (req, res) => {
//   const product = new Product({
//     name: req.body.name,
//     image: req.body.img,
//     countInStock: req.body.countInStock,
//   });
//   product
//     .save()
//     .then((createdProduct) => {
//       res.status(201).json(createdProduct);
//     })
//     .catch((err) => {
//       res.status(500).json({
//         error: err,
//         success: false,
//       });
//     });
// });

// //Database
// mongoose
//   .connect(process.env.CONNECTION_STRING, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     dbName: "eshop-database",
//   })
//   .then(() => {
//     console.log("Database Connection is ready...");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// app.listen(3000, () => {
//   console.log(api);
//   console.log("server is running http://localhost:3000/");
// });

const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');

app.use(cors());
app.options("*", cors());

//middleware
app.use(express.json());
app.use(morgan("tiny"));
// app.use(authJwt);
// app.use(errorHandler);


//Routes
const categoriesRoutes = require("./routes/categories");
const productsRoutes = require("./routes/products");
const usersRoutes = require("./routes/users");
const ordersRoutes = require("./routes/orders");

const api = process.env.API_URL;

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

//mongodb+srv://amirsohail0212:<password>@cluster0.hcpcwho.mongodb.net/

//Database
mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "eshop-database",
  })
  .then(() => {
    console.log("Database Connection is ready...");
  })
  .catch((err) => {
    console.log(err);
  });

//Server
app.listen(3000, () => {
  console.log("server is running http://localhost:3000");
});
