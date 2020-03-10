const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const redis = require('redis');
const redisStore = require('connect-redis')(session);
const client  = redis.createClient();
const router = express.Router();
const app = express();
const gitlog = require('gitlog');

const redis_port = 6379;
const host = 'localhost';

app.use(session({
    secret: 'secret',
    store: new redisStore({ host: host, port: redis_port, client: client,ttl : 260}),
    saveUninitialized: false,
    resave: false
}));

app.use(bodyParser.json());      
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
    const options =
    { repo: '/home/mario/Desktop/nodejsProjects/conf_app' //Path is relative to the current folder
    , number: 20
    , author: 'Mario Ruci'
    , fields:
      [ 'hash'
      , 'abbrevHash'
      , 'subject'
      , 'authorName'
      , 'authorDate'
      ]
    , execOptions:
      { maxBuffer: 1000 * 1024
      }
    };

// Asynchronous (with Callback)
gitlog(options, function(error, commits) {
  // Commits is an array of commits in the repo
  console.log(commits)
});

router.get('/',(req,res) => {
    



    let sess = req.session;
    if(sess.email) {
        return res.redirect('/cms');
    }
    res.sendFile('index.html');
});

router.post('/login',(req,res) => {
    console.log(req.body);
    req.session.email = req.body.email;
    res.end('done');
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