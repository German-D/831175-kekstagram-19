'use strict';

var i;
var photos = [];

var effectsList = document.querySelector('.effects__list');
var pictures = document.querySelector('.pictures');
var bigPictureCancel = document.querySelector('.big-picture__cancel');
var socialFooterText = document.querySelector('.social__footer-text');

document.querySelector('body').classList.add('modal-open');

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
  'Gena',
];

var descriptions = [
  'Avatar',
  'super photo',
  'logo',
  'spinner',
  'nice photo',
  'insta photo',
];

var messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

/* ++++++++++ ++++++++++ ++++++++++ ++++++++++ ++++++++++++++++++++ ++++++++++ */

// Функция получения случайного целого числа в заданном интервале. Максимум и минимум включаются
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* ++++++++++ ++++++++++ ++++++++++ ++++++++++ ++++++++++++++++++++ ++++++++++ */

// Функция поиска случайного элемента в массиве
function getRandomElement(array) {
  var getRandomElementPosition = getRandomIntInclusive(0, array.length - 1);
  return array[getRandomElementPosition];
}

/* ++++++++++ ++++++++++ ++++++++++ ++++++++++ ++++++++++++++++++++ ++++++++++ */

// Функция для создания описания одной фотографии
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

/* ++++++++++ ++++++++++ ++++++++++ ++++++++++ ++++++++++++++++++++ ++++++++++ */

// Функция для создания комментария к одной фотографии
function addNewComment(messagesArray, namesArray) {
  var comments = [];
  var quantityComments = getRandomIntInclusive(1, 10); // Случайное число от 1 до 10 включительно
  for (i = 0; i < quantityComments; i++) {
    var tmp = getRandomIntInclusive(1, 6); // Случайное число от 1 до 6 включительно
    comments.push({
      avatar: 'img/avatar-' + tmp + '.svg',
      message: addNewMessage(messagesArray),
      name: namesArray[getRandomIntInclusive(0, names.length)],
    });
  }
  return comments;
}

/* ++++++++++ ++++++++++ ++++++++++ ++++++++++ ++++++++++++++++++++ ++++++++++ */

// Функция для создания одной новой фотографии
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
      comments: addNewComment(messagesArray, namesArray),
    });
  }
  return mainArray;
}

/* ++++++++++ ++++++++++ ++++++++++ ++++++++++ ++++++++++++++++++++ ++++++++++ */

// Отрисовываю все фотографии в доме
var socialCommentCount = document.querySelector('.social__comment-count');
var commentsLoader = document.querySelector('.comments-loader');
var likesCount = document.querySelector('.likes-count');
var commentsCount = document.querySelector('.comments-count');
var socialCaption = document.querySelector('.social__caption');

socialCommentCount.classList.add('hidden'); // Прячу блоки счётчика комментариев
commentsLoader.classList.add('hidden'); // и загрузки новых комментариев

function renderPhoto(photosElement, templateElement, k) {
  var photoElement = templateElement.cloneNode(true);

  photoElement.querySelector('.picture__img').src = photosElement.url;
  photoElement.querySelector('.picture__likes').textContent = photosElement.likes;
  photoElement.querySelector('.picture__comments').textContent = photosElement.comments.length;
  photoElement.querySelector('.picture__img').dataset.id = k;

  return photoElement;
}
var bigPictureTagImg = document.querySelector('.big-picture__img img');
var photosArray = addNewPhoto(names, messages, descriptions, photos);
var photoTemplate = document.querySelector('#picture').content;
var photoList = document.querySelector('.pictures');
var socialComments = document.querySelector('.social__comments');


var fragment = document.createDocumentFragment();
for (i = 0; i < photosArray.length; i++) {
  fragment.appendChild(renderPhoto(photosArray[i], photoTemplate, i));
}

photoList.appendChild(fragment);

var firstPhoto = photos[0];
bigPictureTagImg.src = firstPhoto.url;
likesCount.textContent = firstPhoto.likes;
commentsCount.textContent = firstPhoto.comments.length;
socialCaption.textContent = firstPhoto.description;

