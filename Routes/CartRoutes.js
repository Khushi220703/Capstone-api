const {addToCart, getCart, updateQuantity, deleteCartItem} = require("../Controllers/CartController");
const router = require("express").Router();

router.post("/addToCart", addToCart);
router.get("/getCartItem", getCart);
router.put("/updateQuantity", updateQuantity);
router.delete("/deleteCartItem", deleteCartItem);

module.exports = router;
