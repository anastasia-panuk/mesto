import Popup from './Popup.js';
import { popupPlaceName, popupPlaceLink } from '../utils/constants.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;

    this._popupForm = this._popup.querySelector('.popup__form');
  }

  _getInputValues() {
    this._data = {};

    this._data.name = popupPlaceName.value;
    this._data.link = popupPlaceLink.value;

    return this._data;
  }

  setEventListeners() {
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
    super.setEventListeners();
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}
