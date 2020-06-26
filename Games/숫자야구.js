/*
200614_JS숙달_숫자야구
	
사용한 메소드: join, split, indexOf

새로 배운 개념: 비동기란 순서대로 실행되지 않은 코드 ex) 버튼  클릭에 따른 콜백함수

어려웠던 점
- 정답인 경우와 오답인 경우 각각의 경우 초기화해주는 변수가 다르다. 정답인 경우 사용자 입력값과 랜덤값만 초기화하지만
  오답인 경우 answerlist(입력값의 배열)만 초기화한다. 위의 두 값을 초기화하면 오류가 발생한다. 
*/

var htmlBody = document.body;

var randomList = [];

//무작위로 수를 생성할 때, 기존 randomList를 비우고 새로 값을 입력한다. 
function generateNum(){
	randomList = [];
	for (var i = 0; i < 4; i += 1){
	var selection = Math.ceil(Math.random() * 9);
	randomList.push(selection);
	}
}

generateNum();
console.log(randomList)


//html 태그를 JS로 구현함
var showInput = document.createElement('h1');
htmlBody.append(showInput);

var formTag = document.createElement('form');
htmlBody.append(formTag);

var inputSpot = document.createElement('input');
formTag.append(inputSpot);

//입력값을 다음과 같이 제한한다. 타입은 문자, 길이는 4
inputSpot.type = 'text';
inputSpot.maxLength = 4;

var inputButton = document.createElement('button');
inputButton.textContent = '입력';
formTag.append(inputButton);

//오답 체크 변수 선언
var wrongNum = 0;

formTag.addEventListener('submit', function sampleCallBack(eventVar){
	eventVar.preventDefault();
	var answer = inputSpot.value;

	// 배열 내 각 요소의 값을 이어붙여 문자열로 만들 때, 아래와 같이 join을 사용함
	// 반면 문자열 각 요소의 값을 배열로 만들 때, split을 사용함
	if (answer === randomList.join('')){

		//정답일 경우 출력값
		showInput.textContent = '홈런';
		
		//재입력 받기 위해 기존 입력값 및 랜덤값 변수를 초기화함. 더불어 focus 메소드를 사용하여 마우스 사용 없이 입력창 사용하
		inputSpot.value = '';
		inputSpot.focus();
		generateNum();

	} else {
		//문자열 answer의 각 문자를 answerList의 각 요소로 전환
		var answerList = answer.split('');
		var strikeNum = 0;
		var ballNum = 0;

		wrongNum++;
		if(wrongNum > 3){
			showInput.textContent = "3번 넘게 틀림! 답은 " + randomList.join(',') + "입니다. ";

			//정답과 같은 초기화
			inputSpot.value = '';
			inputSpot.focus();
			generateNum();
			wrongNum = 0;

		}else{
			console.log("test1 " + wrongNum + showInput.textContent);

			for(var i = 0; i < 4; i++){
				//split 사용 시 answerList에 저장되는 각 요소의 타입은 문자이므로 
				//randomLisst의 각 요소와 비교하기 위해서는 숫자로 typecasting을 해야함 
				if(Number(answerList[i]) === randomList[i]){
					strikeNum++;
					//indoexOf 메소드의 기능은 매개변수로 입력 받은 값이 해당 배열 안에 있으면,
					//매칭되는 수의 인덱스를 반환한다. 없으면 -1을 반환함
				}else if(randomList.indexOf(Number(answerList[i])) > -1){
					ballNum++;
				}
			}
			
			//오답일 경우 출력값
			showInput.textContent = strikeNum + '스크라이크 ' + ballNum + '볼입니다.';

			//answerlist를 초기화하여 재입력한 입력값을 배열화할 때 재활용함 
			inputSpot.value = '';
			inputSpot.focus();
		}
	}

});