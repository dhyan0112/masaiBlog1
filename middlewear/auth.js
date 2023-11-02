const jwt = require("jsonwebtoken");

const auth = async(req, res, next) =>{

    let token = req.headers.authorization;
if(token){

    try {
         let decoded = jwt.verify(token, 'nil');

         if(decoded){
            req.body.Username = decoded.UserName
            next();
         
    }

        else{
            res.status(200).json({msg: "please login"})
        }
    } catch (error) {
        res.status(400).json({msg:error.msg})
    }
}
else{
    res.status(200).json({msg: "please login"})
}
}

module.exports = {auth}