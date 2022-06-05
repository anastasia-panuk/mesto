let popup = document.querySelector('.popup'); //получаем доступ к блоку '.popup'
let editButton = document.querySelector('.user__edit-button'); //получаем доступ к кнопке редактирования профиля
let popupCloseButton = document.querySelector('.popup__close-button'); //получаем доступ к кнопке закрытия попапа

let popupForm = document.querySelector('.popup__form');//получаем доступ к форме попапа

let userName = document.querySelector('.user__name'); //получаем доступ к элементу с именем пользователя
let userProfile = document.querySelector('.user__profile'); //получаем доступ к элементу с профием пользователя
let popupUserName = document.querySelector('#popup__user-name'); //получаем доступ к полю с именем пользователя
let popupUserProfile =document.querySelector('#popup__user-profile'); //получаем доступ к полю профиля пользователя в попапе

function togglePopup() {
  popup.classList.toggle('popup_opened'); //открываем из закрываем попап, добавляя или убирая класс 'popup_opened'
  popupUserName.value = userName.textContent; //передаем тектовым полям
  popupUserProfile.value = userProfile.textContent;//значения из профиля
}

function savePopup(evt) {
  evt.preventDefault();
  userName.textContent = popupUserName.value;
  userProfile.textContent = popupUserProfile.value;
  togglePopup();
} //объявляем функцию, которая сохраняет, отправляет данные пользователя и закрывает попап после отправки данных

function closePopupFormByOverlay(evt) {
  if(evt.target === evt.currentTarget) {
    togglePopup();
 }
 }//объявляем функцию, удаляющую класс 'popup_opened' из блока 'popup' по клику на оверлей и закрывает попап

editButton.addEventListener('click', togglePopup);//"навешиваем" обрабочик событий по клику на кнопку редактирования профиля (открывает попап)
popupCloseButton.addEventListener('click', togglePopup);//"навешиваем" обрабочик событий по клику на кнопку закрытия попапа (закрывает попап)
popupForm.addEventListener('submit', savePopup);//"навешиваем" обрабочик событий на форму, сохраняющий и отправляющий данные пользователя
popup.addEventListener('click', closePopupFormByOverlay);//"навешиваем" обрабочик событий по клику на попап, закрывающий попап по щелчку на оверлей (закрывает попап)
