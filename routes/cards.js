const router = require('express').Router();
const {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
// при обращении к get '/users' и т.д выполнится createUser и т.д
router.get('/', getCards); // возвращает все карточки
router.delete('/:cardId', deleteCard); // удаляет карточку по идентификатору
router.post('/', createCard); // создаёт карточку
router.put('/:cardId/likes', likeCard); // поставить лайк карточке
router.delete('/:cardId/likes', dislikeCard); // убрать лайк с карточки

module.exports = router;
