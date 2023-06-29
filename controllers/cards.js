const Card = require('../models/card');

const ERROR_BAD_REQ = 400;
const ERROR_NOT_FOUND = 404;
const ERROR_SERVER = 500;
const CREATED = 201;

// создаёт карточку
const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => {
      res.status(CREATED).send(card);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(ERROR_BAD_REQ).send({ message: 'Переданы некорректные данные при создании карточки' });
      } else {
        res.status(ERROR_SERVER).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

// возвращает все карточки
const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(() => {
      res.status(ERROR_SERVER).send({ message: 'На сервере произошла ошибка' });
    });
};

// удаляет карточку по идентификатору
const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(ERROR_NOT_FOUND).send({ message: 'Карточка с указанным _id не найдена' });
        return;
      }
      res.send(card);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(ERROR_BAD_REQ).send({ message: 'Переданы некорректные данные при удалении карточки' });
      } else {
        res.status(ERROR_SERVER).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

// лайк карточке
const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(ERROR_NOT_FOUND).send({ message: 'Передан несуществующий _id карточки' });
        return;
      }
      res.send(card);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(ERROR_BAD_REQ).send({ message: 'Переданы некорректные данные для постановки лайка' });
      } else {
        res.status(ERROR_SERVER).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

// дизлайк карточке
const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(ERROR_NOT_FOUND).send({ message: 'Передан несуществующий _id карточки' });
        return;
      }
      res.send(card);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(ERROR_BAD_REQ).send({ message: 'Переданы некорректные данные для снятия лайка' });
      } else {
        res.status(ERROR_SERVER).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
};
