/**
 * @file script.js
 * @version 1.0.0
 * @author Морские котики
 */

/**  
 * @description Объект передается по рекурсии. Каждый вызов - это переход на следующий уровень вложения JSON. Функция принимает объекты из data в формате JSON и возвращает в строку в формате HTML.
 * @param {Object} data JSON объект.
 * @name makeList
 * @function
 * @returns {string} HTML список.
 */
function makeList(data)
{
    if (data === undefined || data.length === 0)  //Если объект не определен, то осуществляется выход.
        return '';
    let res = '';  
    res += '<ul>';  //Начало маркированного списка.       
    for(let i = 0;i<data.length;i++)  //Каждый объект находится в массиве. Цикл проверяет все элементы массива.
    {   
        res += '<li>';  //Новая строка в списке.
        if(data[i].name === undefined)  //Если поле name не существует, то вызывается исключение.
            throw  new Error('каждый объект обязательно должен иметь поле "name"'); 
        
        res += data[i].name;  //Запись имени в список.
        res +=  makeList(data[i].children);  //Вызов выполняется с помощью рекурсии. Строка с новым списком добавляется к старой строке.
        res += '</li>';  //Строка списка закрывается.
    }
    res += '</ul>';  //Закрытие маркированного списка.
    return res;  //Возвращение списка.
}

/**
 * @description Ищет исключения и в случае их обнаружения, выводит сообщение об ошибке с описанием. Функция parse() обрабатывает данные jsonObj в формате JSON с помощью метода JSON.parse().
 * @param {Object} jsonObj JSON объект
 * @name parse
 * @function
 * @returns {String} Список в формате HTML.
 */
function parse(jsonObj)
{
    if(jsonObj === undefined)  //Если в функцию ничего не передали, генерируется исключение.
        throw new Error('Объект не был передан в функцию');
    let objData;
    try {
        if(typeof(jsonObj) === 'object'){  //Если передана строка, то происходит преобразование её в объект.
            objData = jsonObj;
        }else {
            objData = JSON.parse(jsonObj);  //Берётся текст и создается объект типа JSON.
        }  
    } catch (error) {
        alert('строка не соответствует синтаксису JSON');  //Обработка исключения, выводится сообщение об ошибке.
        return;  //Выход из функции.
    }   
    try {
        document.write(makeList(objData));  //Вызов функции преобразования. То, что она возвращает(список), выводится на страницу.  
    } catch (e) {
        alert(e.message);  //Обработка исключения. Выводится сообщение об ошибке.
        return;  //Выход из функции.
    }
}
/**
 * @description Объект (ассоциативный массив) где будет хранятся все объект из списка.
 * @name dataList
 * @type {Object}
 */
dataList = {};
/** 
 * @description Демо-данные для выполнения задачи
 * @type {Object}
 * @name data
 */
data = [{"id":1,"name":"Доска 1","hasChildren":true},{"id":2,"parent":1,"name":"Список задач 1.1","hasChildren":true},{"id":3,"parent":2,"name":"Задача 1.1.1","done":true,"description":"Programmers never sleep"},{"id":4,"parent":2,"name":"Задача 1.1.2"},{"id":5,"parent":1,"name":"Список задач 1.2","hasChildren":true},{"id":6,"parent":5,"name":"Задача 1.2.1"},{"id":7,"parent":5,"name":"Задача 1.2.2"},{"id":8,"parent":1,"name":"Список задач 1.3"},{"id":9,"name":"Доска 2"}];

/**
 * @description Mock-функция, эмулирующая работу запроса к серверу. Получает дочерние элементы по идентификатору объекта и передает в callback.
 * @param {Object} dataList Объект (ассоциативный массив), где будут храниться все объекты из списка.
 * @param {number} id Номер доски.
 * @name loadChildren
 * @function
 * @returns {String} Список в формате HTML.
 */
function loadChildren(id){                                                    
    return new Promise(function(resolve){  //Если id не определён.
        let res = [];  //Пустой массив.   
        for (let i = 0; i < data.length; i++) {
            if(data[i].parent == id)  //Цикл перебирает элемент data и если находит схожий id, то создаётся objectik и обновляется с добавленным значением.
            {
                let objectik = new modelBuilder();                                         
                objectik.update(data[i]);                                                  
                res.push(objectik);  //Добавить с конца массива objectik.
            }
        }
        resolve(res);
    })
}


/** 
 * @description Класс представляет собой структуру списка со всеми необходимыми полями, а также с методами для динамичной работы с многоуровневым списком. 
 * @class
 * @name modelBuilder
 * @property {number} id Идентификатор пользователя.
 * @property {boolean} hasChildren Указывает на присутствие у объекта дочернего элемента.
 * @property {string} name Текст который будет отображено на странице.
 * @property {number} parent Идентификатор родителя.
 * @property {boolean} removed Указывает на пометку для удаления.
 */
