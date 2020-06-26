/*
routing 모듈화 작업에 따른 client request, server response 순서는 다음과 같다
client request
1. form.html에서 1) 제출 submit 클릭 2) ajaxsend button 클릭
2. 1) /email/form 경로로 request 발생 2) /email/ajax 경로로 request 발생
3. app.js에서 1), 2) /email 경로 확인 후 router 모듈 사용에 따라 나머지 경로처리를 email.js로 넘김
4. email.js에서 1), 2) 나머지 경로 확인 후 경로에 맞추어 response 처리
*/
var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');

//app.js에 데이터베이스 관련 작업이 없으므로 mysql 모듈 및 관련 변수를 email.js로 이전
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'root',
	database: 'jsman'
});

connection.connect();


router.post('/form', function(req, res){
	//get 방식과 달리 post 방식에서는 
	//url이 아니라 폼의 action 경로를 request 값으로 받는다. 이에 대해 아래와 같이 response한다.
	//form.html의 input으로 받은 email 정보를 response하는데 이때 input태그의 name을 활용하여 서버에서 받는 것을 확인
	console.log(req.body.email);
	//res.send("<h1>welcom " + req.body.email + "</h1>");

	//email.ejs 파일에 두번째 인자를 전달함
	// 두번째 인자의 의미는 req.body.email로 받은 값을 email.ejs 내 email이란 변수를 찾아서 치환
	res.render('email.ejs', {'email' : req.body.email});

});

//json 형식으로 response 값을 처리함
router.post('/ajax', function(req, res){
	//client로부터 받은 email 정보를 받아옴
	var email = req.body.email;
	var responseData = {};

	//user table로부터 email이 client로부터 받은 email정보와 같은 데이터가 있다면 해당 데이터의 name정보를 select 
	var query = connection.query('select name from user where email="' + email + '"', function(err, rows){
		if(err) throw err;
		if(rows[0]){
			//입력 정보와 일치하는 데이터가 있다면 responseData에 아래와 같은 값을 넣고
			responseData.result = "ok";
			responseData.name = rows[0].name;
			//일치하는 데이터가 없으면 아래와 같이 값을 넣는다 
		}else{
			responseData.result = "none";
			responseData.name = "";
		}
		//res.json의 위치가 중요함. 비동기함수 안에 위치해야 위에서 처리한 데이터를 response할 수 있음
		res.json(responseData)
	})
});

module.exports = router