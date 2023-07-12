// экспортируем express для создания сервера
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middlewares/errors');
// создаём приложение
const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb', { family: 4 });
const ERROR_NOT_FOUND = 404;
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
// приложение прочитает тело запроса и выведет в формате json
app.use(express.json());
app.use(helmet());
app.use(cookieParser());

app.post('/signup', createUser);
app.post('/signin', login);
app.use(auth); // нужна размещать над теми запросами где нужна проверка на токен
// при обращении на /users используется usersRouter
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
// при обращении на любые другие роуты произойдёт ошибка
app.use('*', (req, res, next) => {
  res.status(ERROR_NOT_FOUND).send({ message: 'Страница не найдена' });
  next();
});

// мидлвара которая обрабатывает ошибки. нужно подключать в конце файла
app.use(errorHandler);

// обращение к 3000 порту
app.listen(3000, () => {
  console.log('Сервер запущен');
});
