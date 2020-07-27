// export문은 특정 js파일에서 다른 js파일로 내보낼 때 사용함.
// export default는 한 js파일에서 하나의 내보내기를 할 때 사용함.
export default function SearchResult($target, data) {
  this.data = data

  // 렌더링부분 컴포넌트화
  this.render = () => {
    if (this.data) {
      const htmlString = `${this.data
        .map(({ imageUrl, title }) => `
          <article>
            <img src="${imageUrl}" alt="${title}">
          </article>`)
        .join('')}`
      // TODO: export default 사용 시 아래의 document문을 본문과 같이 대체함 왜?
      // document.querySelector('#search-result').innerHTML = htmlString
      $target.innerHTML = htmlString
    }
  }

  this.setState = (nextData) => {
    this.data = nextData
    this.render()
  }

  this.render();
}