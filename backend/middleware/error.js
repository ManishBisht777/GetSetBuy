const Errorhandler=require("../utils/errorhandler");

module.exports=(err,req,res,next)=>{
    const status=err.statusCode || 500;
    const message=err.message || "internal server error";

    // wrong mongodb id

    if(err.name==="CastError")
    {
        const message=`Resource not found. invalid: ${err.path}`;
        err=new Errorhandler(message,400);
    }

    res.status(status).json({
        success:false,
        message:message,
    })
}
