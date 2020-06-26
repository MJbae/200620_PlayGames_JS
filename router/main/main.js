// main으로 들어온 url 처리를 main.js 별도의 파일을 통해 처리
//routing 관련 코드가 지속적으로 늘어날 경우를 대비하여 다음과 같이 처리
var express = require('express');
var app = express();
var router = express.Router();
//상대경로를 지정하기 위한 모듈
var path = require('path');

// main page는 login한 경우에만 접근 가능
router.get('/', function(req, res){
	// 세션 과정에서 얻은 아이디로 로그인 여부 확인 가능
	var id = req.user;
	// 아이디 정보가 없다면 login.ejs로 rendering 
	if(!id) res.render('login.ejs');
	res.render('main.ejs', {'id' : id});
});

//router modul을 app.js에서 사용하기 위한 메소드
module.exports = router;