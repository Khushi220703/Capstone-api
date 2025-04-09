const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const connection = require("./Configs/DbConfig");

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
// connecting to the mongodb.
connection();

// checking the entry pouint working correctly or not.
app.get("/" , async(req,res)=>{
    try {
        res.status(200).send({message:"Hello from the server side."})
    } catch (error) {
        console.log(error);
        
        res.status(500).send({message:"There is an error from server side"});
    }
});

// all routes.
app.use("/api/user", require("./Routes/UserRoutes"));
app.use("/api/product", require("./Routes/ProductRoutes"));
app.use("/api/cart", require("./Routes/CartRoutes"));
app.use("/api/orders", require("./Routes/OrderRoutes"));


app.listen(port,()=>{
    console.log(`The server is running at the port ${port}`);
    
});

