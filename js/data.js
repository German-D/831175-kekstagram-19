'use strict';

(function () {
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
    for (var i = 0; i < quantityComments; i++) {
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

  window.data = {
    names: names,
    descriptions: descriptions,
    messages: messages,
    photos: [],
    addNewPhoto: addNewPhoto
  };

})();
