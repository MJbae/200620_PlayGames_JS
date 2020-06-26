/*
200616_로또추첨기_JS숙달

개선 필요 부분(by myself)
	- 랜덤 알고리즘 도입하는 부분 ??
	- 로또 번호 입력하는 부분 + 당첨여부 출력하는 부분 ??

주요한 개념
	- HTML 태그의 특정 부분으로 JS 코드 넣기
	  <div id = "abc">의 경우, JS에서 getElementById("abc")
	  <div class = "123">의 경우, getElementsByClassName("123")[0]으로 받을 수 있다.
	  주의할 것은 id명은 중복될 수 없지만 class명은 중복될 수 있으므로 class로 받을 때는 배열처럼 인데스를 표기한다.
	  getElementById("abc") / getElementsByClassName("123")[0] / 후자는 Elements 복수형임
	  이외에도 getElementByTagName 활용 가능
	- 일부 공통된 부분이 있을 때, 함수를 사용하여 최소화 한다. 이 때 다른 부분은 매개변수로 주는 것이 know-how
	  L108 이하와 L140 이하를 비교하여 그 차이를 확인


사용한 문법: Array(x), fill 메소드, forEach, map, splice, sort, querySelector
	- Array와 fill
	 아래와 같이 배열을 선언하면 각 요소는 undefined 처리된다. 
	 [emtpy * 45] 상태로 메모리도 할당되지 않고 길이 정보만 주어짐
	 var 후보군 = Array(45);

	 각 요소에 특정 값이 입력된 것이 아니라 배열크기에 따른 메모리만 할당된 상태, undefined 45개가 할당됨
	 var 필 = 후보군.fill();

	- forEach
	 매개변수로 콜백함수를 받으며 해당 콜백함수의 매개변수의 첫번째 변수는 배열 각 요소의 value, 두번재 변수는 각 요소의 index

	- splice(start, count)
	 배열의 특정 인덱스(start)에서부터 순차적으로 count에 해당하는 개수를 잘라내어 반환함

	- sort(function(p, c){return p - c})
	 JS의 sort는 매개변수가 없으면 숫자의 첫번째 자릿수를 기준으로 정렬하여 요소 간 정렬이 안된다. 따라서
	 내부함수를 추가적으로 설정하는데 이 함수의 매개변수 p,c는 배열 각 요소의 앞뒤값으로
	 p - c 값이 0보다 작으면 앞뒤값을 바꾸고 크면 그대로 순서를 유지한다. 따라서 내림차순일 경우 c - p를 리턴한다.

*/

var 후보군 = Array(45)
	.fill()
	.map(function (요소, 인덱스) {
		return 인덱스 + 1;
	});
console.log(후보군)

// 후보군의 모든 요소에 대해 무작위로 한 개씩 선택하여 이동값에 넣고
// 셔플 배열 이동값이 순차적으로 삽입되어 이루어진 무작위 수의 배열
var 셔플 = []
while(후보군.length > 0){
	var 이동값 = 후보군.splice(Math.floor(Math.random() * 후보군.length), 1)[0];
	셔플.push(이동값);	
}
console.log(셔플);

//보너스 숫자는 무자위 배열(셔플)의 마지막 요소
var 보너스 = 셔플[셔플.length - 1];

//무작위 배열(셔플)의 첫 5개 요소를 당첨숫자로 지정
//당첨숫자는 오름차순으로 정렬
var 당첨숫자들 = 셔플
	.splice(0, 6)
	.sort(function(p, c){
		return p - c;
	});

console.log(당첨숫자들, 보너스)





//querySelector 메소드를 사용하면 Id와 클래스의 구분을 css문법에 따라 각각 #과 .으로 가능함
//var 결과창 = document.getElementById('결과창');
var 결과창 = document.querySelector('#결과창');

function 공색칠하기(결과창, 당첨숫자){
	var 공 = document.createElement('div');
	공.textContent = 당첨숫자;
	공.style.display = 'inline-block';
	공.style.border = '1px solid black'; 
	공.style.borderRadius = '10px';
	공.style.width = '20px';
	공.style.height = '20px';
	공.style.textAlign = 'center';
	공.style.marginRight = '10px'
	//각 div 공 태그에 class를 당첨숫자로 설정할 수 있다. 하지만 class라는 변수명은
	//JS에서 중요한 이름이므로 JS에서는 해당 이름을 className으로 명칭함 
	공.className = '공아이디' + 당첨숫자;
	var 배경색;
	if(당첨숫자 <= 10){
		배경색 = 'red';
	} else if(당첨숫자 <= 20){
		배경색 = 'orange';
	} else if(당첨숫자 <= 30){
		배경색 = 'yellow';
	} else if(당첨숫자 <= 40){
		배경색 = 'blue';
	} else {
		배경색 = 'green';
	}
	공.style.background = 배경색;
	결과창.appendChild(공);	
}


