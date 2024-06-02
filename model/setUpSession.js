const session = require('express-session');

app.use(session({
  secret: 'secret',
  name:'root',
  resave: false,
  saveUninitialized: true
}))

function auth(req, res, next) {
    if (req.session.user) {
        console.log('authenticated');
        next();
    } 
    else {
        console.log('not authenticated');
        return res.redirect('/');
    }
}