const messages = {
  auth: {
    authIsSuccess: 'Авторизация прошла успешно',
    notAuthorised: 'Необходима авторизация',
    wrongEmailOrPassword: 'Неправильная почта или пароль',

  },
  card: {
    isNotValid: 'Ошибка валидации данных карточки',
    isDeleted: 'Карточка удалена',
    idIsNotFound: 'Нет карточки с таким id',
    idIsNotValid: 'id карточки невалиден',
  },
  registration: {
    emailIsNotUnique: 'Данный email уже зарегестрирован',
  },
  user: {
    idIsNotValid: 'id пользователя невалиден',
    idIsNotFound: 'Нет пользователя с таким id',
    passwordIsNotValid: 'Длинна пароля менее 8 символов, либо пароль не валиден',
  },
  validation: {
    urlIsNotValid: 'URL невалиден',
    notFound: 'Запрашиваемый ресурс не найден',
  },
};

module.exports = messages;
