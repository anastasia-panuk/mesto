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

function openPopup(popup) {
  if(popup.classList.contains('popup'))
  popup.classList.add('popup_opened');
  hideErrorAtOpenForm(config, input)
}

function closePopup(popup) {
  if(popup.classList.contains('popup_opened'))
  popup.classList.remove('popup_opened');
}

popupEditBtn.addEventListener('click', () => openPopup(editPopup));
popupAddBtn.addEventListener('click',  () => openPopup(newPlacePopup));

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
  };

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

editPopup.addEventListener('click', closePopupByOverlay);
newPlacePopup.addEventListener('click', closePopupByOverlay);
imageZoomPopup.addEventListener('click', closePopupByOverlay);

const popups = document.querySelectorAll('.popup')
const popupsContainer = document.querySelectorAll('.popup__container')


popups.forEach(function(popupItem) {
  popupItem.style.cursor = 'pointer'
})

popupsContainer.forEach(function(popupCont) {
    popupCont.addEventListener('mouseover', function() {
      popupCont.style.cursor = 'default'
    })
})

 function closePopupByEsc(evt) {
  popups.forEach(function(popupItem) {
    if(evt.key === 'Escape') {
      closePopup(popupItem);
    }
  })
  }

  document.addEventListener('keydown', closePopupByEsc)

  popupEditBtn.addEventListener('click', function submitInputValueToPopupForm() {
    popupUserName.value = userName.textContent;
    popupUserProfile.value = userProfile.textContent;
    openPopup(editPopup)
  });

  function submitUserDataToServer(evt) {
    evt.preventDefault();
    userName.textContent = popupUserName.value;
    userProfile.textContent = popupUserProfile.value;
    closePopup(editPopup);
  }

   popupEditForm.addEventListener('submit', submitUserDataToServer);

