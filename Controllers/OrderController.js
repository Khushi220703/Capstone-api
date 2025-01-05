const Order = require("../Models/OrderModel");

// add orders of the user....
const addOrders = async (req, res) => {
    const { userId, items, totalAmount, status, orderDate, shippingAddress, paymentMethod, transactionId } = req.body;

    
    if (!userId || !items || !totalAmount || !shippingAddress || !paymentMethod) {
        return res.status(400).send({ message: "All required fields are mandatory!" });
    }

    try {
        
        const order = new Order({
            userId,
            items,
            totalAmount,
            status: status || "Pending",
            orderDate: orderDate || new Date(), 
            shippingAddress,
            paymentMethod,
            transactionId,
        });

        
        await order.save();

        return res.status(201).send({ message: "Order placed successfully!", data: order });
    } catch (error) {
        console.error("Error adding order:", error);
        return res.status(500).send({ message: "Server error while placing the order!" });
    }
};

// Fetch all orders for a user....
const getAllOrders = async (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).send({ message: "User ID is required!" });
    }

    try {
      
        const orders = await Order.find({ userId });

        if (!orders || orders.length === 0) {
            return res.status(404).send({ message: "No orders found for the user!" });
        }

        return res.status(200).send({ data: orders });
    } catch (error) {
        console.error("Error fetching orders:", error);
        return res.status(500).send({ message: "Server error while fetching orders!" });
    }
};

module.exports = { addOrders, getAllOrders };
