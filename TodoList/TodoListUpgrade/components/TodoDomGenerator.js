// App() 인스턴스 생성 시, elementDom 동적 생성
const TodoDomGenerator = (elementId) => {
  const newDom = `
    <section id="${elementId}">
      <h2>MJ's ${elementId}</h2>
      <ul class="content"></ul>
      <h3>+</h3>
      <input type="text" name="addList" placeholder="add List" required />
    </section>
  `;
  document.body.innerHTML += newDom;
};

export default TodoDomGenerator;