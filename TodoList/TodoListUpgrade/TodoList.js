// TodoList.js에는 렌더링 시 리스트를 그려주는 부분만 남기고 나머지는 App.js로 이동

const TodoList = (todoList, elementId) => {
  const listDom = document.querySelector(`#${elementId} .content`);
  listDom.innerHTML = todoList
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

export default TodoList;