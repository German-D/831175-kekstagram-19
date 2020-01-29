'use strict';

var i;

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

// Функция для генерации массива вида 1,2…100
function getArray(a, b) {
  if (a >= b) {
    return [];
  }
  var r = [];
  for (var n = a; n <= b; n++) {
    r.push(i);
  }
  return r;
}

// Функция получения случайного целого числа в заданном интервале. Максимум и минимум включаются
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция поиска случайного элемента в массиве
function getRandomElement(array) {
  var getRandomElementOrder = getRandomIntInclusive(0, array.length);
  return array[getRandomElementOrder];
}

// Функция для создания описания
function addNewMessage(messageList) {
  var random2; // Случайное число от 1 до 2 включительно
  var newMessage;
  random2 = getRandomIntInclusive(1, 2);
  if (random2 === 1) {
    newMessage = messageList[getRandomIntInclusive(0, 6)];
  } else {
    newMessage = messageList[getRandomIntInclusive(0, 6)] + messageList[getRandomIntInclusive(0, 6)];
  }
  return newMessage;
}

// Функция для создания комментария
function addNewComment(messagesArray, namesArray) {
  var comments = [];
  var random10 = getRandomIntInclusive(1, 10); // Случайное число от 1 до 10 включительно
  var random6; // Случайное число от 1 до 6 включительно
  for (i = 0; i < random10; i++) {
    random6 = getRandomIntInclusive(1, 6);
    comments.push({
      avatar: 'img/avatar-' + random6 + '.svg',
      message: addNewMessage(messagesArray),
      name: namesArray[getRandomIntInclusive(0, 24)]
    });
  }
  return comments;
}

// Функция для создания новой фотографии
function addNewPhoto(namesArray, messagesArray, descriptionsArray) {
  var photos = [];
  var random25; // Случайное число от 1 до 25 включительно
  var newArray = getArray(1, 25); // Создаю новый массив от 1 до 25

  for (var k = 1; k < 25; k++) {
    random25 = getRandomElement(newArray); // Присваиваю random25 случайное значение из массива

    var random25Position = newArray.indexOf(random25); // Вычиляю позицию random25 в массиве newArray
    newArray.splice(random25Position, 1); // Удаляю позицию random25 в массиве newArray

    photos.push({
      url: 'photos/' + random25 + '.jpg',
      description: descriptionsArray[getRandomIntInclusive(0, 6)],
      likes: getRandomIntInclusive(15, 200),
      comments: addNewComment(messages, names)
    });
  }
  return photos;
}

var photosArray = addNewPhoto(names, messages, descriptions);


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
for (i = 0; i < photosArray.length; i++) {
  fragment.appendChild(renderPhoto(photosArray[i]));
}

photoList.appendChild(fragment);

