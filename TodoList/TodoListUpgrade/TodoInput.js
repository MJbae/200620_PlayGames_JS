const TodoInput = ({ elementId, listEditor }) => {
  // section 태그 접근
  const elementDom = document.querySelector(`#${elementId}`);
  // section 내 ul 태그 접근
  const listDom = elementDom.querySelector('.content');

  // input에 이벤트 검
  elementDom
    .querySelector('input[name="addList"]')
    .addEventListener('keyup', (event) => {
      console.log('sensing keyup')
      // 작성한 목록이 있고, enter를 눌렀을 때 add list 후 reset
      if (event.currentTarget.value && event.keyCode === 13) {
        console.log('sensing enter')
        const addData = {
          text: event.currentTarget.value,
          isCompleted: false,
        };
        listEditor.add(addData);
        event.currentTarget.value = '';
      }
    })

  // deleteList buttons에 이벤트를 생성
  const buttons = listDom.querySelectorAll('button[name="deleteList"]');
  buttons.forEach((button, idx) => {
    button.addEventListener('click', () => {
      console.log('start removeList')
      // TODO: 아래 event는 어디서 왔나?
      event.stopPropagation();
      listEditor.remove(idx);
    });
  });

  const lists = listDom.querySelectorAll('li');
  lists.forEach((list, idx) => {
    list.addEventListener('click', () => {
      listEditor.check(idx);
    });
  });
};

export default TodoInput;