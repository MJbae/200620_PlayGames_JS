/*
routing 모듈화 작업에 따른 client request, server response 순서는 다음과 같다
client request
1. form.html에서 1) '제출' submit 클릭 2) 'ajaxsend' button 클릭
2. 1) /email/form 경로로 request 발생 2) /email/ajax 경로로 request 발생
3. app.js에서 router 모듈 확인 후 router/index.js에서 경로 탐색
3. index.js에서 1), 2) /email 경로 확인 후 router 모듈 사용에 따라 나머지 경로처리를 email.js로 넘김
4. email.js에서 1), 2) 나머지 경로 확인 후 경로에 맞추어 response 처리
*/
var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var main = require('./main/main')
var email = require('./email/email')
var join = require('./join/index')
var login = require('./login/index')
var logout = require('./logout/index')

router.get('/', function(req, res){
	res.sendFile(path.join(__dirname, '../IntroGame.html'));
});

router.use('/main', main);
router.use('/email', email);
router.use('/join', join);
router.use('/login', login);
router.use('/logout', logout);

module.exports = router;