import SearchResult from './SearchResult.js';

function App() {
  // TODO: 에러 구문 작동원리 확인
  if (!(this instanceof App)) {
    throw new Error('error: App must be called with new!')
  }

  // TODO: that의 기능 확인 및 본문에서 어떻게 사용되는지?
  const that = this;
  this.data = null;
  this.searchKeywordContainer = document.querySelector('keyup', function (e) {
    fetch(`https://jjalbot.com/api/jjals?text=${e.target.value}`)
      .then((x) => x.json())
      .then((data) => {
        if (data.length) {
          // TODO: 아래 that을 꼭 써야 하나?
          that.setState(data);
        }
      });
  });

  this.render = () => {
    this.searchResultContainer = document.querySelector('#search-result');
    this.searchResult = new SearchResult(this.data, this.searchResultContainer);
  };

  // searchResult.setStat()에 render 기능이 있기 때문에 본문 setState에는 생략
  this.setState = (data) => {
    this.searchResult.setState(data);
  };

  this.render();
}

export default App;