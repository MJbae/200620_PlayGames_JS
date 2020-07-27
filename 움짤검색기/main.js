import SearchResult from "./SearchResult.js"

  ; (function () {
    const searchResult = new SearchResult({
      $target: document.querySelector('#search-result'),
      data: null
    })

    document
      .querySelector('#search-keyword')
      .addEventListener('keyup', function (e) {
        fetch(`https://jjalbot.com/api/jjals?text=${e.target.value}`)
          .then(x => x.json())
          .then(data => {
            console.log(JSON.stringify(data, null, 2))
            searchResult.setState(data)
          })
      })
  })()
