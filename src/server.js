let data = [
    {id: 1, name: "Доска 1", hasChildren:true},
    {id: 2, name: "Доска 2"},
    {id: 3, name: "Доска 3"},
    {id: 4, parent: 1, name: "Список задач 1.1", hasChildren: true},
    {id: 5, parent: 1, name: "Список задач 1.2", hasChildren: true},
    {id: 6, parent: 1, name: "Список задач 1.3"},
    {id: 7, parent: 1, name: "Список задач 1.4"},
    {id: 8, parent: 2, name: "Список задач 2.1"},
    {id: 9, parent: 4, name: "Задача 1.1.1", done: true, description: "Programmers never sleep"},
    {id: 10, parent: 4, name: "Задача 1.1.2"},
    {id: 11, parent: 5, name: "Задача 1.2.1"},
    {id: 12, parent: 5, name: "Задача 1.2.2"},
    {id: 13, parent: 5, name: "Задача 1.2.3"},
    {id: 14, parent: 5, name: "Задача 1.2.4"},
    {id: 15, parent: 5, name: "Задача 1.2.5"},
    {id: 16, parent: 5, name: "Задача 1.2.6"},
    {id: 17, parent: 5, name: "Задача 1.2.7"},
    {id: 18, parent: 8, name: "Задача 2.1.1"},
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
            if(data[i].parent == id) {  //Цикл перебирает элемент data и если находит схожий id, то создаётся objectik и обновляется с добавленным значением.
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
                resolve();        
                return;
            }
        }
        reject();
    });
}