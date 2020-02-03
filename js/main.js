'use strict';

var i;
var photos = [];

var dom = {
  bigPicture: document.querySelector('.big-picture'),
  bigPictureImg: document.querySelector('.big-picture__img'),
  bigPictureTagImg: document.querySelector('.big-picture__img img'),
  socialCommentCount: document.querySelector('.social__comment-count'),
  commentsLoader: document.querySelector('.comments-loader'),
  likesCount: document.querySelector('.likes-count'),
  commentsCount: document.querySelector('.comments-count'),
  socialComments: document.querySelector('.social__comments'),
  socialCaption: document.querySelector('.social__caption')
};

document.querySelector('body').classList.add('modal-open');
dom.bigPicture.classList.remove('hidden');
dom.socialCommentCount.classList.add('hidden'); // Прячу блоки счётчика комментариев
dom.commentsLoader.classList.add('hidden'); // и загрузки новых комментариев

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

// Функция получения случайного целого числа в заданном интервале. Максимум и минимум включаются
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция поиска случайного элемента в массиве
function getRandomElement(array) {
  var getRandomElementPosition = getRandomIntInclusive(0, array.length - 1);
  return array[getRandomElementPosition];
}

// Функция для создания описания
function addNewMessage(messageList) {
  var newMessage;
  var tmp = getRandomIntInclusive(1, 2); // Случайное число от 1 до 2 включительно
  if (tmp === 1) {
    newMessage = messageList[getRandomIntInclusive(0, 5)];
  } else {
    newMessage = messageList[getRandomIntInclusive(0, 5)] + messageList[getRandomIntInclusive(0, 5)];
  }
  return newMessage;
}

// Функция для создания комментария
function addNewComment(messagesArray, namesArray) {
  var comments = [];
  var quantityComments = getRandomIntInclusive(1, 10); // Случайное число от 1 до 10 включительно
  for (i = 0; i < quantityComments; i++) {
    var tmp = getRandomIntInclusive(1, 6); // Случайное число от 1 до 6 включительно
    comments.push({
      avatar: 'img/avatar-' + tmp + '.svg',
      message: addNewMessage(messagesArray),
      name: namesArray[getRandomIntInclusive(0, names.length)]
    });
  }
  return comments;
}

// Функция для создания новой фотографии
function addNewPhoto(namesArray, messagesArray, descriptionsArray, mainArray) {
  var photosCount = 25;
  var newArray = []; // Создаю новый массив от 1 до 25
  for (var n = 1; n <= photosCount; n++) {
    newArray.push(n);
  }

  for (var k = 0; k < photosCount; k++) {
    var randomArrayPosition = getRandomIntInclusive(0, newArray.length - 1);
    var tmpArray = newArray.splice(randomArrayPosition, 1); // уменьшаю массив newArray
    var descriptionArrayRandomElement = getRandomElement(descriptionsArray);

    mainArray.push({
      url: 'photos/' + tmpArray[0] + '.jpg',
      description: descriptionArrayRandomElement,
      likes: getRandomIntInclusive(15, 200),
      comments: addNewComment(messagesArray, namesArray)
    });
  }
  return mainArray;
}

var photosArray = addNewPhoto(names, messages, descriptions, photos);


var photoTemplate = document.querySelector('#picture').content;
var photoList = document.querySelector('.pictures');

function renderPhoto(photosElement, templateElement) {
  var photoElement = templateElement.cloneNode(true);

  photoElement.querySelector('.picture__img').src = photosElement.url;
  photoElement.querySelector('.picture__likes').textContent = photosElement.likes;
  photoElement.querySelector('.picture__comments').textContent = photosElement.comments.length;

  return photoElement;
}

var fragment = document.createDocumentFragment();
for (i = 0; i < photosArray.length; i++) {
  fragment.appendChild(renderPhoto(photosArray[i], photoTemplate));
}

photoList.appendChild(fragment);

var firstPhoto = photos[0];
dom.bigPictureTagImg.src = firstPhoto.url;
dom.likesCount.textContent = firstPhoto.likes;
dom.commentsCount.textContent = firstPhoto.comments.length;
dom.socialCaption.textContent = firstPhoto.description;

// В задании поросят отрисовать cписок комментариев под фотографией
// В верстке есть два li. Кол-во комментариев до 10, задаётся в функции addNewComment
// Решил сделать логику:
// Если комментарий один, то меняю знавчения в первом li, а во втором останутся дефолтные.
// Если комментариев больше одного, то меняю описание обоих li на первые два
if (firstPhoto.comments.length === 1) {
  dom.socialComments.querySelector('.social__picture').src = firstPhoto.comments[0].avatar;
  dom.socialComments.querySelector('.social__picture').alt = firstPhoto.comments[0].name;
  dom.socialComments.querySelector('.social__text').textContent = firstPhoto.comments[0].message;
} else {
  for (i = 0; i < 2; i++) {

    var firstComment = dom.socialComments.querySelectorAll('li')[0]; // выбираю первый li
    var secondComment = dom.socialComments.querySelectorAll('li')[1]; // выбираю второй li

    firstComment.querySelector('.social__picture').src = firstPhoto.comments[0].avatar;
    firstComment.querySelector('.social__picture').alt = firstPhoto.comments[0].name;
    firstComment.querySelector('.social__text').textContent = firstPhoto.comments[0].message;

    secondComment.querySelector('.social__picture').src = firstPhoto.comments[1].avatar;
    secondComment.querySelector('.social__picture').alt = firstPhoto.comments[1].name;
    secondComment.querySelector('.social__text').textContent = firstPhoto.comments[1].message;
  }
}
