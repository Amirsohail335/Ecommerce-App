// const express = require("express");
// const app = express();

// require("dotenv/config");

// const api = process.env.API_URL;

// //http://localhost:3001/api/v1/products

// app.get(`${api}/products`, (req, res) => {
//   const product = {
//     id: 1,
//     name: "Product 1",
//     image: "image.jpg",
//   };
//   res.send(product);
// });

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

app.use(cors());
app.options("*", cors());

//middleware
app.use(express.json());
app.use(morgan("tiny"));

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
