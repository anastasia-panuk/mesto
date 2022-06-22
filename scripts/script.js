const editPopup = document.querySelector('.popup_edit');
const newPlacePopup = document.querySelector('.popup_add-new-place');
const imageZoomPopup = document.querySelector('.popup_photo-view');

const popupEditBtn = document.querySelector('.popup__edit-button');
const popupAddBtn = document.querySelector('.popup__add-button');

const popupCloseButton = document.querySelectorAll('.popup__close-button');

const popupEditForm = document.querySelector('.edit-popup-form');
const popupAddNewPlaceForm = document.querySelector('.new-place-popup-form');

const userName = document.querySelector('.user__name');
const userProfile = document.querySelector('.user__profile');
const popupUserName = document.querySelector('#popup__user-name');
const popupUserProfile = document.querySelector('#popup__user-profile');

const popupPlaceName = document.querySelector('#popup__place-name');
const popupPlaceLink = document.querySelector('#popup__place-link');

const trashButton = document.getElementsByName('card__trash-button');

const cardsContainer = document.querySelector('.cards');

const cardTemplate = document.querySelector('.template-card').content;

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
}

function likeToggle(evt) {
  if (evt.target.classList.contains('card__like-button')) {
     evt.target.classList.toggle('card__like-button_active');
  }
  }

  function deleteCard(evt) {
    if (evt.target.classList.contains('card__trash-button')) {
      cardsContainer.removeChild(evt.target.closest('.card'));
    }
  }

popupEditBtn.addEventListener('click', () => togglePopup(editPopup));
popupAddBtn.addEventListener('click',  () => togglePopup(newPlacePopup));

function renderCard(card) {
  const cardTemplateContent = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardTemplateContent.querySelector('.card__image');
  const cardName = cardTemplateContent.querySelector('.card__name');
  cardName.textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardsContainer.prepend(cardTemplateContent);

  cardImage.addEventListener('click', function() {
  const cardBigImage = document.querySelector('.popup__image');
  const cardImageCaption = document.querySelector('.popup__figcaption');
  cardBigImage.src = cardImage.src;
  cardImageCaption.textContent = cardName.textContent;
  cardBigImage.alt = cardImage.alt;
  togglePopup(imageZoomPopup);
    })
  }

  cardsContainer.addEventListener('click', deleteCard);
  cardsContainer.addEventListener('click', likeToggle);

  function renderCards() {
    initialCards.forEach(renderCard);
  }

  renderCards();

  function renderNewCard(evt){
  evt.preventDefault();
  const newCard = Object.assign({}, initialCards[0]);
  initialCards.push(newCard);
  newCard.name = popupPlaceName.value;
  newCard.link = popupPlaceLink.value;
  renderCard(newCard);
  togglePopup(newPlacePopup);
  }

  popupAddNewPlaceForm.addEventListener('submit', renderNewCard);

  popupCloseButton[0].addEventListener('click', () => togglePopup(editPopup));
  popupCloseButton[1].addEventListener('click', () => togglePopup(newPlacePopup));
  popupCloseButton[2].addEventListener('click', () => togglePopup(imageZoomPopup));

  function closePopupByOverlay(evt) {
    if(evt.target.classList.contains('popup_edit')) {
      togglePopup(editPopup);
  } else if(evt.target.classList.contains('popup_add-new-place')) {
     togglePopup(newPlacePopup);
  } else if (evt.target.classList.contains('popup_photo-view')) {
    togglePopup(imageZoomPopup);
  }
  };

  editPopup.addEventListener('click', closePopupByOverlay);
  newPlacePopup.addEventListener('click', closePopupByOverlay);
  imageZoomPopup.addEventListener('click', closePopupByOverlay);

function submitInputValueToPopupForm() {
  popupUserName.value = userName.textContent;
  popupUserProfile.value = userProfile.textContent;
}

 submitInputValueToPopupForm();

function submitUserDataToServer(evt) {
  evt.preventDefault();
  userName.textContent = popupUserName.value;
  userProfile.textContent = popupUserProfile.value;
  togglePopup(editPopup);
}

 popupEditForm.addEventListener('submit', submitUserDataToServer);
