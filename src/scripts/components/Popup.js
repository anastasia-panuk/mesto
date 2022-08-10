export default class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
    this._closePopupBtn = this._popup
      .querySelector('.popup__container')
      .querySelector('.popup__close-button');
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
  }

  _handleOverlayClose(evt) {
    evt.stopPropagation();
    if (evt.target.classList.contains('popup')) {
      this.close();
    }
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      this._handleOverlayClose(evt);
    });
    this._closePopupBtn.addEventListener('click', () => {
      this.close();
    });
  }
}
