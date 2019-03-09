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
    res += '</ul>';  //Закрытие списка.
    return res;  //Возвращение списка.
}

/**
 * @param {Object} jsonObj - - принимает JSON объект.
 * 
 */
function parse(jsonObj)
{
    if(jsonObj === undefined)  //Если в функцию ничего не передали генерируется исключение
        throw new Error('Объект не был передан в функцию');
    let objData;
    try {
        if(typeof(jsonObj) === 'object'){ //Если передан строка то нужно преобразовать его в объект
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

function modelBuilder(keys,values){
    if(!keys||!values)
        throw new Error('Функция принимает два обязательных аргумента');
    if(keys.length !== values.length)
        throw new Error('Ключи и значения имеют разные размеры');
    let res = {};
    for (let i = 0; i < keys.length; i++) {
        res[keys[i]] = values[i];
    }

    res.delete = function(){
        this.removed = true;
    }
    res.update = function(updObj){
        if(this[updObj[0]])
            this[updObj[0]] = updObj[1];
        else throw new Error('у объекта нет такого поля: ' + updObj[0]);
    }
    res.read = function(key){
        if(this.removed)
            return;
        if(key) 
        {
            if(this[key])
                return this[key];
            else return null;
        }
        let tmp = {};
        for (const i in this) {
            if(typeof this[i] !== 'function')
                tmp[i] = this[i];
        }
        let m = [];
        m[0] = tmp;
        return m;
    }
    return res;
}

o = modelBuilder(["name","childeren"],['title',[['name'],['title1']]]);
jsonExample  = [{ "name": "Доска 1", "children": [ { "name": "Список задач 1.1", "children": [ { "name": "Задача 1.1.1" }, { "name": "Задача 1.1.2" } ] }, { "name": "Список задач 1.2", "children": [ { "name": "Задача 1.2.1" }, { "name": "Задача 1.2.2" } ] }, { "name": "Список задач 1.3" } ] }, { "name": "Доска 2" } ];