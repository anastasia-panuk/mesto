import Popup from './Popup.js';

export default class PopupConformation extends Popup {
  constructor(popupElement, { handleFormSubmit }) {
    super(popupElement);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector('.popup__form');
  }

  setEventListeners() {
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this.data);
      this.close();
    });
    super.setEventListeners();
  }
}
