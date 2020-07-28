function TodoCount(todoList, elementId) {
  this.todoList = todoList;
  this.elementId = elementId;
  this.elementDom = document.querySelector(
    `#${this.elementId} .completedTotalNumber`
  );
  const numberOfCompleted = this.todoList.filter(
    (list) => list.isCompleted === true
  ).length;
  this.elementDom.innerHTML = numberOfCompleted;
}

export default TodoCount;