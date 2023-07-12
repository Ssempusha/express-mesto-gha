const router = require('express').Router();
const {
  getUsers,
  getUserInfo,
  getUserById,
  updateUser,
  updateAvatar,
} = require('../controllers/users');
// при обращении к get '/users' и т.д выполнится createUser и т.д
router.get('/', getUsers); // возвращает всех пользователей
router.get('/me', getUserInfo); // возвращает информацию о текущем пользователе
router.get('/:userId', getUserById); // возвращает пользователя по _id
router.patch('/me', updateUser); // обновляет профиль
router.patch('/me/avatar', updateAvatar); // обновляет аватар

module.exports = router;