// В задании поросят отрисовать cписок комментариев под фотографией
// В верстке есть два li. Кол-во комментариев до 10, задаётся в функции addNewComment
// Решил сделать логику:
// Если комментарий один, то меняю знавчения в первом li, а во втором останутся дефолтные.
// Если комментариев больше одного, то меняю описание обоих li на первые два
if (firstPhoto.comments.length === 1) {
  socialComments.querySelector('.social__picture').src = firstPhoto.comments[0].avatar;
  socialComments.querySelector('.social__picture').alt = firstPhoto.comments[0].name;
  socialComments.querySelector('.social__text').textContent = firstPhoto.comments[0].message;
} else {
  for (i = 0; i < 2; i++) {

    var firstComment = socialComments.querySelectorAll('li')[0]; // выбираю первый li
    var secondComment = socialComments.querySelectorAll('li')[1]; // выбираю второй li

    firstComment.querySelector('.social__picture').src = firstPhoto.comments[0].avatar;
    firstComment.querySelector('.social__picture').alt = firstPhoto.comments[0].name;
    firstComment.querySelector('.social__text').textContent = firstPhoto.comments[0].message;

    secondComment.querySelector('.social__picture').src = firstPhoto.comments[1].avatar;
    secondComment.querySelector('.social__picture').alt = firstPhoto.comments[1].name;
    secondComment.querySelector('.social__text').textContent = firstPhoto.comments[1].message;
  }
}

/* ++++++++++ ++++++++++ ++++++++++ ++++++++++ ++++++++++++++++++++ ++++++++++ */
// Показываю форму обработки фото при загрузке изображения
var uploadFile = document.querySelector('#upload-file');
var imgUploadOverlay = document.querySelector('.img-upload__overlay');

var uploadFileChangeHandler = function () {
  imgUploadOverlay.classList.remove('hidden');
};

uploadFile.addEventListener('change', uploadFileChangeHandler);

/* ++++++++++ ++++++++++ ++++++++++ ++++++++++ ++++++++++++++++++++ ++++++++++ */
// Закрытие формы эффектов фото по крестику
var imgUploadCancel = document.querySelector('.img-upload__cancel');

var imgUploadCancelClickHandler = function () {
  imgUploadOverlay.classList.add('hidden');
  uploadFile.value = '';
};

var documentKeydownHandler = function (evt) {
  if (evt.key === 'Escape') {
    imgUploadCancelClickHandler();
    bigPictureCancelClickHandler();
  }
  if (evt.key === 'Enter') {
    picturesClickHandler(evt);
  }
};

imgUploadCancel.addEventListener('click', imgUploadCancelClickHandler);
document.addEventListener('keydown', documentKeydownHandler); // Закрытие формы по Esc

/* ++++++++++ ++++++++++ ++++++++++ ++++++++++ ++++++++++++++++++++ ++++++++++ */
// Не закрываю форму нового изображения по Esc на инпуте хэштегов
var textHashtags = document.querySelector('.text__hashtags');

var textHashtagsKeydownhandler = function (evt) {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
};

textHashtags.addEventListener('keydown', textHashtagsKeydownhandler);

/* ++++++++++ ++++++++++ ++++++++++ ++++++++++ ++++++++++++++++++++ ++++++++++ */
// Определяю прогресс пина
var effectLevelPin = document.querySelector('.effect-level__pin');

var effectLevelPinMouseupHandler = function () {
  calculatePinProgress();
};

effectLevelPin.addEventListener('mouseup', effectLevelPinMouseupHandler);

/* ++++++++++ ++++++++++ ++++++++++ ++++++++++ ++++++++++++++++++++ ++++++++++ */
// Обнуляю значение прогресса пина
var calculatePinProgress = function () {
  var effectLevelLine = document.querySelector('.effect-level__line');


  var coordinateLineX = effectLevelLine.getBoundingClientRect().x;
  var coordinatePinX = effectLevelPin.getBoundingClientRect().x;
  var lineLength = effectLevelLine.clientWidth;
  var pinProgress = Math.round(100 * (coordinatePinX - coordinateLineX) / lineLength);
  return pinProgress;
};

/* ++++++++++ ++++++++++ ++++++++++ ++++++++++ */
var effectsListClickHandler = function (evt) {
  if (evt.target.tagName !== 'LABEL') {
    calculatePinProgress();
  }
};

effectsList.addEventListener('click', effectsListClickHandler);

