const Errorhandler=require("../utils/errorhandler");

module.exports=(err,req,res,next)=>{
    const status=err.statusCode || 500;
    const message=err.message || "internal server error";

    res.status(status).json({
        success:false,
        message:message,
    })
}
