function TodoInput({ elementId, listEditor }) {
  // section 태그 접근
  this.elementDom = document.querySelector(`#${elementId}`);
  // section 내 ul 태그 접근
  this.listDom = document
    .querySelector(`#${elementId}`)
    .querySelector('.content');

  this.listEditor = listEditor;
  // input에 이벤트 검
  this.render = () => {
    this.elementDom
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
          this.listEditor.add(addData);
          event.currentTarget.value = '';
        }
      })

    // deleteList buttons에 이벤트를 생성
    const buttons = this.listDom.querySelectorAll('button[name="deleteList"]');
    buttons.forEach((button, idx) => {
      button.addEventListener('click', () => {
        console.log('start removeList')
        // TODO: 아래 event는 어디서 왔나?
        event.stopPropagation();
        this.listEditor.remove(idx);
      });
    });

    const lists = this.listDom.querySelectorAll('li');
    lists.forEach((list, idx) => {
      list.addEventListener('click', () => {
        this.listEditor.check(idx);
      });
    });
  };
  this.render();
}

export default TodoInput;
