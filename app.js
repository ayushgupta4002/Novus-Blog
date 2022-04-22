const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");


const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
var title="";
mongoose.connect("mongodb+srv://Ayush:<password>@cluster0.fohsg.mongodb.net/<Database>", {useNewUrlParser: true});

const postSchema = {

    title: String, 
    img: String,
    imgblog: String,
    rdtime:String,
    content: String
   
   };

   const reviewschema = {

    review: String
   
   };   
   const userschema = {

    UserTitle: String, 
    UserContent: String


   };   
   const Postmodel = mongoose.model("Postcollection", postSchema);
   const reviewmodel = mongoose.model("reviewcollection", reviewschema);
   const usermodel = mongoose.model("userDataCollection", userschema);


   app.get("/",function(req,res){
    Postmodel.find({}, function(err, posts){

        res.render("index", {
     
   
     
          posts: posts,
          
     
          });
     
      })
})
app.get("/composepost",function(req,res){
    res.render("compose",{
       
    });
});

app.post("/review",(req,res)=>{
  const Review = new reviewmodel({

    
    review: req.body.review
})
Review.save();
res.redirect("/");
})

app.post("/composepost",function(req,res){
    const Post = new Postmodel({
        title:req.body.postTitle,
        content:req.body.postBody,
        img:req.body.imglink,
        rdtime:req.body.rdtime,
        imgblog:req.body.imglinkblog
    });
 
    Post.save(function(err){

        if (!err){
     
          res.redirect("/");
     
        }
     
      });
  
})
app.get("/post/:postId", function(req, res){

    const requestedPostId = req.params.postId;
    
      Postmodel.findOne({_id: requestedPostId}, function(err, post){
     
     
        res.render("blog",{
            post:post
        })

      });
    
    });
    

    app.get("/contactuser",function(req,res){
      res.render("contactuser",{
         
      })
    })


    app.post("/contactuser",function(req,res){
 
      const userInfo =new usermodel({
    
       UserTitle: req.body.Usertitle,
       UserContent:req.body.userbody
      
    });
    userInfo.save(function(err){
    
      if (!err){
    
        res.redirect("/");
    
      }
    
    });
    })
    
 

  app.get("/about",(req,res)=>{
      res.render("about");
  })

app.listen(8000, function() {
    console.log("Server started on port 5000");
  });
  
