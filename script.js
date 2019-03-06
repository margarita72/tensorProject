/**
 * Функция экспортирует в область видимости window функцию parse, которая будет на вход принимать объект, представляющий указанную структуру данных, разбирать его и в результате выводить на странице маркированный список названий элементов с учётом иерархии
 * 
 * @param {Data} data - полученный объект с помощью textarea становится массивом, где каждый элемент массива проверяется на исключения.
 * @returns {Data} - Элементы массива.
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

function makeList(data)  //Функция принимает объект и возвращает строку. Объект вызывается с помощью рекурсии. Каждый вызов - это переход на следующий уровень вложения JSON.
{
    if (data === undefined)  //Если объект не определен, то осуществляется выход.
        return '';  //В стоке 14 вызов этой же функции, проверка нужна по причине того, что поле children может отсутствовать.
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

function parse()  //Вызов функции после нажатия на кнопку.
{
    let inp = document.getElementById('inp');  //Получение объекта из textarea и добавление его в переменную inp.
    let objData;
    try {
        objData = JSON.parse(inp.value);  //Берётся текст из поля и создается объект типа JSON.
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
