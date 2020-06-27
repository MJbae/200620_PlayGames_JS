
//require의 기능은 node_modules에서 매개변수로 받는 파일에서 함수를 불러옴
var express = require('express');
var app = express();

//bodyparser를 사용하기 위한 객체생성 및 require
var bodyParser = require('body-parser');
var router = require('./router/index');

//인증관련 모듈 불러오기
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var flash = require('connect-flash');

app.use(flash())


// 서버를 작동시키는 메소드
// listen은 3000포트 기반으로 다음의 함수를 실행시킴, listen의 특징은 응답을 받기 전까지 대기한다는 것
// listen은 비동기적으로 실행된다. 다시 말해, 아래 end of server code 부분이 동기적으로 스택에 쌓여 있다가 먼저 실행되고
// 추후 비동기 콜백함수인 listen이 실행된다. 
app.listen(3000, function(){
	console.log("start!! express server on port 3000")
});

/*
app.use 사용에 따라 express.static이나 bodyParser의 기능사용이 확장되어 email.js에서도 해당 기능을 사용할 수 있음
*/
//js, css, img 등과 같은 static 자료를 인식하기 위해 아래와 같이 해당 자료들이 들어갈 폴더명을 
//static의 인자로 전달한다. 
app.use(express.static('public'));
//bodyparser 사용 시 클라이언트에서 오는 응답이 json형태일 수도 있고 
//json이 아닌 encoding 형태로 올 수 있음. encoding의 예로 아스키 형태 외의 한글 들의 경우
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
//view 엔진으로 ejs를 사용함, view 사용 시 지정된 dir를 사용(views)
//set 메소드는 use와 사용이 다름, 첫번째 인자가 두번째 인자를 대신 지칭함을 표현
app.set('view engine', 'ejs');

/*
인증 관련 모듈 환경설정
*/
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true
}))
 app.use(passport.initialize());
 app.use(passport.session());

/*
url routing에 대하여
get 함수에 경로와 콜백함수를 전달한다. 이 함수도 비동기함수이다. 
html 태그를 함께 보내면 브라우저가 해석하여 반영한다. 
*/
app.use(router)


