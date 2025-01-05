const Cart = require("../Models/CartModel");
const Product = require("../Models/ProductModel");

// Add item to the cart
const addToCart = async (req, res) => {
    const { productId, userId, quantity } = req.body;

    if (!productId || !userId || !quantity) {
        return res.status(400).send({ message: "All fields are mandatory!" });
    }

    try {
       
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send({ message: "Product not found!" });
        }

       
        const existingCartItem = await Cart.findOne({ productId, userId });

        if (existingCartItem) {
            existingCartItem.quantity += quantity;
            await existingCartItem.save();
            return res.status(200).send({ message: "Cart updated!", data: existingCartItem });
        }

        
        const cart = new Cart({ productId, userId, quantity });
        await cart.save();
        return res.status(201).send({ message: "Product added to cart!", data: cart });
    } catch (error) {
        console.error("Error adding to cart:", error);
        return res.status(500).send({ message: "Server error while adding to cart!" });
    }
};

// Get all items in the user's cart
const getCart = async (req, res) => {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).send({ message: "User ID is required!" });
    }

    try {
        const cartItems = await Cart.find({ userId }).populate("productId");

        if (!cartItems || cartItems.length === 0) {
            return res.status(404).send({ message: "Cart is empty!" });
        }

        return res.status(200).send({ data: cartItems });
    } catch (error) {
        console.error("Error fetching cart:", error);
        return res.status(500).send({ message: "Server error while fetching cart!" });
    }
};

// Update quantity of an item in the cart
const updateQuantity = async (req, res) => {
    const { id } = req.params;
    const { isIncre } = req.body;

    if (!id || isIncre === undefined) {
        return res.status(400).send({ message: "Invalid request parameters!" });
    }

    try {
        const cartItem = await Cart.findById(id);

        if (!cartItem) {
            return res.status(404).send({ message: "Cart item not found!" });
        }

        cartItem.quantity += isIncre ? 1 : -1;

        if (cartItem.quantity <= 0) {
            await cartItem.remove();
            return res.status(200).send({ message: "Cart item removed!" });
        }

        await cartItem.save();
        return res.status(200).send({ message: "Quantity updated!", data: cartItem });
    } catch (error) {
        console.error("Error updating quantity:", error);
        return res.status(500).send({ message: "Server error while updating quantity!" });
    }
};

// Delete an item from the cart
const deleteCartItem = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).send({ message: "Cart item ID is required!" });
    }

    try {
        const cartItem = await Cart.findByIdAndDelete(id);

        if (!cartItem) {
            return res.status(404).send({ message: "Cart item not found!" });
        }

        return res.status(200).send({ message: "Cart item deleted!" });
    } catch (error) {
        console.error("Error deleting cart item:", error);
        return res.status(500).send({ message: "Server error while deleting cart item!" });
    }
};

module.exports = { addToCart, getCart, updateQuantity, deleteCartItem };
