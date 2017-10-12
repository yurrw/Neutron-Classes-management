/*----------------------------------------------------------------
 *	NEUTRON CLASSES'S MANAGEMENT
 *  Main Authors:  Yuri, Matheus Nunes
 *  Co-Authors  :  Renan Valani, Leonardo Noia
 *  Written:       08/2016
 *  Last updated:  11/10/2017
 *
 *----------------------------------------------------------------*/

var express     = require('express');               //  Handles express
var app         = express();

var port        = process.env.PORT || 3000;         //  Setting up apps' port

var passport    = require('passport');              //  Handles login
var flash       = require('connect-flash');         //  Handles flash-messages	

var morgan      = require('morgan');                //  Login's stuff
var bodyParser  = require('body-parser');
var session     = require('express-session');
var multer      = require('multer');                //  Handles photos' upload
//var cookieParser	=	require('cookie-parser');		  //

/*  CONFIGs  */
//  Handles logging request details
app.use(morgan('dev'));								
//app.use(cookieParser()); 							      //	cookies(autenticação e pá)

app.use(bodyParser.urlencoded({
    extended: true
}));

//  Set up json to be used
app.use(bodyParser.json());

//  Save flash messages
app.use(flash()); 									

/*Routes*/
//  Initialize PassPort middleware Auth
require('./config/passport')(passport);
app.use(session({ secret: 'ylrm'})); 				//TODO:: CHANGE IT 
app.use(passport.initialize());
app.use(passport.session());

//Set up view engine, ejs
app.set('view engine', 'ejs');	
app.use('/assets', express.static(__dirname + '/public'));
app.use('/uploads'	 , express.static(__dirname + '/uploads'));
//Join passport configs with routes
require('./routes')(app, passport);

//  Runs app
app.listen(port);											

console.log('Server running on port  :' + port);
