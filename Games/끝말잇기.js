/*
document 객체를 활용하여 스크립트언어(js)를 통해 HTML 태그를 다는 방법이다.
document 객체 선언 후 해당 객체를 활용하여 div input button을 생성하고
각각 document 객체에 append하여 저장한다. 
*/
var htmlBody = document.body;

//first Input 값을 문자열 "배만진"으로 초기화하여 화면에 보여준다.
//*** 태그 안에 들어가는 값은 textContent로 받아서 사용하고
//사용자 입력에 따른 값은 value로 받아서 사용한다 
var showInput = document.createElement('div');
showInput.textContent = '배만진';
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


/*
form 태그의 addEventListener의 경우 click이 아닌 submit을 매개변수로 받는데, 
본 기능은 엔터키를 눌러도 작동할 수 있다. 
form에서 submit의 기본 동작은 다음과 같다. 엔터키 입력 시 기본동작으로 새로고침과 페이지 넘김을 수행한다. 
아래 preventDefault는 함수는 위의 기본동작을 실행하지 않는 것이다.
*/
formTag.addEventListener('submit', function sampeCallBack(eventVar){
    eventVar.preventDefault();
    if (showInput.textContent[showInput.textContent.length-1] === inputSpot.value[0]){
            resultMessage.textContent = '딩동댕';
            showInput.textContent = inputSpot.value;
            inputSpot.value = '';
            //input element의 메소드 중 하나로, 마우스 커서를 입력창에 대고 클릭을 하지 않아도 입력 받을 수 있는 기능.
            inputSpot.focus();
    } else {    
            resultMessage.textContent = '땡';
            inputSpot.focus();
    }
});




/*
//button을 click하면 function이 동작하는데, 
//해당 function을 콜백함수라 한다. 
inputButton.addEventListener('click', function sampeCallBack(){
    if (showInput.textContent[showInput.textContent.length-1] === inputSpot.value[0]){
            resultMessage.textContent = '딩동댕';
            showInput.textContent = inputSpot.value;
            inputSpot.value = '';
            //input element의 메소드 중 하나로, 마우스 커서를 입력창에 대고 클릭을 하지 않아도 입력 받을 수 있는 기능.
            inputSpot.focus();
    } else {    
            resultMessage.textContent = '땡';
            inputSpot.focus();
    }
});
*/