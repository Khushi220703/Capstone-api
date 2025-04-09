const {addToCart, getCart, updateQuantity, deleteCartItem} = require("../Controllers/CartController");
const router = require("express").Router();

router.post("/addToCart", addToCart);
router.get("/getCartItem/:userId", getCart);
router.put("/updateQuantity/:id/:isIncre", updateQuantity);
router.delete("/deleteCartItem/:id", deleteCartItem);

module.exports = router;
