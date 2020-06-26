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
	res.render('login.ejs', {'message': msg});
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
passport.use('local-login', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
		
		// db에서 email columns 내 입력 이메일 값과 중복여부 체크
		// done은 해당 비동기를 마무리하는 기능  
	}, function(req, email, password, done){
		var query = connection.query('select * from user where email=?', [email], function(err, rows){
			if(err) return done(err);

			// 입력값과 DB값이 일치하는 경우
			if(rows.length){
				return done(null, {'email' : email, 'id' : rows[0].UID})
			// 입력값과 DB값이 불일치할 경우 message를 아래 authenticate 내 function의 info 값으로 전달하여 출력함
			} else {
				return done(null, false, {'message' : 'your login info is not found'})
			}
		})
	}
));


//json형식의 response를 위한 customized 콜백함수 처리
router.post('/', function(req, res, next){
	passport.authenticate('local-login', function(err, user, info){
		if(err) res.status(500).json(err);
		if(!user) return res.status(401).json(info.message);

		req.logIn(user, function(err){
			if(err){return next(err);}
			return res.json(user);
		});

	})(req, res, next);
})


module.exports = router