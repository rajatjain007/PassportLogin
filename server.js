const { urlencoded } = require('express')
const express = require('express')
const app = express()
const bcrypt = require("bcrypt")
const users = []

app.set("view-engine",'ejs')
app.use(urlencoded({extended:false}))

app.get('/',(req,res)=>{
    console.log("Server up and running");
    res.render('index.ejs')
})

app.get('/login',(req,res)=>{
    
    res.render('login.ejs')
})

app.get('/register',(req,res)=>{
    
    res.render('register.ejs')
})

app.post('/register',async(req,res)=>{
    
    try{
        const hashedPassword = await bcrypt.hash(req.body.password,10)
        users.push({
            id:Date.now.toString(),
            name:req.body.name,
            email:req.body.email,
            password:req.body.hashedPassword
        })
        
        res.redirect('/login')
    }
    catch{
        res.redirect('/register')
    }
    console.log(users)  
})

app.post('/login',(req,res)=>{
    
})


app.listen(3000)