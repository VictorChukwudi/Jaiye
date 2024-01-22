import { UNAUTHORIZED } from "../utils/statusCodes.js";


//Admin Authorization Access
const adminMiddie = async (req, res, next) => {
    try {
        if(!req.user.isAdmin){
            res.status(UNAUTHORIZED)
            throw new Error("Only admin can access this route");
        }else{
            next()
        }
    } catch (error) {
        res.json({
            status:"error",
            msg:error.message
        })
    }
};



export { adminMiddie};
