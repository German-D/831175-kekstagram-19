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
  socialCaption: document.querySelector('.social__caption'),
  uploadFile: document.querySelector('#upload-file'),
  imgUploadOverlay: document.querySelector('.img-upload__overlay'),
  imgUploadCancel: document.querySelector('.img-upload__cancel'),
  textHashtags: document.querySelector('.text__hashtags'),
  effectLevelPin: document.querySelector('.effect-level__pin'),
  effectLevelLine: document.querySelector('.effect-level__line'),
  effectsList: document.querySelector('.effects__list'),
  imgUploadSubmit: document.querySelector('.img-upload__submit'),
  pictures: document.querySelector('.pictures'),
  bigPictureCancel: document.querySelector('.big-picture__cancel')
};

document.querySelector('body').classList.add('modal-open');
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

function renderPhoto(photosElement, templateElement, i) {
  var photoElement = templateElement.cloneNode(true);

  photoElement.querySelector('.picture__img').src = photosElement.url;
  photoElement.querySelector('.picture__likes').textContent = photosElement.likes;
  photoElement.querySelector('.picture__comments').textContent = photosElement.comments.length;
  photoElement.querySelector('.picture__img').dataset.id = i;

  return photoElement;
}

var fragment = document.createDocumentFragment();
for (i = 0; i < photosArray.length; i++) {
  fragment.appendChild(renderPhoto(photosArray[i], photoTemplate, i));
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

var uploadFileChangeHandler = function () {
  dom.imgUploadOverlay.classList.remove('hidden');
};

var imgUploadCancelClickHandler = function () {
  dom.imgUploadOverlay.classList.add('hidden');
  dom.uploadFile.value = '';
};

var documentKeydownHandler = function (evt) {
  if (evt.key === 'Escape') {
    imgUploadCancelClickHandler();
    bigPictureCancelClickHandler();
  }
};

var textHashtagsKeydownhandler = function (evt) {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
};

var calculatePinProgress = function () {
  var coordinateLineX = dom.effectLevelLine.getBoundingClientRect().x;
  var coordinatePinX = dom.effectLevelPin.getBoundingClientRect().x;
  var lineLength = dom.effectLevelLine.clientWidth;
  var pinProgress = Math.round(100 * (coordinatePinX - coordinateLineX) / lineLength);
  return pinProgress;
};

var effectLevelPinMouseupHandler = function () {
  calculatePinProgress();
};

var effectsListClickHandler = function (evt) {
  if (evt.target.tagName !== 'LABEL') {
    calculatePinProgress();
  }
};

var textHashtagsInputhandler = function () {
  var hashtagsValue = dom.textHashtags.value;
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
      dom.textHashtags.setCustomValidity('Хэштег начинается с #, не содержит спецсимволы и не может состоять из #');
      return;
    }

    if (hashtagsArray.length > 5) { // Максимум 5 хэштегов
      dom.textHashtags.setCustomValidity('Нельзя указывать больше 5 хэштегов');
      return;
    }

    if (hashtagsArray.length > uniqueHashtagsArray.length) { // Один и тот же хэштег не модет быть использолван дважды
      dom.textHashtags.setCustomValidity('Нельзя указать одинаковые хэштеги');
      return;
    }
    dom.textHashtags.setCustomValidity('');
  }
};

var picturesClickHandler = function (evt) {
  if (evt.target.classList.contains('picture__img')) {
    var photoInfo = photos[evt.target.dataset.id];
    dom.bigPicture.querySelector('img').src = photoInfo.url;
    dom.bigPicture.classList.remove('hidden');
  }
};

var bigPictureCancelClickHandler = function () {
  dom.bigPicture.classList.add('hidden');
};


dom.uploadFile.addEventListener('change', uploadFileChangeHandler); // Показываю форму при загрузке изображения
dom.imgUploadCancel.addEventListener('click', imgUploadCancelClickHandler); // Закрытие формы по крестику
document.addEventListener('keydown', documentKeydownHandler); // Закрытие формы по Esc
dom.textHashtags.addEventListener('keydown', textHashtagsKeydownhandler); // Не закрываю форму по Esc на инпуте
dom.effectLevelPin.addEventListener('mouseup', effectLevelPinMouseupHandler); // Определяю прогресс пина
dom.effectsList.addEventListener('click', effectsListClickHandler); // Обнуляю значение прогресса пина
dom.textHashtags.addEventListener('input', textHashtagsInputhandler); // Валидация хэштегов
dom.pictures.addEventListener('click', picturesClickHandler);
dom.bigPictureCancel.addEventListener('click', bigPictureCancelClickHandler);

