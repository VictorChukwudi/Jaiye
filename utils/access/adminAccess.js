import User from "../../models/user/userModel.js"


const adminControl= async(id)=>{
    try {
        const user= await User.findById(id)
        if(!user.isAdmin){
            return false;
        }else{
            return true
        }
    } catch (error) {
        console.error(error)
    }
}

export {adminControl}