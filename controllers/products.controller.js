import Product from "../models/products.model.js";

export const getProducts = async (req, res) =>{
    try {
        const products = await Product.find().populate({
            path: "userId",
            select: "email"
        })
        
        if (products.length > 0){
            res.status(200).json({
                status: true,
                data: products,
                message: "Products fetched successfully"
            })
        }else{
            res.status(400).json({
                status: false,
                message: "No found products"
            })
        }
       

    } catch (error) {
        console.log(error);
    }
}

export const postProducts = async (req, res) =>{
    try {
        req.body.userId = req.user._id;
         
        const prods = await new Product(req.body);
        await prods.save();
        res.status(200).json({
            status: true,
            data: prods,
            message: "Products created successfully"
        })
    } catch (error) {
        console.log(error);
    }
}

export const getProductsById = async (req, res) =>{
    try {
        // console.log(req.body);
        const id = req.params.id;
        // const prods = await Product.findOne({id: req.params.id});
    
        const prods = await Product.findOne({_id : id});
        res.status(200).json({
            status: true,
            data: prods,
            message: "Product fetched successfully"
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            message: "Product fetched successfully"
        })
    }
}

export const deleteProductById = async (req, res) =>{
    try {
        // console.log(req.body);
        const id = req.params.id;
        const prods = await Product.findOneAndDelete({_id: id});   
        res.status(200).json({
            status: true,
            data: prods,
            message: "Products deleted successfully"
        })
    } catch (error) {
        console.log(error);
    }
}