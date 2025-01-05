const {addProduct, getProducts} = require("../Controllers/ProductController");
const router = require("express").Router();


router.post("/addProduct", addProduct);
router.get("/getProducts", getProducts);

module.exports = router;