export default class Card {
  constructor(data, { handleCardClick, cardTemplateSelector }) {
    this._cardTemplateSelector = cardTemplateSelector;
    this._card = document
      .querySelector(this._cardTemplateSelector)
      .content.querySelector('.card')
      .cloneNode(true);
    this._cardImage = this._card.querySelector('.card__image');
    this._cardTitle = this._card.querySelector('.card__name');
    this._cardLikeBtn = this._card.querySelector('.card__like-button');
    this._cardTrashBtn = this._card.querySelector('.card__trash-button');
    this._cardName = data.name;
    this._cardLink = data.link;
    this._handleCardClick = handleCardClick;
  }

  // _getTemplateCard() {
  //   return this._card;
  // }

  createCard() {
    //this._card = this._getTemplateCard();
    this._setEventListener();

    this._cardImage.src = this._cardLink;
    this._cardImage.alt = this._cardName;
    this._cardTitle.textContent = this._cardName;

    return this._card;
  }

  _handlerLikeButton() {
    this._cardLikeBtn.classList.toggle('card__like-button_active');
  }

  _deleteCardByButton() {
    this._card.remove();
    this._card = null;
  }

  _setEventListener() {
    this._cardLikeBtn.addEventListener('click', () => {
      this._handlerLikeButton();
    });

    this._cardTrashBtn.addEventListener('click', () => {
      this._deleteCardByButton();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick();
    });
  }
}
