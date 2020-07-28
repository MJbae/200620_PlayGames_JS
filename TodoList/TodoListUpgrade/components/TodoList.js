// TODO: components 폴더로 각종 components 파일을 옮김에 따라 각 컴포넌트 내부에 render 부분을 추가함. 왜??

// TodoList.js에는 렌더링 시 리스트를 그려주는 부분만 남기고 나머지는 App.js로 이동

function TodoList(todoList, elementId) {
  this.todoList = todoList;
  this.elementId = elementId;
  this.listDom = document.querySelector(`#${this.elementId} .content`);
  this.render = () => {
    this.listDom.innerHTML = todoList
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
  };
  this.render()
};

export default TodoList;