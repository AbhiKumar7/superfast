import express from "express"
import dotenv  from "dotenv"
import cookieParser from "cookie-parser"
import baseUserRoute from "./src/router/user.route.js"
import baseCategoryRoute from "./src/router/category.route.js"
import baseSubCategoryRoute from "./src/router/subCategory.route.js"
import baseProductRoute from "./src/router/product.route.js"
import baseCatRoute from "./src/router/cart.route.js"
import baseAddressRoute from "./src/router/address.route.js"
import baseOrderRoute from "./src/router/order.route.js"
import path from "path";
import { fileURLToPath } from "url";
let app = express();
dotenv.config({ path: ".env" });
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(express.static("public"))
app.use("/userapi",baseUserRoute)
app.use("/categoryapi",baseCategoryRoute)
app.use("/subcategoryapi",baseSubCategoryRoute)
app.use("/productapi",baseProductRoute)
app.use("/cartapi",baseCatRoute)
app.use("/addressapi",baseAddressRoute)
app.use("/orderapi",baseOrderRoute)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  express.static(path.join(__dirname, "../frontend/superfast/dist"))
);
app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/superfast/dist/index.html"));
});
export {app}