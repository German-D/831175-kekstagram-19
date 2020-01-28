'use strict';

var i;

var photos = [];
var comments = [];

var names = [
  'German',
  'Ann',
  'John',
  'Robert',
  'Andrew',
  'Nick',
  'Dima',
  'Sasha',
  'Ivan',
  'George',
  'Sergey',
  'Chester',
  'Mike',
  'Amdam',
  'Timur',
  'Fedor',
  'Petya',
  'Pavel',
  'Oleg',
  'Leon',
  'Danil',
  'Carl',
  'Igor',
  'David',
  'Gena'
];

var descriptions = [
  'Avatar',
  'super photo',
  'logo',
  'spinner',
  'nice photo',
  'insta photo'
];

var messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

// Функция поиска случайного чилса. Максимум и минимум включаются
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var random25; // Случайное число от 1 до 25 включительно
var random6; // Случайное число от 1 до 6 включительно
var random2; // Случайное число от 1 до 2 включительно
var newMessage;

// Функция для создания описания
function addNewMessage(messageList) {
  random2 = getRandomIntInclusive(1, 2);
  if (random2 === 1) {
    newMessage = messageList[getRandomIntInclusive(0, 6)];
  } else {
    newMessage = messageList[getRandomIntInclusive(0, 6)] + messageList[getRandomIntInclusive(0, 6)];
  }
  return newMessage;
}

// Функция для создания комментария
function addNewComment(messagesList, namesList) {
  for (i = 0; i < getRandomIntInclusive(1, 10); i++) {
    random6 = getRandomIntInclusive(1, 6);
    comments.push({
      avatar: 'img/avatar-' + random6 + '.svg',
      message: addNewMessage(messagesList),
      name: namesList[getRandomIntInclusive(0, 24)]
    });
  }
  return comments;
}

// Функция для создания новой фотографии
function addNewPhoto(namesList, messagesList, descriptionsList) {

  var imgCache = {}; // Переменная для уникальных значений картинок

  while (photos.length <= 24) {
    random25 = getRandomIntInclusive(1, 25);

    while (imgCache[random25]) {
      random25 = getRandomIntInclusive(1, 25);
    }

    imgCache[random25] = true;
    photos.push({
      url: 'photos/' + random25 + '.jpg',
      description: descriptionsList[getRandomIntInclusive(0, 6)],
      likes: getRandomIntInclusive(15, 200),
      comments: addNewComment(messagesList, namesList)
    });
  }
  return photos;
}

addNewPhoto(names, messages, descriptions);

var photoTemplate = document.querySelector('#picture');
var photoList = document.querySelector('.pictures');

function renderPhoto(photosList) {
  var photoElement = photoTemplate.cloneNode(true);

  photoElement.querySelector('.picture__img').src = photosList.url;
  photoElement.querySelector('.picture__likes').textContent = photosList.likes;
  photoElement.querySelector('.picture__comments').textContent = photosList.comments.length;

  return photoElement;
}

var fragment = document.createDocumentFragment();
for (i = 0; i < photos.length; i++) {
  fragment.appendChild(renderPhoto(photos[i]));
}

photoList.appendChild(fragment);

