function makeList(data)
{
    if (data === undefined || data.length === 0)            //Если объект не определен, то осуществляется выход.
        return '';
    let res = '';  
    res += '<ul>';                                          //Начало маркированного списка.       
    for(let i = 0;i<data.length;i++)                        //Каждый объект находится в массиве. Цикл проверяет все элементы массива.
    {   
        res += '<li>';                                      //Новая строка в списке.
        if(data[i].name === undefined)                      //Если поле name не существует, то вызывается исключение.
            throw  new Error('каждый объект обязательно должен иметь поле "name"'); 
        
        res += data[i].name;                                //Запись имени в список.
        res +=  makeList(data[i].children);                 //Вызов выполняется с помощью рекурсии. Строка с новым списком добавляется к старой строке.
        res += '</li>';                                     //Строка списка закрывается.
    }
    res += '</ul>';                                         //Закрытие списка.
    return res;                                             //Возвращение списка.
}

function parse(jsonObj)
{
    if(jsonObj === undefined)                               //Если в функцию ничего не передали генерируется исключение
        throw new Error('Объект не был передан в функцию');
    let objData;
    try {
        if(typeof(jsonObj) === 'object'){                   //Если передан строка то нужно преобразовать его в объект
            objData = jsonObj;
        }else {
            objData = JSON.parse(jsonObj);                  //Берётся текст и создается объект типа JSON.
        }  
    } catch (error) {
        alert('строка не соответствует синтаксису JSON');   //Обработка исключения, выводится сообщение об ошибке.
        return;                                             //Выход из функции.
    }   
    try {
        document.write(makeList(objData));                  //Вызов функции преобразования. То, что она возвращает(список), выводится на страницу.  
    } catch (e) {
        alert(e.message);                                   //Обработка исключения. Выводится сообщение об ошибке.
        return;                                             //Выход из функции.
    }
}






class User{
    constructor(id, parent, hasChildren) {
        this.id=id;
        this.parent=parent;
        this.hasChildren=hasChildren;
    }

    getDelete: function () {
        this.removed = true;    
    }

    getUpdate function (jsonObj) {
        for (const i in updObj) {                           //Цикл по всем ключам в объекте.
            if(this[i] !== undefined)                       //Если поле существует, то изменить значение
                    this[i] = updObj[i];
        }
    }

    getRead function (id){
        if(this.removed)                                    //Проверка значения элемента. Если он отмечен как удаленный, то возвращаем undefined. 
            return; 
        if(key)                                             //Если был передан ключ, то функция должна вернуть значение по ключу.
        {
            if(this[key]) 
                return this[key];                           //Возвращает значение свойства с ключом key.
            else return null;                               //Если ключа не существует или значение в нём пусто – возвращает null.
        }                                                   //метод возвращает объект без методов объекта если ключ не передан.

        let tmp = {};                                       //Создаётся пустой оъект.
        let keys = Object.keys(this);
        for (let i = 0; i < keys.length;i++) {              //Перебрать все методы и выделить все поля.
            if(typeof this[keys[i]] !== 'function')         //Если не функция, то поле со значением копируется в новый объект.
                tmp[keys[i]] = this[keys[i]]; 
        }
        let m = [];
        m[0] = tmp;
        return m;                                           //Возвращаем объект без методов.
    }

    getChildren (callback){

    }

    loadChildren (id, callback){
        
    }
}





































/**
 * Функция принимает объект и возвращает строку. 
 * Объект передается по рекурсии. 
 * Каждый вызов - это переход на следующий уровень вложения JSON.
 * @param {Object} data - принимает JSON объект.
 * @returns {String} - строка в формате HTML список.
 * @example 
 * 
 * initial (
 *         [ 
 *            [
 *               {
 *                  "name": "Доска 1",
 *                  "children": [
 *                     {
 *                        "name": "Список задач 1.1",
 *                        "children": [
 *                        { "name": "Задача 1.1.1" },
 *                        { "name": "Задача 1.1.2" }
 *                     ]   
 *                     },
 *                     {"name": "Список задач 1.2",
 *                      "children": [
 *                          { "name": "Задача 1.2.1" }, 
 *                          { "name": "Задача 1.2.2" }
 *                     ]
 *                 },
 *                 {
 *                    "name": "Список задач 1.3"
 *                 }
 *                 ]
 *               },
 *               {
 *                  "name": "Доска 2"
 *               }
 *          ] 
 *          )
 * // I->>  Доска 1
 * //          Список задач 1.1
 * //              Задача 1.1.1
 * //               Задача 1.1.2
 * //          Список задач 1.2
 * //              Задача 1.2.1
 * //             Задача 1.2.2
 * //           Список задач 1.3
 * //        Доска 2
 * 
 */
