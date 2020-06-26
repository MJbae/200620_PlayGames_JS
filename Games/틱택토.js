/*
200616_JS숙달_틱택토
	
사용한 문법: 2차원 배열, targe, parentNode, forEach

console.log(이벤트.target); // 해당 칸
console.log(이벤트.target.parentNode); // 해당 줄
console.log(이벤트.target.parentNode.parentNode); // 해당 테이블

어려웠던 점: 틱택토의 승리조건인 같은 문자가 일렬로 나란히 표시되었을 때, 이를 인지하는 부분 구현

변경할 점: 승리 검사 시 단순한 조건문 활용한 것을 깔끔하고 효율적인 알고리즘 적용하여 변경해보자.
*/



//3*3 테이블을 만들어서 body에 append한다.

var 바디 = document.body;
var 테이블 = document.createElement('table');
var 줄들 = [];
var 칸들 = [];
var 턴 = 'X';
var 결과 = document.createElement('div');

//비동기콜백 함수를 본문에 합치면 코드가 지나치게 길어지므로 분리
var 비동기콜백 = function(이벤트) {
	//2차원 배열의 행란에 indexOF 메소드를 활용하여 행값을 var몇줄에 입력
	var 몇줄 = 줄들.indexOf(이벤트.target.parentNode);
	console.log('몇줄', 몇줄); 

	var 몇칸 = 칸들[몇줄].indexOf(이벤트.target);
	console.log('몇칸', 몇칸); 

	//테이블에 O, X를 표시하는 구간
	if (칸들[몇줄][몇칸].textContent !== '') { // 특정 칸이 이미 채워져있다면
		console.log('빈칸이 아닙니다.');
	}else{ // 빈칸일 경우, 주요 논리가 본 구간에서 실행됨
		console.log('빈칸입니다.');
		칸들[몇줄][몇칸].textContent = 턴;

	//빈칸이 채워지면 채워진 칸을 검사하여 승리여부 식별 
	//세칸이 일렬로 다 찬 경우를 세 가지로 분류하여 조건문으로 확인한다. 세 경우 중 하나라도 참이면 승리를 선언한다
	var 다참 = false;
	//가로줄(행) 검사
	if (칸들[몇줄][0].textContent === 턴 &&
		칸들[몇줄][1].textContent === 턴 &&
		칸들[몇줄][2].textContent === 턴
		) {
		다참 = true;
	}
	//세로줄(열) 검사
	if (칸들[0][몇칸].textContent === 턴 &&
		칸들[1][몇칸].textContent === 턴 &&
		칸들[2][몇칸].textContent === 턴
		) {
		다참 = true;
	}

	//대각선 검사, 가로 세로 검사와 달리, 위치의 인덱스가 행렬 간 같을 때만 검사한다
	if (몇줄 - 몇칸 === 0){
		if (칸들[0][0].textContent === 턴 &&
			칸들[1][1].textContent === 턴 &&
			칸들[2][2].textContent === 턴
		) {
			다참 = true;
		}
	}

	if (Math.abs(몇줄 - 몇칸) === 2){
		if (칸들[0][2].textContent === 턴 &&
			칸들[1][1].textContent === 턴 &&
			칸들[2][0].textContent === 턴
		) {
			다참 = true;
		}
	}

	//다참 === true면 승리를 선언한다
	if (다참){
		결과.textContent = 턴 + '님이 승리!';
		//승리 시 입력갑 초기화(forEach 구문 활용하여 2차원 배열 모든 요소 접근하여 값 수정)
		턴 = 'X';
		칸들.forEach(function (줄){
			줄.forEach(function(칸){
				칸.textContent = ''
			});
		});
	}else{ //승리조건 미충족 시 턴의 값을 반대 모양으로 바꿔주어 상대편 입력하도록 한다
		if (턴 === 'X') {
			턴 = 'O';
		}else{
			턴 = 'X';
		}
	}			
 }
};


for(var i = 1; i <= 3; i++){
	var 줄 = document.createElement('tr');
	줄들.push(줄);
	칸들.push([]);
	for(var j = 1; j <= 3; j++){
		var 칸 = document.createElement('td');
		칸.addEventListener('click', 비동기콜백);
		칸들[i - 1].push(칸);
		줄.appendChild(칸);
	}
	테이블.appendChild(줄);
}
바디.appendChild(테이블);
바디.appendChild(결과);
console.log('줄들', 줄들, '칸들', 칸들); 