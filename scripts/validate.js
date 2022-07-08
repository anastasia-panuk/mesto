const enableValidation = function (config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach(function(form) {
    form.addEventListener('submit', function(evt) {
      evt.preventDefault()
    })
    setEventListeners(config, form)
  })
}

const showError = function(config, form, input, errorText) {
  const errorMessageText = form.querySelector(config.inputErrorSelector(input));
  input.classList.add(config.inputErrorBorderClass)
  errorMessageText.textContent = errorText;
  }

const hideError = function(config, form, input) {
  const errorMessageText = form.querySelector(config.inputErrorSelector(input));
  input.classList.remove(config.inputErrorBorderClass)
  errorMessageText.textContent = '';
}

  const checkInputValidity = function (config, form, input) {
    if(!input.validity.valid) {
    showError(config, form, input, input.validationMessage)
    } else {
    hideError(config, form, input)
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
  }
  else {
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
  toggleSubmitButton(config, inputList, btn);
  inputList.forEach((input) => {
    input.addEventListener('input', function() {
      checkInputValidity(config, form, input);
      toggleSubmitButton(config, inputList, btn);
    })
  })
}

function resetError(config, form) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  const btn = form.querySelector(config.submitButtonSelector);
  inputList.forEach(function (input) {
    hideError(config, form, input)
  });
  toggleSubmitButton(config, inputList, btn);
}

function openedPopupValidation(config, form) {
  const btn = form.querySelector(config.submitButtonSelector);
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  inputList.forEach(function (input) {
    checkInputValidity(config, form, input);
  })
  toggleSubmitButton(config, inputList, btn);
}
