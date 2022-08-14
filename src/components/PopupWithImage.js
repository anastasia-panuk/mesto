import Popup from './Popup.js';
import { cardBigImage, cardImageCaption } from '../utils/constants.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(card) {
    cardBigImage.src = card.link;
    cardBigImage.alt = card.name;
    cardImageCaption.textContent = card.name;
    super.open();
  }
}