class modelBuilder{
    /** 
     * @description Инициализация основных полей.
     * @constructor
     * @param {Array} keys массив ключей
     * @param {Array} values массив значений
     */
    constructor(keys,values){
        this._id = null;
        this._hasChildren = false;
        this._name = '';
        this._parent = null;
        this._removed = false;
        this._done = false;
        this._description = '';

        if(keys && values)  //Если массив ключей и значений не был передан, то создаем пустой объект. 
        {
            if(keys.length !== values.length)  //Если размеры объектов не эквивалентны, то генерируем исключение.
                throw new Error('Ключи и значения имеют разные размеры');
            let i = 0
            for (; i < keys.length; i++) {  //Цикл обработки элементов массива.
                res[keys[i]] = values[i];  //Создается новое поле с названием key[i] и с значением values[i].
            }
        }
    }    
   
    /**
     * @description Помечает объект для удаления.
     * @method
     * @memberof modelBuilder
     * @function
     * @name delete
     */
    delete(){
        this._removed = true;  //Свойство removed принимает значение true.
    }

    /**
     * @description Метод обновляет объект с помощью метода key.
     * @function
     * @memberof modelBuilder
     * @method
     * @name update
     * @param {Object} updObj Содержится ключ/значение для обновления
     */
    update(updObj){
        let keys = Object.keys(updObj);
        let i = 0;
        for (;i<keys.length;i++) {  //Цикл по всем ключам в объекте.
            if(this[keys[i]] !== undefined)  //Если поле существует, то изменить значение.
                this[keys[i]] = updObj[keys[i]];
        }
    }

    /**
     * @description Метод возвращает выбранный (key) объект JSON таблицы. Если ключа нет или значение undefined, возвращает null.
     * @function
     * @memberof modelBuilder
     * @method
     * @name read 
     * @param {string} key Ключ по которому будет возвращено значение.
     * @returns {Object} Объект modelBuilder без методов.
     */
    read(key){
        if(this.removed)  //Проверка значения элемента. Если он помечен как удаленный, то возвращаем undefined. 
            return; 
        if(key)  //Если был передан ключ, то функция должна вернуть значение по ключу.
        {
            if(this[key]) 
                return this[key];  //Возвращает значение свойства с ключом key.
            else return null;  //Если ключа нет или значение undefined, возвращает null.
        } 
        /*Метод возвращает объект без методов объекта, если ключ не передан.*/
        let tmp = {};  //Создаётся пустой оъект.
        let keys = Object.keys(this);
        let i = 0;
        for (; i < keys.length;i++) {  //Перебираются и выделяются все поля.
            if(typeof this[keys[i]] !== 'function')  //Если значения с функцией различны, то поле с другим значением копируется в новый объект.
                tmp[keys[i]] = this[keys[i]]; 
        }
        let m = [];
        m[0] = tmp;
        return m;  //Возвращается объект без методов.
    }

    /**
     * @description Асинхронный метод. Метод вызывает mock-функцию loadChildren.
     * @memberof modelBuilder
     * @method
     * @param {Function} callback Принимает на вход функцию-callback
     * @function
     * @name getChildren
     * @returns {String} Список в формате HTML с задержкой по времени.
     */
    getChildren (callback){
        if(this._hasChildren)  //Если у списка есть дочерний список то открывается.
        {
            let getAsyncChildren = function(_id){ 
                    return new Promise(function(resolve){
                    resolve(_id);
                })
            }
            getAsyncChildren(this.id).then(loadChildren).then(callback);
        }
    }
    changeDone(){
        this.done = !this.done;
    }
    get id(){
        return this._id;
    }
    set id(val){
        this._id = val;
    }
    get hasChildren(){
        return this._hasChildren;
    }
    set hasChildren(val){
        this._hasChildren = val;
    }
    get name(){
        return this._name;
    }
    set name(val){
        this._name = val;
    }
    get parent(){
        return this._parent;
    }
    set parent(val){
        this._parent = val;
    }
    get removed(){
        return this._removed;
    }
    set removed(val){
        this._removed = val;
    }
    get done(){
        return this._done;
    }
    set done(val){
        this._done = val;
    }
    get description(){
        return this._description;
    }
    set description(val){
        this._description = val;
    }
}

/** 
 * @description Формирует вёрстку конкретного элемента и возвращает её в виде строки.
 * @param {Object} modelBuilderObject Объект типа modelBuilder.
 * @name render
 * @function
 * @returns {string} HTML список.
 */
function render(modelBuilderObject) {
    let deep = 0;  //В переменную будет записан уровень вложенности строки списка.
    let tmpObject = modelBuilderObject;  
    while(tmpObject.parent && deep < 4)  //Цикл поднимается по родителям, пока не дойдет до корня или глубина не станет равна 4 (значение больше 4 нас не интересует).
    {
        tmpObject = dataList['btn' + tmpObject.parent];  //Берем родителя по ИД и становимся на его место.
        deep++;  //Увеличиваем глубину.
    }
    modelBuilderObject.layer = deep;
    /*Присваивается имя, класс, исходя от глубины.*/
    let mainTable = 'class="table-layer"'; 
    switch (deep) {
        case 0: mainTable = 'class="table-layer-0"';   break;
        case 1: mainTable = 'class="table-layer-1"';   break;
        case 2: mainTable = 'class="table-layer-2"';
    }
    let content = `<span class="list-open" id="btn${modelBuilderObject.id}">${modelBuilderObject.name}</span>`;
    return `<li ${mainTable} id="list${modelBuilderObject.id}">${content}</li>`;
}

