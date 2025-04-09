const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            title: String,
            imageUrl: [String],
            price: Number,
            quantity: Number,
            brandName: String,
            category: String,
            availableColors: [String],
            availableSizes: [String],
            materials: [String],
            features: [String],
            description: String,
        },
    ],
    totalAmount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
        default: "Pending",
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
    shippingAddress: {
        type: String, // 🔥 simple string instead of object
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: ["Credit Card", "Debit Card", "Cash on Delivery", "UPI", "Net Banking"],
        required: true,
    },
    transactionId: {
        type: String,
        default: null,
    },
}, {
    timestamps: true,
});

const EcommerceOrder = mongoose.model("EcommerceOrder", OrderSchema);

module.exports = EcommerceOrder;
