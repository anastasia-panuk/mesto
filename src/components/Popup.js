export default class Popup {
  constructor(popupElement) {
    this._popup = popupElement;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleOverlayClose(evt) {
    evt.stopPropagation();
    if (
      evt.target.classList.contains('popup') ||
      evt.target.classList.contains('popup__close-button')
    ) {
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
  }
}
