const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

    Username:String,
    Avatar:String,
    Email:String,
    Password: String
},
{
    versionKey:false
})

const UserModel = mongoose.model("User", userSchema)

module.exports = UserModel;



// {
//     "Username": "nilesh",
//     "Avatar":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRb0lOhuAbflByagOfYUg5R8F1zGO1aN4woA&usqp=CAU",
//     "Email":"n@gmail.com",
//     "Password":"1234"
// }

