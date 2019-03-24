#  (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ Морские котики (─‿‿─)♡
##  Командный состав:
- Маргарита Юртина
- Гагик Погосян
- Алиса Первененок
- Малика Хакимова


### script.js


#### makeList(data) 

Объект передается по рекурсии. Каждый вызов - это переход на следующий уровень вложения JSON. Функция принимает объекты из data в формате JSON и возвращает в строку в формате HTML.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| data | `Object`  | JSON объект. | &nbsp; |




##### Returns


- `string`  HTML список.



#### parse(jsonObj) 

Ищет исключения и в случае их обнаружения, выводит сообщение об ошибке с описанием. Функция parse() обрабатывает данные jsonObj в формате JSON с помощью метода JSON.parse().




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| jsonObj | `Object`  | JSON объект | &nbsp; |




##### Returns


- `String`  Список в формате HTML.



#### loadChildren(dataList, id) 

Mock-функция, эмулирующая работу запроса к серверу. Получает дочерние элементы по идентификатору объекта и передает в callback.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| dataList | `Object`  | Объект (ассоциативный массив), где будут храниться все объекты из списка. | &nbsp; |
| id | `number`  | Номер доски. | &nbsp; |




##### Returns


- `String`  Список в формате HTML.



#### new modelBuilder() 

Класс представляет собой структуру списка со всеми необходимыми полями, а также с методами для динамичной работы с многоуровневым списком.





##### Properties

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |




#### modelBuilder.constructor(keys, values) 

Инициализация основных полей.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| keys | `Array`  | массив ключей | &nbsp; |
| values | `Array`  | массив значений | &nbsp; |




#### modelBuilder.delete() 

Помечает объект для удаления.




#### modelBuilder.update(updObj) 

Метод обновляет объект с помощью метода key.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| updObj | `Object`  | Содержится ключ/значение для обновления | &nbsp; |



#### modelBuilder.read(key) 

Метод возвращает выбранный (key) объект JSON таблицы. Если ключа нет или значение undefined, возвращает null.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| key | `string`  | Ключ по которому будет возвращено значение. | &nbsp; |




##### Returns


- `Object`  Объект modelBuilder без методов.



#### modelBuilder.getChildren(callback) 

Асинхронный метод. Метод вызывает mock-функцию loadChildren.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| callback | `Function`  | Принимает на вход функцию-callback | &nbsp; |




##### Returns


- `String`  Список в формате HTML с задержкой по времени.



#### modelBuilder.changeDone() 

Переключает статус задачи с ожидания на выполненой и обратно.




#### render(modelBuilderObject) 

Формирует вёрстку конкретного элемента и возвращает её в виде строки.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| modelBuilderObject | `Object`  | Объект типа modelBuilder. | &nbsp; |




##### Returns


- `string`  HTML список.



#### handler(arrayOfModel) 

Функция принимает на вход массив объектов типа modelBuilder и выводит их на страницу. Также сохраняет эти объекты в глобальный объект dataList для дальнейшего использования.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| arrayOfModel | `Array`  | Массив объектов типа modelBuilder. | &nbsp; |




##### Returns


- `String`  Сформированный список в формате HTML.



#### openLine(btnjq) 

Обработчик нажатия на строку из списка. Открывает подсписок, если он существует.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| btnjq | `Object`  | Объект типа event. | &nbsp; |




##### Returns


- `String`  Список HTML.



#### closeLine(btnjq) 

Обработчик нажатия для кнопок.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| btnjq | `Object`  | Объект типа event. | &nbsp; |



#### counterFun() 

Простой счетчик, предназначен для подсчета объектов типа modelBuilder.

