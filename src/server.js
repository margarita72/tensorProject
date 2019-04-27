let data = [
    {user: 1, id: 1, name: "Доска 1", removed:false, done: false, hasChildren:true},
    {user: 1, id: 2, name: "Доска 2", removed:false, done: false},
    {user: 1, id: 3, name: "Доска 3", removed:false, done: false},
    {user: 1, id: 4, parent: 1, name: "Список задач 1.1", removed:false, done: false, hasChildren: true},
    {user: 1, id: 5, parent: 1, name: "Список задач 1.2", removed:false, done: false, hasChildren: true},
    {user: 1, id: 6, parent: 1, name: "Список задач 1.3", removed:false, done: false},
    {user: 1, id: 7, parent: 1, name: "Список задач 1.4", removed:false, done: false},
    {user: 1, id: 8, parent: 2, name: "Список задач 2.1", removed:false, done: false},
    {user: 1, id: 9, parent: 4, name: "Задача 1.1.1", removed:false, done: true, description: "Programmers never sleep"},
    {user: 1, id: 10, parent: 4, name: "Задача 1.1.2", removed: false, done: false},
    {user: 1, id: 11, parent: 5, name: "Задача 1.2.1", removed: false, done: false},
    {user: 1, id: 12, parent: 5, name: "Задача 1.2.2", removed: false, done: false},
    {user: 1, id: 13, parent: 5, name: "Задача 1.2.3", removed: false, done: false},
    {user: 1, id: 14, parent: 5, name: "Задача 1.2.4", removed: false, done: false},
    {user: 1, id: 15, parent: 5, name: "Задача 1.2.5", removed: false, done: false},
    {user: 1, id: 16, parent: 5, name: "Задача 1.2.6", removed: false, done: false},
    {user: 1, id: 17, parent: 5, name: "Задача 1.2.7", removed: false, done: false},
    {user: 1, id: 18, parent: 8, name: "Задача 2.1.1", removed: false, done: false},

    {user: 2, id: 19, name: "Доска 1", removed:false, done: false},
    {user: 2, id: 20, name: "Доска 2", removed:false, done: false},

];
let currentID = data.length + 1;
let authID = null;

let users = [
    {id: 1, username: 'admin', pass: '1234', name: 'Администратор'},
    {id: 2, username: 'gagikpog', pass: '1951', name: 'Гагик'}
];

/**
 * @description Mock-функция, эмулирующая работу запроса к серверу. Получает дочерние элементы по идентификатору объекта и передает в callback.
 * @param {number} id Номер доски.
 * @name loadChildren
 * @function
 * @returns {Promise<dataMode[]>}
 */
exports.loadChildren = function (id){
    return new Promise(function(resolve){
        let res = [],  //Пустой массив.   
            i = 0;
        for (i = 0; i < data.length; i++) {
            if(data[i].parent == id && data[i].user == authID) {  //Цикл перебирает элемент data и если находит схожий id, то создаётся objectik и обновляется с добавленным значением.
                res.push(data[i]);
            }
        }
        resolve(res);
    });
}


/**
 * @description 
 * @param {dataMode} obj
 * @function
 * @name sendData
 * @returns {Promise<void>}
 */
exports.sendData = function (obj) {
    return new Promise(function(resolve,reject) {
        let i = 0;
        for (i = 0; i < data.length; i++) {
            if (data[i].id == obj.id){ 
                let keys = Object.keys(obj),
                    j;
                for (j = 0; j < keys.length; j++) {
                    data[i][keys[j]] = obj[keys[j]];
                }
                let res = [];
                res[0] = data[i];
                resolve(res);
                return;
            }
        }
        reject();
    });
}

/**
 * @description
 * @param {Object} obj
 * @function
 * @name newRecord
 * @returns {Promise}
 */
exports.newRecord = function(obj) {
    return new Promise(function(resolve,reject) {
        data = data.concat(obj);
        data[data.length-1].id = currentID++;
        data[data.length-1].user = authID;
        resolve(data[data.length-1]);
        //reject();
    });
}

/**
 * @description
 * @param {Object} user
 * @function
 * @name LogIn
 * @returns {Promise}
 */
exports.logIn = function(user){
    return new Promise(function(resolve,reject){
        let i;
        for (i = 0; i < users.length; i++) {
            if(users[i].username == user.username && users[i].pass == user.pass){
                resolve(users[i]);
                authID = users[i].id;
                return;
            }
        }
        reject();
    });    
}