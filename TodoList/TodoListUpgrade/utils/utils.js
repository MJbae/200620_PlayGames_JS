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

function renderErrorNotification(errorMessage, elementId) {
  console.error(errorMessage);
  document.querySelector(
    `#${elementId} .content`
  ).innerHTML = `리스트 형식을 다시 확인해주세요 :)`;
}

export { CheckDataFormat, renderErrorNotification }