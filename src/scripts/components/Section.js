export default class Section {
  constructor({ items, renderer }, cardsContainerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;

    this._container = cardsContainerSelector;
  }

  renderCards() {
    this._renderedItems.forEach((item) => this._renderer(item));
  }

  addCardToContainer(card) {
    this._container.prepend(card);
  }
}
