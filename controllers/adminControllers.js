import User from "../models/user/userModel.js";
import { BADREQUEST, NOTFOUND, OK, SERVERERROR } from "../utils/statusCodes.js";


const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ isAdmin: false }).select(["-password"]);
    
    res.status(OK).json({
      status: "success",
      msg: "All users displayed",
      data: users,
    });
  } catch (error) {
    res.status(SERVERERROR).json({
      status: "error",
      msg: error.message,
    });
  }
};

const deleteUserById = async(req,res)=>{
  try {
    const id=req.params.id;
    console.log(id);
    const user= await User.findById(id);
    if(!user){
      res.status(NOTFOUND);
      throw new Error(`User with id: ${id} not found.`);
    }else{
      await User.findByIdAndDelete(id);
      res.status(OK).json({
        status:"success",
        msg: `User with id: ${id} deleted successfully`
      })
    }
  } catch (error) {
    res.json({
      status:"error",
      msg:error.message
    })
  }
}
const deleteUserByEmail = async(req,res)=>{
  try {
    const {email}=req.body;
    const user= await User.findOne({email});
    if(!user){
      res.status(NOTFOUND);
      throw new Error(`User with email: ${email} not found.`);
    }else{
      await User.findOneAndDelete({email});
      res.status(OK).json({
        status:"success",
        msg: `User with email: ${email} deleted successfully`
      })
    }
  } catch (error) {
    res.json({
      status:"error",
      msg:error.message
    })
  }
}

const makeAdmin= async(req,res)=>{
  try {
    const {email}=req.body
    if(!email){
      res.status(BADREQUEST)
      throw new Error("Email field cannot be empty")
    }
    const user= await User.findOne({email})
    if(!user){
      res.status(BADREQUEST)
      throw new Error(`User with email: ${email} does not exist.`)
    }else{
      const admin= await User.findOneAndUpdate({email},{isAdmin:true},{new:true}).select(["-password"]);
      res.status(OK).json({
        status:"success",
        msg:`User with email: ${email} and id: ${user._id} is now an admin.`,
        data:admin
      })
    }
  } catch (error) {
    res.json({
      status:"error",
      msg:error.message
    })
  }
}


export { getAllUsers, deleteUserById, deleteUserByEmail, makeAdmin };
