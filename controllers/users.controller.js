import User from "../models/users.model.js";
import jwt from "jsonwebtoken";

const users = ["Raaz", "Samrat", "Roshan"];
export const getUsers = (req, res) => {
   //find all users from database
   res.status(200).json({
      status: true,
      data: users,
      message: "user fetched successfully"
   })
}

export const createUser = (req, res) => {
   const { name } = req.body;
   if (!name) {
      res.status(400).json({
         status: false,
         message: "Name is required"
      })
      return;
   }
   users.push(name);
   //save user in database logic

   res.status(200).json({
      status: true,
      users,
      message: "user created successfully"
   })
}

export const updateUser = (req, res) => {
   const { id } = req.params;
   const { name } = req.body;

   users[id] = name;
   
   res.status(200).json({
      status: true,
      users,
      message: "user updated successfully"
   })
}

export const deleteUser = (req, res) => {
   const { userId } = req.params;

   delete users[userId];

   res.status(200).json({
      status: true,
      users,
      message: "user deleted successfully"
   })
}

export const registerUser = async (req, res) => {
try {
   const { name, email, password } = req.body;

   const currentUser = await User.findOne({email});
if (!currentUser){
 // if (name && email && password) {
   const user =  new User(req.body);
   await user.save();

   res.status(200).json({
      status: true,
      data: user,
      message: "user created successfully"
   })
// }
}else{
   res.status(400).json({
      status: false,
      message:"Email already registered",
   })
}
   
} catch (error) {
   res.status(400).json({
      status: false,
      error: error.message,
   })
}
}

export const loginUser = async (req, res) => {
try {
   const { email, password } = req.body;

   const user = await User.findOne({email});

   if (!user) {
      return res.status(401).json({
         status: false,
         message: "Invalid email or password"
      })
   } else{
      const matchPassword = await user.matchPassword(password);
      console.log(matchPassword);
      if (matchPassword){

         const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: '1d'} )

         // const decryptToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
         // console.log(decryptToken);

         const updatedUser = await User.findOneAndUpdate(
            {_id: user._id},{
               $set:{ jwt:token },
            },{
                new:true
            }
         )
         console.log(updatedUser);

         return res.status(200).json({
            status: true,
            data: token,
            message: "User logged in successfully"
         })
      }else{
         return res.status(400).json({
            status: false,
            message: "Invalid password"
         })
      }
   }

   
} catch (error) {
   res.status(400).json({
      status: false,
      error: error.message,
   })
}
}