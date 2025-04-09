const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const Product = require("../Models/ProductModel");

// Add a Product
const addProduct = async (req, res) => {
    const {
        title,
        price,
        rating,
        description,
        category,
        imageUrl,
        availableColors,
        availableSizes,
        materials,
        features,
        reviews,
        brandName,
        maxStock,
    } = req.body;

    // Validation
    if (!title || !price || !category || !imageUrl || !brandName || !maxStock) {
        return res.status(400).send({ message: "Required fields are missing!" });
    }

    try {
        const product = new Product({
            title,
            price,
            rating,
            description,
            category,
            imageUrl,
            availableColors,
            availableSizes,
            materials,
            features,
            reviews,
            brandName,
            maxStock,
        });

        await product.save();
        return res.status(201).send({ message: "Product added successfully!" });
    } catch (error) {
        console.error("Error adding product:", error.message);
        return res.status(500).send({ message: "There is an error from the server side." });
    }
};

// Get All Products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();

        if (!products || products.length === 0) {
            return res.status(404).send({ message: "No products found." });
        }

        return res.status(200).send(products);
    } catch (error) {
        console.error("Error fetching products:", error.message);
        return res.status(500).send({ message: "There is an error from the server side." });
    }
};

const getProductById = async (req, res) => {
 
  let {id} = req.params;
  id = id.replaceAll(":","");

  try {
      const products = await Product.find({_id:id});

      if (!products || products.length === 0) {
          return res.status(404).send({ message: "No products found." });
      }

      return res.status(200).send(products);
  } catch (error) {
      console.error("Error fetching products:", error.message);
      return res.status(500).send({ message: "There is an error from the server side." });
  }
};


const getProductCategory = async (req, res) => {
    try {
      const products = await Product.aggregate([
        {
          $group: {
            _id: "$category", 
            product: { $first: "$$ROOT" } 
          }
        },
        {
          $project: {
            _id: 0, 
            category: "$_id",
            imageUrl: { $arrayElemAt: ["$product.imageUrl", 0] } 
          }
        }
      ]);
  
      res.status(200).send(products);
    } catch (error) {
      console.error("Error fetching products:", error.message);
      return res.status(500).send({ message: "There is an error from the server side." });
    }
  };
  
  
module.exports = { addProduct, getProducts, getProductById,getProductCategory };
