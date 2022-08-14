export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;

    this._inputList = Array.from(
      this._form.querySelectorAll(this._config.inputSelector)
    );
    this._submitBtn = this._form.querySelector(
      this._config.submitButtonSelector
    );
  }

  enableValidation() {
      this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners();
    }


  _setEventListeners() {
    this.toggleSubmitButton();
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this.toggleSubmitButton();
      });
    });
  }

  _showError(input, errorText) {
    const errorMessageText = this._form.querySelector(
      this._config.inputErrorSelector(input)
    );
    input.classList.add(this._config.inputErrorBorderClass);
    errorMessageText.textContent = errorText;
  }

  _hideError(input) {
    const errorMessageText = this._form.querySelector(
      this._config.inputErrorSelector(input)
    );
    input.classList.remove(this._config.inputErrorBorderClass);
    errorMessageText.textContent = '';
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showError(input, input.validationMessage);
    } else {
      this._hideError(input);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  toggleSubmitButton() {
    if (this._hasInvalidInput() === true) {
      this._inactiveSubmitButton(this._submitBtn);
    } else {
      this._activeSubmitButton(this._submitBtn);
    }
  }

  _activeSubmitButton() {
    this._submitBtn.removeAttribute('disabled');
    this._submitBtn.classList.remove(this._config.inactiveButtonClass);
  }

  _inactiveSubmitButton() {
    this._submitBtn.setAttribute('disabled', true);
    this._submitBtn.classList.add(this._config.inactiveButtonClass);
  }

  resetError() {
    this._inputList.forEach((input) => {
      this._hideError(input);
    });
    this.toggleSubmitButton();
  }
}
