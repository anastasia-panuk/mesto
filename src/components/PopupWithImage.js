import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._cardBigImage = document.querySelector('.popup__image');
    this._cardImageCaption = document.querySelector('.popup__figcaption');
  }

  open(card) {
    this._cardBigImage.src = card.link;
    this._cardBigImage.alt = card.name;
    this._cardImageCaption.textContent = card.name;
    super.open();
  }
}
