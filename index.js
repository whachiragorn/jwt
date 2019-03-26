var express = require('express')
var bodyparse = require("body-parser")
var jwt = require("jsonwebtoken")

var app = express()
app.use(bodyparse.json())

app.get('/api', function (req, res) {
    res.json({
        description: 'My API Please Autenticate!'
    })
})


app.get('/api/protected', ensureToken, (req,res)=>{
    jwt.verify(req.token,'secret_key_goes_here',function(err,data){
        if(err){
            res.sendStatus(403)
        }else{
            res.json({
                description: 'Protected Information. Congrats!',
                data: data
            })
        }
    })
})

app.post('/api/login', (req,res)=>{
    const user = {id:3}
    const token = jwt.sign({user: user.id},
        'secret_key_goes_here')
    res.json({
        message: 'Autenticated! Use this token in the "Autentication" header',
        token: token
    })
})

function ensureToken(req,res,next){
    const beareHeader = req.headers["authorization"]
    if(typeof beareHeader !== 'undefined'){
        const beareToken = bearer[1]
        req.token = beareToken
        next()
    }else{
        res.sendStatus(403)
    }
}

app.listen(3000, function(){
    console.log("App Listen on port 3000")
})