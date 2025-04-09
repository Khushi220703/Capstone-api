const {addProduct, getProducts, getProductById ,getProductCategory} = require("../Controllers/ProductController");
const router = require("express").Router();


router.post("/addProduct", addProduct);
router.get("/getProducts", getProducts);
router.get("/getProductById/:id", getProductById);
router.get("/getProductCategory", getProductCategory);
module.exports = router;