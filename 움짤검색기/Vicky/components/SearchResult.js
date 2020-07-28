function SearchResult(data, target) {
  if (!(this instanceof SearchResult)) {
    throw new Error('error: SearchResult must be called with new!');
  }

  this.images = data;
  this.targetContainer = target;

  this.render = () => {
    const htmlString = `${this.images
      .map(
        (image) => `<li><img src="${image.imageUrl}" alt=${image.title}></li>`
      )
      .join('')}`;

    this.targetContainer.innerHTML = htmlString;
  };

  this.setState = (newData) => {
    this.images = newData;
    this.render();
  };
}

export default SearchResult;