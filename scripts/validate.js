const enableValidation = function (config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach(function(form) {
    form.addEventListener('submit', function(evt) {
      evt.preventDefault()
    })
    setEventListeners(config, form)
  })
}

const showError = function(config, input, errorText) {
const errorMessageText = document.querySelector(config.inputErrorSelector(input));
  input.classList.add(config.inputErrorBorderClass)
  errorMessageText.textContent = errorText;
  }

const hideError = function(config, input) {
  const errorMessageText = document.querySelector(config.inputErrorSelector(input));
    input.classList.remove(config.inputErrorBorderClass)
    errorMessageText.textContent = '';
  }

const checkInputValidity = function (config, input) {
  if(!input.validity.valid) {
    showError(config, input, input.validationMessage)
  } else {
    hideError(config, input)
  }
}

const hasInvalidInput = function (inputList) {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const toggleSubmitButton = function (config, inputList, btn) {
  if(hasInvalidInput(inputList) === true) {
    inactiveSubmitButton(config, btn)
  } else {
    activeSubmitButton(config, btn)
}
}

const activeSubmitButton = function(config, btn) {
  btn.removeAttribute('disabled')
  btn.classList.remove(config.inactiveButtonClass);
}

const inactiveSubmitButton = function(config, btn) {
    btn.setAttribute('disabled', true)
    btn.classList.add(config.inactiveButtonClass);
}

const setEventListeners = function (config, form) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  const btn = form.querySelector(config.submitButtonSelector)
  inputList.forEach((input) => {
    input.addEventListener('input', function() {
      checkInputValidity(config, input);
      toggleSubmitButton(config, inputList, btn)
    })
  })
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inputErrorSelector: (item) => `.error-${item.name}`,
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorBorderClass: 'popup__input_error',
  errorTextClass: 'popup__input_span',
});
