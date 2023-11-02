const express = require("express");

const BlogModel = require("../model/blogModel")

const blogRouter = express.Router();

blogRouter.post("/blogs", async (req,res) =>{

    try {
        const blog = new BlogModel(req.body);

        await blog.save();

        res.status(200).json({msg: "Blog posted", blog})
    } catch (error) {
        res.status(400).json({msg : error.msg})
    }
})


blogRouter.get("/blog", async (req,res) =>{
try {
    const {search, sort, filter} = req.query;

    if(search){
        const blogs = await BlogModel.find({Title: {$regex: search, $option: 'i'}})

        res.status(200).json(blogs)
    }

    if(sort){
        const order = (sort=='asc')?1:-1;

        const blogs = await BlogModel.find().sort({Data:order});

        res.status(200).json(blogs)
    }

    if(filter){
        const blogs = await BlogModel.find({Category:filter})
        res.status(200).json(blogs)

    }

    const blogs = await BlogModel.find()

    res.status(200).json(blogs)
} catch (error) {
    res.status(400).json({msg : error.msg})
}
   
})


blogRouter.patch("/blog/:id", async (req,res) =>{

    try {
        const {id} = req.params;

        const blog = BlogModel.findByIdAndUpdate(id, req.body);

        res.status(200).json({msg: "Blog updated suscefuuly"});
    } catch (error) {
        res.status(400).json({msg : error.msg})
    }

})

blogRouter.delete("/blog/:id", async (req,res) =>{

    try {
        const {id} = req.params;

        const blog = BlogModel.findByIdAndDelete(id);

        res.status(200).json({msg: "Blog Deleted suscefuuly"});
    } catch (error) {
        res.status(400).json({msg : error.msg})
    }

})

blogRouter.post("/blogs/:id/comment", async(req, res) =>{

    try {
        const {Title, UserName} = req.body;

        const {id} = req.params;

        const blog = await BlogModel.findById(id);

        let Comments = {
            Username:UserName, Title: Title
        }

        blog.Comment.push(Comments);
        const comBlog = await BlogModel.findByIdAndUpdate(id, blog)

        res.status(200).json(comBlog)
    } catch (error) {
        res.status(400).json({msg : error.msg})
    }
})




blogRouter.get("/like/:id", async (req,res)=>{
    try {
        const {id}=req.params;
        const data= await blogModel.findById(id);

        data.likes+=1;
        console.log(data);
        const newdata= await blogModel.findByIdAndUpdate(id,data);
        res.status(200).send({
            isError:false,
            message:"you liked this blog",
            data:data
        })
        
    } catch (error) {
        res.status(400).send({
            isError:true,
            message:error.message
        });
    }
});
blogRouter.post("/coment/:id", async (req,res)=>{
    try {
        const {title,name}=req.body;
        console.log(req.body);
        const {id}=req.params;
        const data= await blogModel.findById(id);
        let comentdata={
            username:name,title:title
        }
        
        data.comments.push(comentdata)
        
        const newdata= await blogModel.findByIdAndUpdate(id,data);
        res.status(200).send({
            isError:false,
            message:"you comment on this blog",
            data:data
        })
        
    } catch (error) {
        res.status(400).send({
            isError:true,
            message:error.message
        });
    }
})
module.exports = blogRouter;