import Popup from './Popup.js';
import { cardBigImage, cardImageCaption } from '../utils/constants.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, data) {
    super(popupSelector);

    this._cardName = data.name;
    this._cardLink = data.link;
  }

  open() {
    cardBigImage.src = this._cardLink;
    cardBigImage.alt = this._cardName;
    cardImageCaption.textContent = this._cardName;
    super.open();
  }
}
