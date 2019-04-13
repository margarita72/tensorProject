"use strict";

/**
 * @file script.ts
 * @version 1.0.0
 * @author Морские котики
 */
/**
 * @description Демо-данные для выполнения задачи
 * @type {Object}
 * @name data
 */
var data = [{ "id": 1, "name": "Доска 1", "hasChildren": true }, { "id": 2, "parent": 1, "name": "Список задач 1.1", "hasChildren": true }, { "id": 3, "parent": 2, "name": "Задача 1.1.1", "done": true, "description": "Programmers never sleep" }, { "id": 4, "parent": 2, "name": "Задача 1.1.2" }, { "id": 5, "parent": 1, "name": "Список задач 1.2", "hasChildren": true }, { "id": 6, "parent": 5, "name": "Задача 1.2.1" }, { "id": 7, "parent": 5, "name": "Задача 1.2.2" }, { "id": 8, "parent": 1, "name": "Список задач 1.3" }, { "id": 9, "parent": 1, "name": "Список задач 1.4" }, { "id": 10, "name": "Доска 2" }, { "id": 11, "parent": 10, "name": "Список задач 2.1" }, { "id": 12, "parent": 11, "name": "Задача 2.1.1" }, { "id": 13, "name": "Доска 3" }];
/**
 * @description Mock-функция, эмулирующая работу запроса к серверу. Получает дочерние элементы по идентификатору объекта и передает в callback.
 * @param {Object} dataList Объект (ассоциативный массив), где будут храниться все объекты из списка.
 * @param {number} id Номер доски.
 * @name loadChildren
 * @function
 * @returns {String} Список в формате HTML.
 */
function loadChildren(id) {
    return new Promise(function (resolve) {
        var res = []; //Пустой массив.   
        for (var i = 0; i < data.length; i++) {
            if (data[i].parent == id) //Цикл перебирает элемент data и если находит схожий id, то создаётся objectik и обновляется с добавленным значением.
                {
                    res.push(data[i]);
                }
        }
        resolve(res);
    });
}
$("#info").click(function () {
    $(".information").toggle();
});
$('#desks').bind('click', function () {
    $("#desk-nav").toggle();
});
/*components */
Vue.component('task', {
    data: function data() {
        return {
            name: this.gettingTasks.name,
            description: this.gettingTasks.description,
            done: this.gettingTasks.done,
            removed: this.gettingTasks.removed,
            edit: this.gettingTasks.edit,
            id: this.gettingTasks.id,
            parent: this.gettingTasks.parent
        };
    },
    props: {
        gettingTasks: {
            default: {
                name: 'task',
                description: 'description',
                done: false,
                edit: false,
                removed: false,
                id: null,
                parent: null
            }
        }
    },
    template: '#template-task',
    methods: {
        remove: function remove() {
            this.removed = true;
        },
        activeEdit: function activeEdit() {
            this.edit = !this.edit;
        }
    },
    computed: {
        borderStyle: function borderStyle() {
            if (this.removed) return '2px solid red';
            if (this.done) return '2px solid green';
            return 'none';
        }
    }
});
Vue.component('tasklist', {
    data: function data() {
        return {
            description: this.gettingTasksList.description,
            name: this.gettingTasksList.name,
            id: this.gettingTasksList.id,
            parent: this.gettingTasksList.parent,
            tasks: []
        };
    },

    props: {
        gettingTasksList: {
            default: {
                name: 'task list',
                description: 'description',
                id: null,
                parent: null
            }
        }
    },
    template: '#template-task-list',
    methods: {
        init: function init(arrayOfModel) {
            this.tasks = arrayOfModel;
        },
        loadTasks: function loadTasks() {
            loadChildren(this.id).then(this.init);
        }
    }
});
var currenDesk = new Vue({
    el: '#main-list',
    data: function data() {
        return {
            allTasks: []
        };
    },

    methods: {
        init: function init(arrayOfModel) {
            var i = void 0;
            this.allTasks = [];
            for (i = 0; i < arrayOfModel.length; i++) {
                var a = arrayOfModel[i];
                this.allTasks.push(a);
            }
        },
        loadTaskList: function loadTaskList() {
            var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            loadChildren(id).then(this.init);
        }
    }
});
var tasksNav = new Vue({
    el: '#nav-desks',
    data: function data() {
        return {
            desks: []
        };
    },

    methods: {
        init: function init(arrayOfModel) {
            var i = void 0;
            this.desks = [];
            for (i = 0; i < arrayOfModel.length; i++) {
                var a = arrayOfModel[i];
                this.desks.push(a);
            }
        },
        openDesks: function openDesks(id) {
            loadChildren(id).then(currenDesk.init);
        },
        load: function load() {
            loadChildren(null).then(this.init);
        }
    }
});
tasksNav.load();