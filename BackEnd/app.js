const express = require("express");
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded());
   
// app.use(express.static("public"));!!!!!!!!!!!!!!!!!!!!
//jopa.ejs
// app.use(express.static(`${__dirname}/public`));
// console.log(`${__dirname}/public`)

app.use('/static', express.static(path.join(__dirname, 'public')))

// условная база данных
const users = [{
    "id":1,
    "name":"Tom",
    "age":24
  },
  {
    "id":2,
    "name":"Bob",
    "age":27
  },
  {
    "id":3,
    "name":"Alice",
    "age":"23"
}];
let id = 1;     // для установки идентификаторов
 
// вспомогательная функция для поиска индекса пользователя по id
function findUserIndexById(id){
    for(let i=0; i < users.length; i++){
        if(users[i].id==id) return i;
    }
    return -1;
}
app.get("/api/users", function(_, res){
        
    res.send('users');
    console.log("/api/users")
});

app.get("/api/userss", function(req, res){
    
    const jopa = req.query.jopa;
    const xyi = "/api/userss/" + jopa;

    res.send(xyi);
    console.log(xyi)
});

app.get("/api/indexxx", function(req, res){
        
    res.sendFile(__dirname + '/index.html')
    console.log(__dirname + '/index.html')
});
// получение одного пользователя по id
app.get("/api/users/:id", function(req, res){
        
    const id = req.params.id; // получаем id
    console.log(req.headers);

    res.send(id) 
    // находим в массиве пользователя по id
    // const index = findUserIndexById(id);
    // // отправляем пользователя
    // if(index > -1){
    //     res.send(users[index]);
    // }
    // else{
    //     res.status(404).send("User not found");
    // }
});
// получение отправленных данных
app.post("/api/post", function (req, res) { 
    const choto = req.body.choto 

    console.log(choto);

    res.send(choto) 
    // if(!req.body) return res.sendStatus(400);
       
    // const userName = req.body.name;
    // const userAge = req.body.age;
    // const user = {name: userName, age: userAge};
    // // присваиваем идентификатор из переменной id и увеличиваем ее на единицу
    // user.id = id++;
    // // добавляем пользователя в массив
    // users.push(user);
    // res.send(user);
});
 // удаление пользователя по id
app.delete("/api/users/:id", function(req, res){
        
    const id = req.params.id;
    const index = findUserIndexById(id);
    if(index > -1){
        // удаляем пользователя из массива по индексу
        const user = users.splice(index, 1)[0];
        res.send(user);
    }
    else{
        res.status(404).send("User not found");
    }
});
// изменение пользователя
app.put("/api/users", function(req, res){
        
    if(!req.body) return res.sendStatus(400);
       
    const id = req.body.id;
    const userName = req.body.name;
    const userAge = req.body.age;
       
    const index = findUserIndexById(id);
    if(index > -1){
        // изменяем данные у пользователя
        const user = users[index];
        user.age = userAge;
        user.name = userName;
        res.send(user);
    }
    else{
        res.status(404).send("User not found");
    }
});
    
app.listen(3001, function(){
    console.log("Сервер ожидает подключения...");
});