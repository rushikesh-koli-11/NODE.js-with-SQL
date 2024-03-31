const { faker } = require('@faker-js/faker');
const mysql=require('mysql2');
const express=require("express");
const app= express();
const path = require("path");
const methodOverride =require("method-override");

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"/views"));

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    database:'delta_app',
    password:'979899'
});

let getRandomUser = ()=> {
    return [
      faker.string.uuid(),
      faker.internet.userName(),
      faker.internet.email(),
      faker.internet.password(),
    ];
  }

//home route
app.get("/",(req,res)=>{
    let q="select count(*) from user;";
    try{
        connection.query(q,(err,result)=>{
            if(err) throw err;
            let count = result[0]["count(*)"];
            res.render("home.ejs",{count});
        });
    }catch(err){
        console.log(err);
        res.send("some error in DB");
    }
    connection.end();
    
})

//show route
app.get("/user",(req,res)=>{
    let q="select * from user";

    try{
        connection.query(q,(err,users)=>{
            if(err) throw err;
            //console.log(result);
            res.render("showusers.ejs",{users});
        });
    }catch(err){
        console.log(err);
        res.send("some error in DB");
    }
    connection.end();
});


//edit route
app.get("/user/:id/edit",(req,res)=>{
    let {id}=req.params;
    let q=`select * from user where id='${id}'`;
    try{
        connection.query(q,(err,result)=>{
            if(err) throw err;
            //console.log(result);
            let user = result[0];
            res.render("edit.ejs",{user});
            console.log(result[0]);
        });
    }catch(err){
        console.log(err);
        res.send("some error in DB");
    }
    
});


//update route
app.patch("/user/:id",(req,res)=>{
    res.send("updated");
});


app.listen("8080",()=>{
    console.log("server is lisining");
})


