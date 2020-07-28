import SearchResult from './SearchResult.js';

function App() {
  if (!(this instanceof App)) {
    throw new Error('error: App must be called with new!');
  }
  console.log("App testing");
  const that = this;
  this.data = null;
  this.searchKeywordContainer = document.querySelector('#search-keyword');

  this.searchKeywordContainer.addEventListener('keyup', function (e) {
    if (e.keyCode === 13) {
      fetch(`https://jjalbot.com/api/jjals?text=${e.target.value}`)
        .then((x) => x.json())
        .then((data) => {
          if (data.length) {
            that.setState(data);
          }
        });
    }

  });

  this.render = () => {
    this.searchResultContainer = document.querySelector('#search-result');
    this.searchResult = new SearchResult(this.data, this.searchResultContainer);
  };

  this.setState = (data) => {
    this.searchResult.setState(data);
  };

  this.render();
}

export default App;