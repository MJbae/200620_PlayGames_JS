var inNum1 = Math.ceil(Math.random() *9);
var inNum2 = Math.ceil(Math.random() *9);
var resultNum = inNum1 * inNum2;

var htmlBody = document.body;

var showInput = document.createElement('div');
showInput.textContent = String(inNum1) + ' 곱하기 ' + String(inNum2) + ' 는?';
htmlBody.append(showInput);

var formTag = document.createElement('form');
htmlBody.append(formTag);

var inputSpot = document.createElement('input');
formTag.append(inputSpot);

var inputButton = document.createElement('button');
inputButton.textContent = '입력';
formTag.append(inputButton);

var resultMessage = document.createElement('div');
htmlBody.append(resultMessage);
/**/

formTag.addEventListener('submit', function sampleCallBack(eventVar){
    eventVar.preventDefault();
    //inputSpot.value로 받은 값은 문자열이기 때문에 number로 타입변경을 해야 한다 
    //디버깅하는 방법으로 console.log를 통해 각각의 값을 입력 받아서 웹브라우저 콘솔창으로 비교해본다. 
    if (resultNum === Number(inputSpot.value)){
            resultMessage.textContent = '딩동댕';
            inNum1 = Math.ceil(Math.random() *9);
			inNum2 = Math.ceil(Math.random() *9);
			resultNum = inNum1 * inNum2;
			showInput.textContent = String(inNum1) + ' 곱하기 ' + String(inNum2) + ' 는?';
			inputSpot.value = '';
            inputSpot.focus();
    } else {    
            resultMessage.textContent = '땡';
			inputSpot.value = '';
            inputSpot.focus();
    }
});