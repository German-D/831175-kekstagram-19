'use strict';

(function () {
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
      if (evt.target.tagName === 'INPUT') {
        return;
      } else {
        imgUploadCancelClickHandler();
        window.preview.bigPictureCancelClickHandler();
      }
    }
    if (evt.key === 'Enter') {
      window.preview.picturesClickHandler(evt);
    }
  };

  imgUploadCancel.addEventListener('click', imgUploadCancelClickHandler);
  document.addEventListener('keydown', documentKeydownHandler); // Закрытие формы по Esc

  /* ++++++++++ ++++++++++ ++++++++++ ++++++++++ ++++++++++++++++++++ ++++++++++ */
  // Не закрываю форму нового изображения по Esc на инпуте хэштегов
  var textHashtags = document.querySelector('.text__hashtags');

  var textHashtagsKeydownhandler = function (evt) {
    // if (evt.key === 'Escape') {
    //   console.log(evt);
    //   evt.stopPropagation();
    // }
  };

  textHashtags.addEventListener('keydown', textHashtagsKeydownhandler);

  /* ++++++++++ ++++++++++ ++++++++++ ++++++++++ ++++++++++++++++++++ ++++++++++ */
  // Вычисляю значение прогресса пина
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelLine = document.querySelector('.effect-level__line');
  var calculatePinProgress = function () {

    var coordinateLineX = effectLevelLine.getBoundingClientRect().x;
    var coordinatePinX = effectLevelPin.getBoundingClientRect().x;
    var lineLength = effectLevelLine.clientWidth;
    var pinProgress = Math.round(100 * (coordinatePinX - coordinateLineX) / lineLength);
    // console.log(pinProgress);
    return pinProgress;
  };

  /* ++++++++++ ++++++++++ ++++++++++ ++++++++++ ++++++++++++++++++++ ++++++++++ */
  var effectLevelDepth = document.querySelector('.effect-level__depth');

  var effectLevelPinMousedownHandler = function (evt) {
    evt.preventDefault();

    var shiftX = evt.clientX - effectLevelPin.getBoundingClientRect().left;

    var documentMouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var newLeft = moveEvt.clientX - shiftX - effectLevelLine.getBoundingClientRect().left;

      // курсор вышел из слайдера => оставить бегунок в его границах.
      if (newLeft < 0) {
        newLeft = 0;
      }

      var rightEdge = effectLevelLine.offsetWidth - effectLevelPin.offsetWidth;

      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }

      effectLevelPin.style.left = newLeft + effectLevelPin.offsetWidth / 2 + 'px';
      effectLevelDepth.style.width = newLeft + effectLevelPin.offsetWidth + 'px';

      // Меняю эффект большой картинки в зависимости от класса при передвижении Пина
      var effectProgress = calculatePinProgress();

      // Все варианты эффектов + пропорции эффекта
      var options = {
        'effects__preview--chrome': {
          effect: 'grayscale',
          proportionValue: function (progress) {
            return progress / 100;
          },
        },
        'effects__preview--sepia': {
          effect: 'sepia',
          proportionValue: function (progress) {
            return progress / 100;
          },
        },
        'effects__preview--marvin': {
          effect: 'invert',
        },
        'effects__preview--phobos': {
          effect: 'blur',
          proportionValue: function (progress) {
            return progress * 3 / 100;
          },
        },
        'effects__preview--heat': {
          effect: 'brightness',
          proportionValue: function (progress) {
            return progress * 2 / 100 + 1;
          },
        },

      };

      if (mainImg.classList.contains('effects__preview--chrome')) {
        mainImg.style.filter = options['effects__preview--chrome'].effect + '(' + options['effects__preview--chrome'].proportionValue(effectProgress) + ')';
      }

      if (mainImg.classList.contains('effects__preview--sepia')) {
        mainImg.style.filter = options['effects__preview--sepia'].effect + '(' + options['effects__preview--sepia'].proportionValue(effectProgress) + ')';
      }

      if (mainImg.classList.contains('effects__preview--marvin')) {
        mainImg.style.filter = options['effects__preview--marvin'].effect + '(' + effectProgress + '%)';
      }

      if (mainImg.classList.contains('effects__preview--phobos')) {
        mainImg.style.filter = options['effects__preview--phobos'].effect + '(' + options['effects__preview--phobos'].proportionValue(effectProgress) + 'px)';

      } else if (mainImg.classList.contains('effects__preview--heat')) {
        mainImg.style.filter = options['effects__preview--heat'].effect + '(' + options['effects__preview--heat'].proportionValue(effectProgress) + ')';
      }
    };

    var documentMouseUpHandler = function () {

      document.removeEventListener('mousemove', documentMouseMoveHandler);
      document.removeEventListener('mouseup', documentMouseUpHandler);
    };

    document.addEventListener('mousemove', documentMouseMoveHandler);
    document.addEventListener('mouseup', documentMouseUpHandler);
  };

  effectLevelPin.ondragstart = function () {
    return false;
  };

  effectLevelPin.addEventListener('mousedown', effectLevelPinMousedownHandler);

  /* ++++++++++ ++++++++++ ++++++++++ ++++++++++ ++++++++++++++++++++ ++++++++++ */
  // создаю массив только с уникальными значениями
  var getUniqueArray = function (array) {
    var uniqueArray = [];
    for (var y = 0; y < array.length; y++) {
      var arrayLowCase = array[y].toLowerCase();
      if (!uniqueArray.includes(arrayLowCase)) {
        uniqueArray.push(arrayLowCase);
      }
    }
    return uniqueArray;
  };

  // Валидация инпута ввода хэштегов
  var textHashtagsInputhandler = function (evt) {
    var hashtagsValue = evt.target.value;
    var hashtagsArray = hashtagsValue.split(/\s+/);
    var RegExpHashtags = /^#[a-zA-Z0-9а-яА-Я]{1,19}$/i;

    var uniqueHashtagsArray = getUniqueArray(hashtagsArray);

    for (var r = 0; r < hashtagsArray.length; r++) {
      if (!RegExpHashtags.test(hashtagsArray[r])) { // Проверка на регулярку
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
  // Обрабатываю клик по фильтру
  var allFilters = document.querySelectorAll('.effects__radio');
  var mainImgWrapper = document.querySelector('.img-upload__preview');
  var mainImg = mainImgWrapper.querySelector('img');
  var effectLine = document.querySelector('.img-upload__effect-level');

  var allFiltersOnchangeHandler = function (evt) {
    var effect = evt.target.value;
    var className = 'effects__preview--' + effect;

    mainImg.className = '';
    mainImg.style.filter = '';
    // Обнуляю пин и полосу прогресса
    effectLevelPin.style.left = effectLevelLine.offsetWidth - effectLevelPin.offsetWidth / 2 + 'px';
    effectLevelDepth.style.width = effectLevelLine.offsetWidth - effectLevelPin.offsetWidth / 2 + 'px';

    // Логика скрытия слайдера
    if (evt.target.id !== 'effect-none') {
      effectLine.classList.remove('visually-hidden');
    } else {
      effectLine.classList.add('visually-hidden');
    }
    // Логика добавления css стиля
    mainImg.classList.add(className);
  };

  for (var j = 0; j < allFilters.length; j++) {
    allFilters[j].addEventListener('change', allFiltersOnchangeHandler);
  }
})();
