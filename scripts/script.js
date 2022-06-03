let popup = document.querySelector('.popup'); //получаем доступ к блоку '.popup'
let editButton = document.querySelector('.user__edit-button'); //получаем доступ к кнопке редактирования профиля
let popupCloseButton = document.querySelector('.popup__close-button'); //получаем доступ к кнопке закрытия попапа

let popupForm = document.querySelector('.popup__form');//получаем доступ к форме попапа

let userName = document.querySelector('.user__name'); //получаем доступ к элементу с именем пользователя
let userProfile = document.querySelector('.user__profile'); //получаем доступ к элементу с профием пользователя
let popupUserName = document.querySelector('#popup__user-name'); //получаем доступ к полю с именем пользователя
let popupUserProfile =document.querySelector('#popup__user-profile'); //получаем доступ к полю профиля пользователя в попапе


function openPopupForm() {
  if (popup.classList.contains('popup'))
  {popup.classList.add('popup_opened')}
} //объявляем функцию открытия попапа, которая добавляет класс 'popup_opened' в элемент 'popup' и делает его видимым

function closePopupFormByButton() {
    if (popup.classList.contains('popup_opened'))
      {popup.classList.remove('popup_opened')}
} //объявляем функцию закрытия попапа, которая удаляет класс 'popup_opened' из элемента 'popup' и делает его невидимым

function closePopupFormByOverlay(evt) {
   if(evt.target === evt.currentTarget) {
      popup.classList.remove('popup_opened');
  }
}//объявляем функцию закрытия попапа, которая удаляет класс 'popup_opened' из элемента 'popup' и делает его невидимым

function savePopupSubmitForm(evt) {
  evt.preventDefault();
  userName.textContent = popupUserName.value;
  userProfile.textContent = popupUserProfile.value;
  closePopupFormByButton();
} //объявляем функцию, которая сохраняет, отправляет данные пользователя и ракрывает попап после отправки данных


editButton.addEventListener('click', openPopupForm);//"навешиваем" обрабочик событий по клику на кнопку редактирования профиля (открывает попап)
popupCloseButton.addEventListener('click', closePopupFormByButton);//"навешиваем" обрабочик событий по клику на кнопку закрытия попапа (закрывает попап)
popup.addEventListener('click', closePopupFormByOverlay);//"навешиваем" обрабочик событий по клику на попап, закрывающий попап по щелчку на оверлей (закрывает попап)
popupForm.addEventListener('submit', savePopupSubmitForm);//"навешиваем" обрабочик событий на форму, сохраняющий и отправляющий данные пользователя