f

/**
 * @param {Object} jsonObj - - принимает JSON объект.
 * 
 */



/** 
 * @param {Array} keys                                      Массив ключей.
 * @param {Array} values                                    Массив значений.
 * @returns {Object}                                        Объект с полями из ключей и методами delete, read, update.
 * @constructor 
 */


let modelBuilder = function (keys,values){
    let res = {};                                           //Создание пустого объекта.
    if(keys && values)                                      //Если не передали массив ключей и значений то создаем пустой объект. 
    {
        if(keys.length !== values.length)                   //Если размеры объектов не эквивалентны, то генерируем исключение.
            throw new Error('Ключи и значения имеют разные размеры');
        for (let i = 0; i < keys.length; i++) {             //Цикл обработки элементов массива.
            res[keys[i]] = values[i];                       //Создается новое поле с названием key[i] и с  значением values[i].
        }
    }


    /**
     * Метод delete, помечает объект для удаления 
     * (свойство removed принимает значение true).
     *  @name modelBuilder#delete
     */
    res.delete = function(){
        this.removed = true;                                //Свойство removed принимает значение true.
    }


    /**
     * Метод update обновляет объект.
     * @name modelBuilder#update
     * @param {Object} updObj                               Предполагается что во входящем объекте updObj содержаться ключ/значения для обновления.
     */
    res.update = function(updObj){
        for (const i in updObj) {                           //Цикл по всем ключам в объекте.
            if(this[i] !== undefined)                       //Если поле существует, то изменить значение
                this[i] = updObj[i];
        }

        
    }


    /**
     * Метод read возвращает выбранный (key) объект JSON таблицы.
     * Если ключа не существует или значение в нём пусто – возвращает null.
     * @name modelBuilder#read
     * @param {String} key 
     */


    res.read = function(key){
        if(this.removed)                                    //Проверка значения элемента. Если он печень как удаленный, то возвращаем undefined. 
            return; 
        if(key)                                             //Если был передан ключ, то функция должна вернуть значение по ключу.
        {
            if(this[key]) 
                return this[key];                           //Возвращает значение свойства с ключом key.
            else return null;                               //Если ключа не существует или значение в нём пусто – возвращает null.
        }                                                   //метод возвращает объект без методов объекта если ключ не передан.

        let tmp = {};                                       //Создаётся пустой оъект.
        let keys = Object.keys(this);
        for (let i = 0; i < keys.length;i++) {              //Перебрать все методы и проя и выделить все поля.
            if(typeof this[keys[i]] !== 'function')         //Если не функйия, то поле со значением копируется в новый объект.
                tmp[keys[i]] = this[keys[i]]; 
        }
        let m = [];
        m[0] = tmp;
        return m;                                           //Возвращаем объект без методов.
    }
    return res;
}

//let o = modelBuilder(["name","children"],['title',[['name'],['title1']]]);  
//let jsonExample  = [{ "name": "Доска 1", "children": [ { "name": "Список задач 1.1", "children": [ { "name": "Задача 1.1.1" }, { "name": "Задача 1.1.2" } ] }, { "name": "Список задач 1.2", "children": [ { "name": "Задача 1.2.1" }, { "name": "Задача 1.2.2" } ] }, { "name": "Список задач 1.3" } ] }, { "name": "Доска 2" } ];  
//a = [{"name":"Доска 1","children":[{"name": "Список задач 1.1"}]},{"name":"Доска 1"}];

let p1 = ["name","children"];
let p2 = ["Доска 1",[{"name": "Список задач 1.1"}]];

parse(modelBuilder(p1,p2).read());

