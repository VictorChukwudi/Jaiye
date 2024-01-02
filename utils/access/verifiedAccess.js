import User from "../../models/user/userModel.js"


const isVerified= async(id)=>{
    try {
        const user= await User.findById(id)
        if(!user.emailVerified){
            return false;
        }else{
            return true
        }
    } catch (error) {
        console.error(error)
    }
}

export {isVerified}