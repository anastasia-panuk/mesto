class FormValidator {
  //конструктор валидатора
  constructor(config, form) {
    this._config = config;
    this._form = form;
  }

  //функция включения валидации
  enableValidation() {
    const formList = Array.from(
      document.querySelectorAll(this._config.formSelector)
    );
    formList.forEach((form) => {
      form.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners();
    });
  }

  //функция установки слушателей события на инпуты и кнопки отправки данных
  _setEventListeners() {
    const inputList = Array.from(
      this._form.querySelectorAll(this._config.inputSelector)
    );
    const btn = this._form.querySelector(this._config.submitButtonSelector);
    this._toggleSubmitButton(inputList, btn);
    inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleSubmitButton(inputList, btn);
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
    errorMessageText.textContent = "";
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
  _hasInvalidInput(inputList) {
    return inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  //функция переключения состояния кнопок отправки данных
  _toggleSubmitButton(inputList, btn) {
    if (this._hasInvalidInput(inputList) === true) {
      this._inactiveSubmitButton(btn);
    } else {
      this._activeSubmitButton(btn);
    }
  }

  //функция включающая активное состояние карточек
  _activeSubmitButton(btn) {
    btn.removeAttribute("disabled");
    btn.classList.remove(this._config.inactiveButtonClass);
  }

  //функция выключающая актичное состояние карточек
  _inactiveSubmitButton(btn) {
    btn.setAttribute("disabled", true);
    btn.classList.add(this._config.inactiveButtonClass);
  }

  //функция сброса ошибок, срабатывающая при открытии попапов
  _resetError() {
    const inputList = Array.from(
      this._form.querySelectorAll(this._config.inputSelector)
    );
    const btn = this._form.querySelector(this._config.submitButtonSelector);
    inputList.forEach((input) => {
      this._hideError(input);
    });
    this._toggleSubmitButton(inputList, btn);
  }

  //функция валидации форм, срабатывающая при открытии попапов
  _openedPopupValidation() {
    const btn = this._form.querySelector(this._config.submitButtonSelector);
    const inputList = Array.from(
      this._form.querySelectorAll(this._config.inputSelector)
    );
    inputList.forEach((input) => {
      this._checkInputValidity(input);
    });
    this._toggleSubmitButton(inputList, btn);
  }
}

//экспорт модуля FormValidator
export { FormValidator };
