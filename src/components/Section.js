export default class Section {
  constructor({ renderer }, cardsContainerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(cardsContainerSelector);
  }

  renderCards(cards) {
    cards.forEach((item) => this._renderer(item));
  }

  addCardToContainer(card) {
    this._container.prepend(card);
  }
}
