var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');

// 인증 모듈 불러오기
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var flash = require('connect-flash');

var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'root',
	database: 'jsman'
});
connection.connect()

// 'localhost:3000/join' 본 경로로 request가 오면 
// routing을 걸쳐 아래의 메소드로 이동
router.get('/', function(req, res){ 
	var msg;
	var errMsg = req.flash('error')
	if(errMsg) msg = errMsg;
	res.render('join.ejs', {'message': msg});
});


//인증 세션 잘 처리되면, serializeUser 메소드로 관련 정보 저장
passport.serializeUser(function(user, done){
	console.log('passport session save : ', user.id)
	done(null, user.id)
})

// 세션정보 요청이 있을 때, deserializeUser 메소드에서 관련 정보를 전달함
passport.deserializeUser(function(id, done){
	console.log('passport session get id: ', id)
	done(null, id);
})


// local db 기반 인증모듈 환경
// 실제 인증절차는 아래의 메소드에서 진행 
passport.use('local-join', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
		
		// db에서 email columns 내 입력 이메일 값과 중복여부 체크
		// done은 해당 비동기를 마무리하는 기능  
	}, function(req, email, password, done){
		var query = connection.query('select * from user where email=?', [email], function(err, rows){
			if(err) return done(err);

			// 중복된 email 주소 입력 시, 아래의 메세지를 done 메소드의 매개변수로 넣고 /join으로 redirect되면 다시
			if(rows.length){
				console.log('existed user')
				// done에 false를 매개변수로 입력하면 passport.authenticate에서 failureRedirect로 연결함
				return done(null, false, {message : 'your email is already used'})
			// 중복되지 않은 email 주소 입력 시, db에 email과 id 정보를 insert
			} else {
				var sql = {email: email, pw:password};
				var query = connection.query('insert into user set ?', sql, function(err, rows){
					return done(null, {'email' : email, 'id' : rows.insertId})
				})

			}
		})
	}
));

// '/join' 경로로 들어와서 인증절차 따른 후 결과를 반환하는 과정
// 인증결과가 성공하면 '/main' 경로로 보내고 실패하면 다시 '/join'으로 보냄
router.post('/', passport.authenticate('local-join', {
	successRedirect: '/main',
	failureRedirect: '/join',
	failureFlash: true })
)


/*
router.post('/', function(req, res){ 
var body = req.body;
var email = body.email;
var name = body.name;
var password = body.password;
*/

/*
set을 사용하여 query escaping 가능
아래의 sql문이 본문과 같이 간결해지는 것을 확인 가능, set 생성 시 query 변수가 키가 되고, value는 js 변수가 된다
insert into user (email, name, pw) values ("' + email + '", "' + name + '", "' + password + '")'

var sql = {email : email, name : name, pw : password};
var query = connection.query('insert into user set ?', sql, function(err, rows){
		if(err) {throw err;}
		//client에게 welcome.ejs를 response함
		else res.render('welcome.ejs', {'name' : name, 'id' : rows.insertId})
	})
	
})
*/
module.exports = router