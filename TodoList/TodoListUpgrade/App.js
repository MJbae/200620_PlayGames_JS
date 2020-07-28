import TodoDomGenerator from './components/TodoDomGenerator.js';
import TodoList from './components/TodoList.js';
import TodoInput from './components/TodoInput.js';
import TodoCount from './components/TodoCount.js';
import { CheckDataFormat, renderErrorNotification } from './utils/utils.js';
import { data, wish, togo } from './utils/data.js';

function App(todoList, elementId) {
  console.log('start App')
  // elementDom을 동적으로 그림
  // TodoDomGenerator(elementId);

  // init
  this.todos = todoList;
  this.elementId = elementId;
  // Dom 직접 접근하는 변수명에 'Dom' 추가 
  this.elementDom = document.querySelector(`#${this.elementId}`);
  this.listDom = document.querySelector(`#${this.elementId} .content`);

  this.render = () => {
    console.log('start render');
    new TodoList(this.todos, this.elementId);
    // new TodoCount(this.todos, this.elementDom);
    // TodoInput 작동원리
    // -> listEditor를 매개변수로 전달하여, 내부의 객체함수의 콜백함수를 통해 TodoInput 컴포넌트에서 event handling함 
    // 콜백함수의 전달값을 App 컴포넌트로 받고, App에서 this.todos 접근하여 변동사항을 업데이트(render) 함
    new TodoInput({
      elementId,
      listEditor: {
        add: addList,
        remove: removeList,
        check: checkList,
      },
    });
  };

  this.setState = (nextData) => {
    CheckDataFormat(nextData);
    this.todos = nextData;
    document.querySelector(`#${this.elementId} .content`).innerHTML = '';
    this.render();
  };

  const addList = (addData) => {
    const immutableList = [...this.todos, addData];
    this.setState(immutableList);
  }

  const removeList = (listIndex) => {
    this.todos.splice(listIndex, 1);
    this.render();
    if (!this.todos.length) {
      document.querySelector(`#${this.elementId} .content`).innerHTML =
        '목록을 추가해주세요 !';
    }
  };

  const checkList = (checkedIndex) => {
    var isCompletedOrigin = this.todos[checkedIndex].isCompleted;
    this.todos[checkedIndex].isCompleted = !isCompletedOrigin;
    this.render();
  };

  try {
    // new 생성자 함수 호출 여부 검증 및 todoList 데이터 적합성 검사
    if (!(this instanceof App)) {
      throw new Error('error: invalid function call!');
    }
    CheckDataFormat(todoList);
    this.render();
    // this.listEditor();
  } catch (error) {
    // 에러를 catch하여 해당 엘리먼트에 error UI를 구현한다.
    renderErrorNotification(error, elementId);
  }
};

const todoList = new App(data, 'todo-list');
const wishList = new App(wish, 'wish-list');