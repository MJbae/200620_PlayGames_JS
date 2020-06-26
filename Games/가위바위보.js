/*
200618_가위바위보_JS숙달

개선 필요 부분(by myself)
	- 결과 부분을 콘솔 log로 보여주지 말고 화면 상으로 출력하자
	- 출력 전체를 화면 중앙으로 정렬하자

주요한 개념
	- 하드코딩의 여지를 남기지 말 것. Object.entries를 사용하여 이를 방지한 것이 대표적인 예
	- SetInterval을 변수로 주고 이를 clearInterval과 setTimeout을 활용하여 비동기함수를 시간차에 따라 제어할 수 있음
	- 배열.includes로 ||(or) 관계를 줄일 수 있음
	- 특정 코드가 중복될 때, 그것이 변수들의 묶음이라면 이를 지칭하는 변수를 선언하여 코드를 간결하게 함

사용한 문법: dictionary, find와 indexOf의 차이,
	- 주로 다차원 배열에 사용, 배열.find는 반복문이나 매개변수에 해당하는 것을 찾으면 return
	- 반면 indexOf는 1차원 배열에 사용

*/



/*
가위바위보의 사전 자료형의 value 값에 접근하기 위해서는 아래와 같이 key와 value를 바꾼 사전을 선언할 수 있으나
가위바위보의 value를 바꾸면 가위바위보2의 key도 바꿔야 하는 문제가 생김
이를 해결하기 위해 함수 및 Object.entries를 사용함
var 가위바위보2 = {
	'0': 가위,
	'-170px': 바위,
	'-350px': 보
}
*/
//가위, 바위, 보 각각의 위치값을 px로 매칭한 dictionary
var 이미지좌표 = 0;
var 가위바위보 = {
	가위: '0',
	바위: '-170px',
	보: '-350px'
}

//Object.entries(가위바위보): 딕셔너리의 키와 밸류를 쌍으로 묶은 2차원 배열 생성, key 값을 반환함
function 컴퓨터의선택(이미지좌표){
	return Object.entries(가위바위보).find(function(v){
		//가위바위보의 value 값이 이미지좌표와 같을 때, key값을 반환함 
		return v[1] === 이미지좌표;
	})[0];
}

//
var 인터벌;
function 인터벌메이커() {
	인터벌 = setInterval(
	//img(id=computer)가 querySelector에 의해 0.1초 간격으로 삼분할된 부분의 각각이 출력됨
	function () {
	if(이미지좌표 === 가위바위보.바위){
		이미지좌표 = 가위바위보.가위;
	} else if (이미지좌표 === 가위바위보.가위) {
		이미지좌표 = 가위바위보.보;
	} else {
		이미지좌표 = 가위바위보.바위;
	}
	document.querySelector('#computer').style.background =
		'url(gameImage.png)'
		+ 이미지좌표 + ' 0';
	}, 100);
}

인터벌메이커();

//가위바위보의 규칙성을 표현하기 위한 변수를 dictionary를 활용하여 나타냄
var 점수표 = {
	가위: 1,
	바위: 0,
	보: -1
};

//가위, 바위, 보 등 3개 버튼 중 하나를 클릭하면 아래의 함수가 실행됨. querySelectorAll 메소드로 인해 btn class 모두 해당됨
document.querySelectorAll('.btn').forEach(function(btn){
	btn.addEventListener('click', function(){
		clearInterval(인터벌);
		setTimeout(function(){
			인터벌메이커();
		}, 2000);

		//this.textContent는 <button></button> 사이에 있는 것을 가리킴
		var 나의선택 = this.textContent;

		//중복되는 코드에 대해 변수를 선언
		var 나의점수 = 점수표[나의선택];
		var 컴퓨터점수 = 점수표[컴퓨터의선택(이미지좌표)];
		var 점수차 = 나의점수 - 컴퓨터점수

		if(점수차 === 0){
			console.log('비겼습니다.')
		// includes 이하의 조건에 따른 값이 [-1, 2] 배열의 요소 내 있으면 true
		} else if([-1, 2].includes(점수차)){
			console.log('이겼습니다!')
		} else {
			console.log('졌습니다...')
		}
	});
}); 