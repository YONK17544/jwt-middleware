import mongoose from "mongoose";

// const MONGO_URI = process.env.MONGO_URI;
// console.log(MONGO_URI);

export const dbConnection = async () =>{
 const connection = await mongoose.connect("mongodb+srv://s4m1kgraj:yIETSz5sHKxVU6Oj@projmanagement.ypxtvcm.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
 });
 
 console.log("Mongodb connected", connection.connection.host);
}

