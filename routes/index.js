var express = require('express');
var router = express.Router();
    Parse = require('parse').Parse;
    var session = require('express-session');
var cookieParser = require('cookie-parser');

router.use(function (req, res, next) {
  if(req.session.user){
     res.locals = {
       user: JSON.stringify(req.session.user)
     };
  }
  else{
     res.locals = {
       user: null
     };
  }

   next();
});


/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'hello'});

});

/* GET Login/Register page. */
router.get('/login', function(req, res, next) {
	if(req.session.user != null){
		res.redirect('/account')
	}
	else{
		res.render('login', { title: 'Express' });
	}
  
});

/* GET Account page. */
router.get('/account', function(req, res, next) {
	if(req.session.user != null){
		res.render('account', { user: JSON.stringify(req.session.user) });
	}
	else{
		res.redirect('/login')
	}
  
});


//LOGIN



//REGISTER
router.post('/signup', function(req, res) {
	Parse.User.enableUnsafeCurrentUser();
	var user = new Parse.User();	
	var pass = req.body.pass
	var email = req.body.email
	
	user.set("username",email);
	user.set("password",pass);
	user.set("email",email);
	user.signUp(null,{
		success:function(user){
			req.session.user = JSON.stringify(user);
			req.session.token = user._sessionToken;
			Parse.User.become(req.session.token, null)
			console.log('*****user*******'+JSON.stringify(Parse.User.current()))
			res.send(JSON.stringify(user));

		},
		error:function(user,error){
			res.send(JSON.stringify(error));
		}})
});




module.exports = router;