/**
 * @description Функция принимает на вход массив объектов типа modelBuilder и выводит их на страницу. Также сохраняет эти объекты в глобальный объект dataList для дальнейшего использования.
 * @param {Array} arrayOfModel Массив объектов типа modelBuilder.
 * @name handler
 * @function
 * @returns {String} Сформированный список в формате HTML.
 */
function handler(arrayOfModel)
{    
    let container = 'main-list';  //ИД корневого тега куда выводится список 
    /*Если id равен нулю или не определено, то это корень списка.*/
    if(arrayOfModel[0].parent)  //Если это не корень, то составляем ид строки из списка.
    {
        container = 'list' +  arrayOfModel[0].parent;
    }
    
    let li = document.getElementById(container);  //Получаем строку списка, куда нужно добавить строки.
    let htmlList = '';
    let i = 0;
    for (; i < arrayOfModel.length; i++) {
        htmlList += render(arrayOfModel[i]);  //Собираются все строки списка.
        dataList['btn'+arrayOfModel[i].id] = arrayOfModel[i];  //Объект добавляется в список для дальнейшего доступа к объекту.
    }                 
    li.innerHTML += '<ul>'+htmlList+'</ul>';  //Выводится список.
}

/**
 * @description Обработчик нажатия на строку из списка. Открывает подсписок, если он существует.
 * @param {Object} btnjq Объект типа event.
 * @name openLine
 * @function
 * @returns {String} Список HTML.
 */
function openLine(btnjq){
    let pressedButton = btnjq.currentTarget;
    let currentObj = dataList[pressedButton.id];
    if(currentObj.hasChildren){
        if(!currentObj.opened){  //Если список уже открыт, ничего не происходит.
            currentObj.opened = true;  //Помечаем как открытий.
            currentObj.getChildren(handler);  //Открываем список.
            let button = `<span class="close-btn" id="close-btn${currentObj.id}">X</span>`;
            if(pressedButton.parentElement.className === 'table-layer-0'){
                $('.table-layer-0').hide();
                $('#'+pressedButton.parentElement.id).attr('class', 'table-layer-00');
                $('#'+pressedButton.parentElement.id).show();
            }
            pressedButton.parentElement.innerHTML += button;
        }
    }else {
        if(currentObj.layer === 2){
            let a = $('#list'+currentObj.id);
            if(!dataList['btn'+currentObj.id].opened){
                dataList['btn'+currentObj.id].opened = true;
                a.append(`<img src="Imgs/remove.png" class="del-btn" id="del-btn${currentObj.id}" >`);
                a.append(`<input type="checkbox" id="check${currentObj.id}" class="check">`);
                a.append(`<textarea class="description" id="description${currentObj.id}" ></textarea>`);
               
                $('#check' + currentObj.id)[0].checked = dataList['btn'+currentObj.id].done;
                $('#description' + currentObj.id)[0].value = dataList['btn'+currentObj.id].description;
                
                $('#del-btn' + currentObj.id ).bind('click', function (e) {
                    dataList['btn'+currentObj.id].delete();
                    $('#list'+currentObj.id).css('border', '2px outset red');
                });

                $('#check' + currentObj.id).bind('click', function (e) {
                    if(!dataList['btn'+currentObj.id].removed){
                        dataList['btn'+currentObj.id].changeDone();
                        if (dataList['btn'+currentObj.id].done){
                            $('#list'+currentObj.id).css('border', '2px outset #0f0');
                        }else {
                            $('#list'+currentObj.id).css('border', 'none');
                        }
                    }
                });
                
                $('#description' + currentObj.id).change(function (e) {
                    dataList['btn'+currentObj.id].description = $('#description' + currentObj.id)[0].value;
                });
                
            }else {
                dataList['btn'+currentObj.id].opened = false;
                a[0].children[1].remove();
                a[0].children[1].remove();
                a[0].children[1].remove();
            }            
        }
    }
}

$(document).on('click','.close-btn', closeLine);
$(document).on('click','.list-open', openLine);


/**
 * @description Обработчик нажатия для кнопок.
 * @name closeLine
 * @param {Object} btnjq Объект типа event.
 * @function
 */
function closeLine(btnjq){
    let btn = btnjq.currentTarget;
    let id = $('#'+btn.id).prev()[0].id;
    if(btn.parentElement.className === 'table-layer-00'){
        $('#'+ btn.parentElement.id).attr('class', 'table-layer-0');
        $('.table-layer-0').show();
    }
    dataList[id].opened = false;
    /**TODO: Не удалять, а скрывать объекты для оптимизации, чтоб не скачивать данные из сервера повторно и создавать объект заново.*/
    $('#'+btn.id).next().remove();
    btn.remove();
}

/*Вызов функции для отображения первого уровня.*/
loadChildren(null).then(handler);
