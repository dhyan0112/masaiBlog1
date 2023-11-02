
const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({

    Username:String,
    Title:String,
    Content:String,
    Category: String,
    Date: Date,
    Likes: Number,
    Comment : [{
        Username:String,
        Content:String
    }]

},
{
    versionKey:false
})

const BlogModel = mongoose.model("Blog", blogSchema)

module.exports = BlogModel;


// {
// "Title": "Be Present",
// "Content": "Turning away from the ledge, he started slowly down the mountain, deciding that he would, that very night, satisfy his curiosity about the man-house. In the meantime, he would go down into the canyon and get a cool drink, after which he would visit some berry patches just over the ridge, and explore among the foothills a bit before his nap-time, which always came just after the sun had walked past the middle of the sky. At that period of the day the sun’s warm rays seemed to cast a sleepy spell over the silent mountainside, so all of the animals, with one accord, had decided it should be the hour for their mid-day sleep.",
//     "Category" : "Entertainment",
//     "Date" : "2017-06-01",
//     "Likes" : 24,
//     "Comment" : [{ "Username" : req.body,"Content" : "Good One"}, {"Content" : "Loved It!"}]
// }