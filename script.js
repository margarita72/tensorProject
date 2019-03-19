/**  
 * @description функция принимает объект и возвращает строку. Объект передается по рекурсии. Каждый вызов - это переход на следующий уровень вложения JSON.
 * @function 
 * @name makeList функция принимает объекты из data и возвращает в строку.
 * @param {Object} data JSON объект.
 */

function makeList(data)
{
    if (data === undefined || data.length === 0)                                            //Если объект не определен, то осуществляется выход.
        return '';
    let res = '';  
    res += '<ul>';                                                                          //Начало маркированного списка.       
    for(let i = 0;i<data.length;i++)                                                        //Каждый объект находится в массиве. Цикл проверяет все элементы массива.
    {   
        res += '<li>';                                                                      //Новая строка в списке.
        if(data[i].name === undefined)                                                      //Если поле name не существует, то вызывается исключение.
            throw  new Error('каждый объект обязательно должен иметь поле "name"'); 
        
        res += data[i].name;                                                                //Запись имени в список.
        res +=  makeList(data[i].children);                                                 //Вызов выполняется с помощью рекурсии. Строка с новым списком добавляется к старой строке.
        res += '</li>';                                                                     //Строка списка закрывается.
    }
    res += '</ul>';                                                                         //Закрытие списка.
    return res;                                                                             //Возвращение списка.
}

/**
 * @description ищет исключения и в случае их обнаружения, выводит сообщения об ошибке с описанием.
 * @function 
 * @name parse обрабатывает данные jsonObj с помощью метода JSON.parse().
 * @param {Object} jsonObj JSON объект.
 * @return {String} список в формате HTML.
 */
function parse(jsonObj)
{
    if(jsonObj === undefined)                                        //Если в функцию ничего не передали генерируется исключение
        throw new Error('Объект не был передан в функцию');
    let objData;
    try {
        if(typeof(jsonObj) === 'object'){                            //Если передан строка то нужно преобразовать его в объект
            objData = jsonObj;
        }else {
            objData = JSON.parse(jsonObj);                           //Берётся текст и создается объект типа JSON.
        }  
    } catch (error) {
        alert('строка не соответствует синтаксису JSON');            //Обработка исключения, выводится сообщение об ошибке.
        return;                                                      //Выход из функции.
    }   
    try {
        document.write(makeList(objData));                           //Вызов функции преобразования. То, что она возвращает(список), выводится на страницу.  
    } catch (e) {
        alert(e.message);                                            //Обработка исключения. Выводится сообщение об ошибке.
        return;                                                      //Выход из функции.
    }
}





/**
 * @description модель данных из задания Feature 2 представлена при помощи классов.
 * @param {Object} dataList объект (ассоциативный массив), где будут храниться все объекты из списка.
 * @function 
 * @name loadChildren mock-функция, эмулирующая работу запроса к серверу. Получает дочерние элементы по идентификатору объекта и передает в колбэк-функцию.
 * @param {number} id номер доски.
 */

dataList = {};
/*Демо-данные для выполнения задачи*/
data = [{"id":1,"name":"Доска 1","hasChildren":true},{"id":2,"parent":1,"name":"Список задач 1.1","hasChildren":true},{"id":3,"parent":2,"name":"Задача 1.1.1"},{"id":4,"parent":2,"name":"Задача 1.1.2"},{"id":5,"parent":1,"name":"Список задач 1.2","hasChildren":true},{"id":6,"parent":5,"name":"Задача 1.2.1"},{"id":7,"parent":5,"name":"Задача 1.2.2"},{"id":8,"parent":1,"name":"Список задач 1.3"},{"id":9,"name":"Доска 2"}];

function loadChildren(id){                                                    
    return new Promise(function(resolve){                                                  //Если id не определён.
        let res = [];                                                                      //Пустой массив.   
        for (let i = 0; i < data.length; i++) {
            if(data[i].parent == id)                                                       //Циклс перебирает элемент data и если находит схожий id, то создаётся objectik и обновляется с добавленным значением.
            {
                let objectik = new modelBuilder();                                         
                objectik.update(data[i]);                                                  
                res.push(objectik);                                                        //Добавить с конца массива objectik.
            }
        }
        resolve(res);
    })
}


/* Класс представляет структуру списка со всеми необходимая полями, а также с методами для динамичной работы со многоуровневым списком. */
class modelBuilder{
    /** 
     * @param {Array} keys Массив ключей.
     * @param {Array} values Массив значений.
     * @constructor 
     */
    constructor(keys,values){                                                         //инициализация основных полей
        this.id = null;
        this.hasChildren = false;
        this.name = '';
        this.parent = null;

        if(keys && values)                                                            //Если не передали массив ключей и значений то создаем пустой объект. 
        {
            if(keys.length !== values.length)                                         //Если размеры объектов не эквивалентны, то генерируем исключение.
                throw new Error('Ключи и значения имеют разные размеры');
            let i = 0
            for (; i < keys.length; i++) {                                            //Цикл обработки элементов массива.
                res[keys[i]] = values[i];                                             //Создается новое поле с названием key[i] и с  значением values[i].
            }
        }
    }    
   
   
   
    /**
     * 
     * @function
     * @name delete помечает объект для удаления.
     */

