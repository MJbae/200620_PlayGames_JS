
var data = [
  {
    text: 'JavaScript 공부하기',
    isCompleted: true,
  },
  {
    text: 'TypeScript 공부하기',
    isCompleted: false,
  },
  {
    text: 'React-redux 공부하기',
    isCompleted: true,
  },
];
var wish = [
  {
    text: '캠핑카로 전국일주',
    isCompleted: false,
  },
  {
    text: '제주에서 한 달 살기',
    isCompleted: true,
  },
  {
    text: '독립하기',
    isCompleted: false,
  },
];

// 데이터 유효성 검사
function CheckDataFormat(todoList) {
  if (!todoList.length) {
    throw new Error('array is empty!');
  }
  // Falsy 검사 및 array 여부 검사
  if (!todoList || !Array.isArray(todoList)) {
    throw new Error('invalid data format!');
  }
  // todoList 모든 요소가 text 필드 보요 여부 확인 
  if (!todoList.some((todo) => todo.hasOwnProperty('text'))) {
    throw new Error('text property all undefined!');
  }
}

// error UI 구현, TODO: 해당 function 동작원리 상태 확인
function renderErrorNotification(errorMessage, elementId) {
  console.error(errorMessage);
  document.querySelector(
    `#${elementId} .content`
  ).innerHTML = `리스트 형식을 다시 확인해주세요 :)`;
}

function TodoApp(todoList, elementId) {
  console.log('start TodoApp')
  // this 프로퍼티 정의, todoList 렌더링 및 리렌더링 기능 정의
  this.todos = todoList;
  this.elelmentId = document.querySelector(`#${elementId}`);
  // TODO: .content의 기능은? css 내 content 접근?? 어떤 효과?
  this.listDom = document.querySelector(`#${elementId} .content`);

  this.render = () => {
    console.log('start render')
    this.listDom.innerHTML = this.todos
      .map((todo) => {
        // TODO: 아래 배열 구문은 어떤 쓰임?
        const { text, isCompleted = false } = todo;

        if (!text) {
          return;
        }
        return isCompleted
          ? `<li><s>${text}</s><button type="text" name="deleteList"></button></li>`
          : `<li>${text}<button type="text" name="deleteList"></button></li>`;
      })
      .join('');
    this.listEditor();
  };

  this.setState = (nextData) => {
    CheckDataFormat(nextData);
    this.todos = nextData;
    this.listDom.innerHTML = '';
    this.render();
  };

  this.listEditor = () => {
    // addList
    console.log('start addList')
    this.elelmentId
      .querySelector('input[name="addList"]')
      .addEventListener('keyup', (event) => {
        // 작성한 목록이 있고, enter를 눌렀을 때 add list 후 reset
        if (event.currentTarget.value && event.keyCode === 13) {
          const addData = {
            text: event.currentTarget.value,
            isCompleted: false,
          };
          // TODO: 어떤 의미에서 immutable ?
          const immutableList = [...this.todos, addData];
          this.setState(immutableList);
          event.currentTarget.value = '';
        }
      });

    // removeList
    const buttons = this.listDom.querySelectorAll('button[name="deleteList"]');
    buttons.forEach((button, idx) => {
      button.addEventListener('click', () => {
        event.stopPropagation();
        this.todos.splice(idx, 1);
        this.render();
        if (!this.todos.length) {
          this.listDom.innerHTML = '목록을 추가해주세요 !';
        }
      });
    });

    //TODO: 동작원리 이해하기 
    // checkList(isCompleted)
    const lists = this.listDom.querySelectorAll('li');
    lists.forEach((list, idx) => {
      list.addEventListener('click', () => {
        var isCompletedOrigin = this.todos[idx].isCompleted;
        this.todos[idx].isCompleted = !isCompletedOrigin;
        this.render();
      });
    });
  };

  try {
    // new 생성자 함수 호출 여부 검증 및 todoList 데이터 적합성 검사
    if (!(this instanceof TodoApp)) {
      throw new Error('error: invalid function call!');
    }
    CheckDataFormat(todoList);
    this.render();
  } catch (error) {
    // 에러를 catch하여 해당 엘리먼트에 error UI를 구현한다.
    renderErrorNotification(error, elementId);
  }
}