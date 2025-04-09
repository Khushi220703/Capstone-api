const EcommerceCart = require("../Models/CartModel");
const Product = require("../Models/ProductModel");
const mongoose = require("mongoose");
// Add item to the cart
const addToCart = async (req, res) => {
    const { productId, userId, quantity } = req.body;
   
    console.log( productId, userId, quantity );
    
    if (!productId || !userId || !quantity) {
        console.log("All fields are mandatory!");
        
        return res.status(400).send({ message: "All fields are mandatory!" });
    }

    try {
       
        const product = await Product.findById(productId);
        if (!product) {
            console.log("Product not found!");
            
            return res.status(404).send({ message: "Product not found!" });
        }

       
        const existingCartItem = await EcommerceCart.findOne({ productId, userId });

        if (existingCartItem) {
            existingCartItem.quantity += quantity;
            await existingCartItem.save();
            console.log("updated");
            
            return res.status(200).send({ message: "Cart updated!", data: existingCartItem });
        }

        
        const cart = new EcommerceCart({ productId, userId, quantity });
        await cart.save();
        return res.status(201).send({ message: "Product added to cart!", data: cart });
    } catch (error) {
        console.error("Error adding to cart:", error);
        return res.status(500).send({ message: "Server error while adding to cart!" });
    }
};

// Get all items in the user's cart
const getCart = async (req, res) => {
    let { userId } = req.params;
    console.log(userId);
    
    
    userId = userId.replaceAll(":","");
    
    if (!mongoose.Types.ObjectId.isValid(userId)) {
       
        
        return res.status(400).json({ error: "Invalid user ID" });
      }
    
    if (!userId) {
        console.log("no id");
        
        return res.status(400).send({ message: "User ID is required!" });
    }

    try {
        const cartItems = await EcommerceCart.find({ userId: userId }).populate("productId");
       
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
    let { id } = req.params;
    let { isIncre } = req.params;
    id = id.replaceAll(":","");
     
    if (!id || isIncre === undefined) {
        return res.status(400).send({ message: "Invalid request parameters!" });
    }

    try {
        const cartItem = await EcommerceCart.findById({_id:id});

        if (!cartItem) {
            return res.status(404).send({ message: "Cart item not found!" });
        }

        cartItem.quantity += isIncre === "1" ? 1 : -1;

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
    let { id } = req.params;
    id = id.replaceAll(":","");
     
    if (!id) {

        return res.status(400).send({ message: "Cart item ID is required!" });
    }

    try {
        const cartItem = await EcommerceCart.findByIdAndDelete({_id:id});
         
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