    delete(){
        this.removed = true;                                                           //Свойство removed принимает значение true.
    }
    /**
     * @function
     * @name update метод обновляет объект.
     * @param {Object} updObj содержаться ключ/значения для обновления.
     */
    update(updObj){
        let keys = Object.keys(updObj);
        let i = 0;
        for (;i<keys.length;i++) {                                                     //Цикл по всем ключам в объекте.
            if(this[keys[i]] !== undefined)                                            //Если поле существует, то изменить значение
                this[keys[i]] = updObj[keys[i]];
        }
    }
    /**
     * @function
     * @name read метод возвращает выбранный (key) объект JSON таблицы. Если ключа не существует или значение в нём пусто – возвращает null.
     * @name modelBuilder#read
     * @param {String} key 
     * @returns {Object} 
     */

    read(key){
        if(this.removed)                                                         //Проверка значения элемента. Если он печень как удаленный, то возвращаем undefined. 
            return; 
        if(key)                                                                  //Если был передан ключ, то функция должна вернуть значение по ключу.
        {
            if(this[key]) 
                return this[key];                                                //Возвращает значение свойства с ключом key.
            else return null;                                                    //Если ключа не существует или значение в нём пусто – возвращает null.
        } 
                                                                                 //метод возвращает объект без методов объекта если ключ не передан.
        let tmp = {};                                                            //Создаётся пустой оъект.
        let keys = Object.keys(this);
        let i = 0;
        for (; i < keys.length;i++) {                                            //Перебрать все методы и проя и выделить все поля.
            if(typeof this[keys[i]] !== 'function')                              //Если не функйия, то поле со значением копируется в новый объект.
                tmp[keys[i]] = this[keys[i]]; 
        }
        let m = [];
        m[0] = tmp;
        return m;                                                                         //Возвращаем объект без методов.
    }

    /**
     * @description Асинхронный метод. Метод вызывает mock-функцию loadChildren
     * @param {Function} callback Принимает на вход функцию-колбэк
     */

    getChildren (callback){
        if(this.hasChildren)                                                              //Если у списка есть дочерний список то открывается.
        {
            let getAsyncChildren = function(_id){ 
                    return new Promise(function(resolve){
                    resolve(_id);
                })
            }
            getAsyncChildren(this.id).then(loadChildren).then(callback);
        }
      }
    }
    /** 
     * формирует вёрстку конкретного элемента и возвращает её в виде строки.
     * @function 
     * @name render выводит html cтраницу со списком
     * @param {Object} modelBuilderObject 
     * @returns {string} HTML список
     */

    function render(modelBuilderObject) {                            
        let deep = 0;                                                                                                                           
        while(modelBuilderObject.parent && deep < 4)
        {
            modelBuilderObject = dataList['btn' + modelBuilderObject.parent];
            deep++;
        }
        let mainTable = 'table-layer';
        switch (deep) {
            case 0: mainTable = 'class="table-layer-0"';   break;
            case 1: mainTable = 'class="table-layer-1"';   break;
            case 2: mainTable = 'class="table-layer-2"';
        }
        let button = '<span class="close-btn" onclick="closeLine()"><a href="#">X</a></span>';
        
        if(deep >= 2)
            button = '';
        let content = button + '<span class="list-open" onclick="openLine(this)" id="btn' + modelBuilderObject.id + '">' + modelBuilderObject.name +'</span>';
        return '<li '+ mainTable + ' id="list'+ modelBuilderObject.id +'">' + content + ' ' + '</li>';
        
        
    }
    function closeLine(){
    }

/**
 * Функция принимает на вход массив объектов типа modelBuilder и выводит их на страницу.
 * Также сохраняет эти объекты в глобальный объект dataList для дальнейшего использования.
 * @param {Array} arrayOfModel Массив объектов типа modelBuilder.
 */

function handler(arrayOfModel)
{
    
    let container = 'main-list';                                     //ИД корневого тега куда выводится список 
                                                                     //Если id равен нулю или не определено, то это корень списка.
    if(arrayOfModel[0].parent)                                       //Если это не корень, то составляем ид строки из списка.
    {
        container = 'list' +  arrayOfModel[0].parent;
    }
    
    let li = document.getElementById(container);                     //Получаем строку списка куда нужно добавить строки.
    let htmlList = '';
    let i = 0;
    for (; i < arrayOfModel.length; i++) {
        htmlList += render(arrayOfModel[i]);                         //Собирается все строки списка.
        dataList['btn'+arrayOfModel[i].id] = arrayOfModel[i];        //Добавляется в список для дальнейшего доступа к объекту.
    }
                 
    li.innerHTML += '<ul>'+htmlList+'</ul>';                         //Выводится список.
}
/**
 * Обработчик нажатия на строку из списка.
 * Открывает подсписок если оно существует.
 * @param {Object} pressedButton 
 */

function openLine(pressedButton){
    if(!dataList[pressedButton.id].opened){                          //Если список уже открыт, ничего не происходит.
        dataList[pressedButton.id].opened = true;                    //Помечаем как открытий.
        dataList[pressedButton.id].getChildren(handler);             //Открываем список.
    }
}

                                                                     //вызов функции для отображения первого уровня
loadChildren(null).then(handler);
