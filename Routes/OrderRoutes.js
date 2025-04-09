const {addOrders, getAllOrders} = require("../Controllers/OrderController");
const router = require("express").Router();

router.post("/addOrder", addOrders);
router.get("/getAllOrder/:userId", getAllOrders);

module.exports = router;