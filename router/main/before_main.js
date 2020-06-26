// main으로 들어온 url 처리를 main.js 별도의 파일을 통해 처리
//routing 관련 코드가 지속적으로 늘어날 경우를 대비하여 다음과 같이 처리
var express = require('express');
var app = express();
var router = express.Router();
//상대경로를 지정하기 위한 모듈
var path = require('path');

router.get('/', function(req, res){
	console.log('main.js loaded');
	//상대경로 처리를 해야 함(main.js와 main.html의 경로는 직속관계가 아님 ./router/main.js인 반면 main.html은 ./public/main.html)
	res.sendFile(path.join(__dirname, '../public/main.html'));
});

//router modul을 app.js에서 사용하기 위한 메소드
module.exports = router;