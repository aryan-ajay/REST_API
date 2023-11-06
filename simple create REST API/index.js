const express = require("express");
let app = express();
const path = require("path");
const {v4 : uuidv4} = require('uuid');
let methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.set("views engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let port = 5000;
app.listen(port, ()=> {
    console.log("listening port : 5000");
});

let posts = [
    {
        id: uuidv4(),
        username: "apnacollege",
        content : "It is best platform to learn codeing"
    },
    {
        id: uuidv4(),
        username: "Aman",
        content : "It is best teacher for JEE"
    },
    {
        id: uuidv4(),
        username: "shardha",
        content : "It is best mam for coding"
    },
    {
        id: uuidv4(),
        username: "Ramesh",
        content : "It is best Engineering!"
    }

];


app.get("/post", (req, res) => {
    res.render("index.ejs" , {posts});
});

app.get("/post/new", (req, res)=>{
    res.render("new.ejs");
});

app.post("/post", (req, res)=> {
    let {username, content} = req.body;
    let id = uuidv4();
    posts.push({id, username, content});
    res.redirect("/post");
});

app.get("/post/:id", (req, res) =>{
    let {id} = req.params;
    let post = posts.find((p) => id == p.id);
    res.render("show.ejs", {post});
});

app.patch("/post/:id", (req, res) =>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    res.redirect("/post");
})

app.delete("/post/:id", (req, res)=>{
    let{id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/post");
})

app.get("/post/:id/edit", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => id == p.id);
    res.render("edit.ejs", {post});
})