/* ++++++++++ ++++++++++ ++++++++++ ++++++++++ ++++++++++++++++++++ ++++++++++ */
// Валидация инпута ввода хэштегов
var textHashtagsInputhandler = function () {
  var hashtagsValue = textHashtags.value;
  var hashtagsArray = hashtagsValue.split(/\s+/);
  var RegExpHashtags = /^#[a-zA-Z0-9а-яА-Я]{1,19}$/i;

  var getUniqueArray = function (array) { // создаю массив только с уникальными значениями
    var uniqueArray = [];
    for (i = 0; i < array.length; i++) {
      var arrayLowCase = array[i].toLowerCase();
      if (!uniqueArray.includes(arrayLowCase)) {
        uniqueArray.push(arrayLowCase);
      }
    }
    return uniqueArray;
  };

  var uniqueHashtagsArray = getUniqueArray(hashtagsArray);

  for (i = 0; i < hashtagsArray.length; i++) {
    if (!RegExpHashtags.test(hashtagsArray[i])) { // Проверка на регулярку
      textHashtags.setCustomValidity('Хэштег начинается с #, не содержит спецсимволы и не может состоять из #');
      return;
    }

    if (hashtagsArray.length > 5) { // Максимум 5 хэштегов
      textHashtags.setCustomValidity('Нельзя указывать больше 5 хэштегов');
      return;
    }

    if (hashtagsArray.length > uniqueHashtagsArray.length) { // Один и тот же хэштег не модет быть использолван дважды
      textHashtags.setCustomValidity('Нельзя указать одинаковые хэштеги');
      return;
    }
    textHashtags.setCustomValidity('');
  }
};

textHashtags.addEventListener('input', textHashtagsInputhandler);

/* ++++++++++ ++++++++++ ++++++++++ ++++++++++ ++++++++++++++++++++ ++++++++++ */
// Клик по контейнеру c фотографиями
var bigPicture = document.querySelector('.big-picture');
var picturesClickHandler = function (evt) {
  var getBigImg = function (smallPicture) {
    bigPicture.querySelector('img').src = smallPicture.url;
    bigPicture.querySelector('.likes-count').textContent = smallPicture.likes;
    bigPicture.querySelector('.social__caption').textContent = smallPicture.description;
    bigPicture.querySelectorAll('.social__text')[0].textContent = smallPicture.comments[0].message;
    bigPicture.querySelectorAll('.social__picture')[0].src = smallPicture.comments[0].avatar;

    if (smallPicture.comments.length > 1) {
      bigPicture.querySelectorAll('.social__text')[1].textContent = smallPicture.comments[1].message;
      bigPicture.querySelectorAll('.social__picture')[1].src = smallPicture.comments[1].avatar;
    }
    bigPicture.classList.remove('hidden');
  };

  // Если клик был клавишой Ентер
  if (evt.target.classList.contains('picture')) {
    var photoInfo1 = photos[evt.target.querySelector('.picture__img').dataset.id];
    getBigImg(photoInfo1);
    return;
  }

  // Если клик был мышкой
  if (evt.target.classList.contains('picture__img')) {
    var photoInfo = photos[evt.target.dataset.id];
    getBigImg(photoInfo);
  }
};

pictures.addEventListener('click', picturesClickHandler);

/* ++++++++++ ++++++++++ ++++++++++ ++++++++++ ++++++++++++++++++++ ++++++++++ */
// Закрытие большого фото
var bigPictureCancelClickHandler = function () {
  bigPicture.classList.add('hidden');
  socialFooterText.value = '';
};

bigPictureCancel.addEventListener('click', bigPictureCancelClickHandler);

/* ++++++++++ ++++++++++ ++++++++++ ++++++++++ ++++++++++++++++++++ ++++++++++ */
// Валидация комментария
var socialFooterTextInputHandler = function (evt) {
  var socialFooterTextValue = evt.target.value;
  if (socialFooterTextValue.length > 140) {
    socialFooterText.setCustomValidity('Длина комментария не должна привышать 140 символов');
    return;
  }
  socialFooterText.setCustomValidity('');
};

socialFooterText.addEventListener('input', socialFooterTextInputHandler);

/* ++++++++++ ++++++++++ ++++++++++ ++++++++++ ++++++++++++++++++++ ++++++++++ */
// Не закрываю форму по Enter
var socialFooterTextKeydownHandler = function (evt) {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
};

socialFooterText.addEventListener('keydown', socialFooterTextKeydownHandler);
