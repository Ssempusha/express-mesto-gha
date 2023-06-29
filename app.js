// экспортируем express для создания сервера
const express = require('express');
const mongoose = require('mongoose');
// создаём приложение
const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb', { family: 4 });
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
// приложение прочитает тело запроса и выведет в формате json
app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '649a0977127020e5b7a97137', // захардкодили айдишник
  };

  next();
});
// при обращении на /users используется usersRouter
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

// обращение к 3000 порту
app.listen(3000, () => {
  console.log('Сервер запущен');
});
