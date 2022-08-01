class FormValidator {
  //конструктор валидатора
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._formList = Array.from(
      document.querySelectorAll(this._config.formSelector)
    );
    this._inputList = Array.from(
        this._form.querySelectorAll(this._config.inputSelector)
      )
    this._submitBtn = this._form.querySelector(this._config.submitButtonSelector);
  }

  //функция включения валидации
  enableValidation() {
    this._formList.forEach((form) => {
      form.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners();
    });
  }

  //функция установки слушателей события на инпуты и кнопки отправки данных
  _setEventListeners() {
    this.toggleSubmitButton();
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this.toggleSubmitButton();
      });
    });
  }

  //функция отображения ошибки, появляющаяся при некорректном введении данных пользователем
  _showError(input, errorText) {
    const errorMessageText = this._form.querySelector(
      this._config.inputErrorSelector(input)
    );
    input.classList.add(this._config.inputErrorBorderClass);
    errorMessageText.textContent = errorText;
  }

  //функция сокрытия ошибки, срабатывающая при введении корректных данных в формы
  _hideError(input) {
    const errorMessageText = this._form.querySelector(
      this._config.inputErrorSelector(input)
    );
    input.classList.remove(this._config.inputErrorBorderClass);
    errorMessageText.textContent = '';
  }

  //функция проверки валидности форм
  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showError(input, input.validationMessage);
    } else {
      this._hideError(input);
    }
  }

  //функция проверки наличия невалидных полей в формах
  _hasInvalidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  //функция переключения состояния кнопок отправки данных
  toggleSubmitButton() {
    if (this._hasInvalidInput() === true) {
      this._inactiveSubmitButton(this._submitBtn);
    } else {
      this._activeSubmitButton(this._submitBtn);
    }
  }

  //функция включающая активное состояние карточек
  _activeSubmitButton() {
    this._submitBtn.removeAttribute('disabled');
    this._submitBtn.classList.remove(this._config.inactiveButtonClass);
  }

  //функция выключающая активное состояние карточек
  _inactiveSubmitButton() {
    this._submitBtn.setAttribute('disabled', true);
    this._submitBtn.classList.add(this._config.inactiveButtonClass);
  }

  //функция сброса ошибок, срабатывающая при открытии попапов
  resetError() {
    this._inputList.forEach((input) => {
      this._hideError(input);
    });
    this.toggleSubmitButton();
  }
}

//экспорт модуля FormValidator
export { FormValidator };
