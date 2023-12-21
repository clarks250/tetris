# необходимо установить библиотеку 
> **npm install express**

# для запуска приложения:
1. необходимо перейти в дерикторию: **backendTetris**
2. **node server.js**

# результат выполнения можно глянуть по url:
> http://localhost:3000/tetrus 

# необходимо установить postgreSQL и убедиться в работоспособности под админом
1. гайд по node.js and express and postgreSQL https://www.youtube.com/watch?v=p3RFMEixUOE
2. скачть postgreSQL https://www.postgresql.org/download/
3. открываем **CMD** под админом переходим в расположение postgreSQL
4. проверяем команды из инструкции https://winitpro.ru/index.php/2019/10/25/ustanovka-nastrojka-postgresql-v-windows/
5. создаем базу данных для приложения "tetrus"
6. в SQL запросах к бд создаем таблицу для записи данных о пользователе (запрос находится в файле db.sql)

# запросы для тестирования в постмане
1. добавление пользователя - method: POST url: http://localhost:3000/api/user
```js
{
    "name": "dmitry",
    "telegram": "@dmitry",
    "score": 2000
}
```
2. получения списка пользователей с их результатами по убыванию - method: GET url: http://localhost:3000/api/leaderboard
3. получение информации о конкретном пользователе по его ID - method: GET url: http://localhost:3000/api/user/1
4. редактирвание информации о пользователе по его ID переданому в .json - method: PUT url: http://localhost:3000/api/user
```js
{
    "id": 1,
    "name": "emil",
    "telegram": "@emil",
    "score": 500
}
```
5. удаление пользователя по переданному ID - method: DELETE url: http://localhost:3000/api/user/1

# запросы через клиентскую часть 
1. добавление пользователя - url: http://localhost:3000/form