const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const redis = require('redis');
const redisStore = require('connect-redis')(session);
const client  = redis.createClient();
const router = express.Router();
const app = express();
const redis_port = 6379;
const host = 'localhost';

let login = require('./model/login_model.js');
let register = require('./model/register_model.js'); 


app.use(session({
    secret: 'secret',
    store: new redisStore({ host: host, port: redis_port, client: client,ttl : 260}),
    saveUninitialized: false,
    resave: false
}));

app.use(bodyParser.json());      
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

router.get('/',(req,res) => {
    let sess = req.session;
    if(sess.email) {
        return res.redirect('/cms');
    }
    res.sendFile('index.html');
});
router.post('/register',(req,res) => {
    register.register(req.body.email,req.body.password, function(err,data){
        if(!err){
            console.log('Registration Complete');
            // Start session
            res.end({'status':'ok','data':data});
        }else{
            console.log('Registration Error: ',err);
            res.end({'status':'err','data':false});
        }
    });
});
router.post('/login',(req,res) => {
    login.login(req.body.email,req.body.password, function(err,data){
        if(!err){
            console.log('Login Success');
            //Start session
            res.end({'status':'ok','data':data});
        }else{
            console.log('Login Error: ',err);
            res.end({'status':'err','data':false});
        }
    });
});

router.get('/cms',(req,res) => {
    if(req.session.email) {
        res.write(`<h1>Hello ${req.session.email} </h1><br>`);
        res.end('<a href='+'/logout'+'>Logout</a>');
    }
    else {
        res.write('<h1>Please login first.</h1>');
        res.end('<a href='+'/'+'>Login</a>');
    }
});

router.get('/logout',(req,res) => {
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.redirect('/');
    });

});


app.use('/', router);

app.listen(process.env.PORT || 3000,() => {
    console.log(`App Started on PORT ${process.env.PORT || 3000}`);
});