//1초 주기로 <div id='결과창'>에 당첨숫자 배열의 모든 요소가 출력됨
//반복문 안에 비동기콜백함수를 사용하면 closer 문제가 발생하여 아래와 같이
//코드를 풀어서 작성함 
setTimeout(function 비동기콜백함수(){
	공색칠하기(결과창, 당첨숫자들[0])
}, 1000);//밀리초 단위

setTimeout(function 비동기콜백함수(){
	공색칠하기(결과창, 당첨숫자들[1])
}, 2000);

setTimeout(function 비동기콜백함수(){
	공색칠하기(결과창, 당첨숫자들[2])
}, 3000);

setTimeout(function 비동기콜백함수(){
	공색칠하기(결과창, 당첨숫자들[3])
}, 4000);

setTimeout(function 비동기콜백함수(){
	공색칠하기(결과창, 당첨숫자들[4])
}, 5000);

setTimeout(function 비동기콜백함수(){
	공색칠하기(결과창, 당첨숫자들[5])
}, 6000);
	
//var 보너스칸 = document.getElementsByClassName('보너스')[0];
var 보너스칸 = document.querySelector('.보너스');
setTimeout(function 비동기콜백함수(){
	공색칠하기(보너스칸, 보너스)	
}, 7000);


/*
setTimeout(function 비동기콜백함수(){
	var 공 = document.createElement('div');
	공.textContent = 당첨숫자들[0];
	공.style.display = 'inline-block';
	공.style.border = '1px solid black'; 
	공.style.borderRadius = '10px';
	공.style.width = '20px';
	공.style.height = '20px';
	공.style.textAlign = 'center';
	결과창.appendChild(공);	
}, 1000);//밀리초 단위

setTimeout(function 비동기콜백함수(){
	var 공 = document.createElement('div');
	공.textContent = 당첨숫자들[1];
	공.style.display = 'inline-block';
	공.style.border = '1px solid black';
	공.style.borderRadius = '10px';
	공.style.width = '20px';
	공.style.height = '20px';
	공.style.textAlign = 'center';
	결과창.appendChild(공);	
}, 2000);

setTimeout(function 비동기콜백함수(){
	var 공 = document.createElement('div');
	공.textContent = 당첨숫자들[2];
	공.style.display = 'inline-block';
	공.style.border = '1px solid black';
	공.style.borderRadius = '10px';
	공.style.width = '20px';
	공.style.height = '20px';
	공.style.textAlign = 'center';
	결과창.appendChild(공);	
}, 3000);

setTimeout(function 비동기콜백함수(){
	var 공 = document.createElement('div');
	공.textContent = 당첨숫자들[3];
	공.style.display = 'inline-block';
	공.style.border = '1px solid black';
	공.style.borderRadius = '10px';
	공.style.width = '20px';
	공.style.height = '20px';
	공.style.textAlign = 'center';
	결과창.appendChild(공);	
}, 4000);

setTimeout(function 비동기콜백함수(){
	var 공 = document.createElement('div');
	공.textContent = 당첨숫자들[4];
	공.style.display = 'inline-block';
	공.style.border = '1px solid black';
	공.style.borderRadius = '10px';
	공.style.width = '20px';
	공.style.height = '20px';
	공.style.textAlign = 'center';
	결과창.appendChild(공);	
}, 5000);

setTimeout(function 비동기콜백함수(){
	var 공 = document.createElement('div');
	공.textContent = 당첨숫자들[5];
	공.style.display = 'inline-block';
	공.style.border = '1px solid black';
	공.style.borderRadius = '10px';
	공.style.width = '20px';
	공.style.height = '20px';
	공.style.textAlign = 'center';
	결과창.appendChild(공);	
}, 6000);
	
setTimeout(function 비동기콜백함수(){
	var 보너스칸 = document.getElementsByClassName('보너스')[0];
	var 보너스공 = document.createElement('div');
	보너스공.textContent = 보너스;
	보너스공.style.display = 'inline-block';
	보너스공.style.border = '1px solid black';
	보너스공.style.borderRadius = '10px';
	보너스공.style.width = '20px';
	보너스공.style.height = '20px';
	보너스공.style.textAlign = 'center';
	보너스칸.appendChild(보너스공);	
}, 7000);
*/





