const editPopup = document.querySelector('.popup_edit');
const newPlacePopup = document.querySelector('.popup_add-new-place');
const imageZoomPopup = document.querySelector('.popup_photo-view');

const popupEditBtn = document.querySelector('.user__edit-button');
const popupAddBtn = document.querySelector('.user__add-button');

const popupEditForm = document.querySelector('.edit-popup-form');
const popupAddNewPlaceForm = document.querySelector('.new-place-popup-form');

const userName = document.querySelector('.user__name');
const userProfile = document.querySelector('.user__profile');
const popupUserName = document.querySelector('#popup__user-name');
const popupUserProfile = document.querySelector('#popup__user-profile');

const popupPlaceName = document.querySelector('#popup__place-name');
const popupPlaceLink = document.querySelector('#popup__place-link');

const cardsContainer = document.querySelector('.cards');

const cardTemplate = document.querySelector('.template-card').content;

const cardBigImage = document.querySelector('.popup__image');
const cardImageCaption = document.querySelector('.popup__figcaption');

const newPlaceSubmitButton = popupAddNewPlaceForm.querySelector('.popup__submit-button');
const popupAddNewPlaceFormInputs = Array.from(popupAddNewPlaceForm.querySelectorAll('.popup__input'));

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc)
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc)
}

popupEditBtn.addEventListener('click', () => {
  resetError(formsConfig, popupEditForm);
  openPopup(editPopup);
});

popupAddBtn.addEventListener('click',  () => {
  resetError(formsConfig, newPlacePopup)
  openPopup(newPlacePopup)
});

function createCard(card) {
  const cardTemplateContent = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardTemplateContent.querySelector('.card__image');
  const cardName = cardTemplateContent.querySelector('.card__name');
  const likeButton = cardTemplateContent.querySelector('.card__like-button');
  const trashButton = cardTemplateContent.querySelector('.card__trash-button');

  cardName.textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;

  cardImage.addEventListener('click', function() {
  cardBigImage.src = cardImage.src;
  cardImageCaption.textContent = cardName.textContent;
  cardBigImage.alt = cardImage.alt;
  openPopup(imageZoomPopup);
    })

    likeButton.addEventListener('click', function () {
      likeButton.classList.toggle('card__like-button_active')}
    )

    trashButton.addEventListener('click', function() {
      cardTemplateContent.remove()
    })

    return cardTemplateContent;
  }

  function renderCard(card) {
    cardsContainer.prepend(createCard(card))
  }

  initialCards.forEach(renderCard);

  function renderNewCard(evt){
  evt.preventDefault();
    const card = {};
    card.name = popupPlaceName.value;
    card.link = popupPlaceLink.value;
    renderCard(card);
    closePopup(newPlacePopup);
    popupAddNewPlaceForm.reset();
    toggleSubmitButton(formsConfig, popupAddNewPlaceFormInputs, newPlaceSubmitButton);
  }

  popupAddNewPlaceForm.addEventListener('submit', renderNewCard);

 const closeEditPopupButton = editPopup.querySelector('.popup__close-button');
 closeEditPopupButton.addEventListener('click', () => {
  closePopup(editPopup)
});

 const closeNewPlacePopupButton = newPlacePopup.querySelector('.popup__close-button');
 closeNewPlacePopupButton.addEventListener('click', () => {
  closePopup(newPlacePopup)
});

 const closeImageZoomPopupButton = imageZoomPopup.querySelector('.popup__close-button');
 closeImageZoomPopupButton.addEventListener('click', () => {closePopup(imageZoomPopup)})


 function closePopupByOverlay(evt) {
  if(evt.target.classList.contains('popup'))
    evt.target.classList.remove('popup_opened')
 }

editPopup.addEventListener('mousedown', closePopupByOverlay);
newPlacePopup.addEventListener('mousedown', closePopupByOverlay);
imageZoomPopup.addEventListener('mousedown', closePopupByOverlay);

const popups = document.querySelectorAll('.popup')
const popupsContainer = document.querySelectorAll('.popup__container')

 function closePopupByEsc(evt) {
    if(evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened')
      closePopup(openedPopup)
    }
  }

  popupEditBtn.addEventListener('click', function submitInputValueToPopupForm() {
    popupUserName.value = userName.textContent;
    popupUserProfile.value = userProfile.textContent;
    openedPopupValidation(formsConfig, popupEditForm);
    openPopup(editPopup);
  });

  function submitUserDataToServer(evt) {
    evt.preventDefault();
    userName.textContent = popupUserName.value;
    userProfile.textContent = popupUserProfile.value;
    closePopup(editPopup);
  }


   popupEditForm.addEventListener('submit', submitUserDataToServer);

const formsConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inputErrorSelector: (item) => `.error-${item.name}`,
    inactiveButtonClass: 'popup__submit-button_inactive',
    inputErrorBorderClass: 'popup__input_error',
    errorTextClass: 'popup__input-span',
  }

enableValidation(formsConfig);
