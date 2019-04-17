/**
 * @file script.ts
 * @version 1.0.0
 * @author Морские котики
 */

 interface dataMode {
    id: number,
    name?: string,
    parent?: number,
    hasChildren?: boolean,
    done?: boolean,
    description?: string,
    removed?: boolean,
    childs?: dataMode[]
 }

/** 
 * @description Демо-данные для выполнения задачи
 * @type {Object}
 * @name data
 */
let data: dataMode[] = [
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

const currenData: dataMode[] = [];

/**
 * @description Mock-функция, эмулирующая работу запроса к серверу. Получает дочерние элементы по идентификатору объекта и передает в callback.
 * @param {number} id Номер доски.
 * @name loadChildren
 * @function
 * @returns {Promise<dataMode[]>}
 */
function loadChildren(id: number): Promise<dataMode[]>{
    return new Promise<dataMode[]>(function(resolve){
        let res: dataMode[] = [],  //Пустой массив.   
            i: number = 0;
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
function sendData(obj: dataMode): Promise<void> {
    return new Promise<void>(function(resolve,reject) {
        let i:number = 0;
        for (i = 0; i < data.length; i++) {
            if (data[i].id == obj.id){ 
                let keys: string[] = Object.keys(obj),
                    j: number;
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

$("#info").click(function(): void{
    $(".information").toggle();
});
$('#desks').bind('click', function(): void {
    $("#desk-nav").toggle();
});

/*components */
Vue.component('task', {
    data: function () {
      return {
      }
    },
    props: {
        gettingTasks: {
            default: {
                name: 'task',
                description: 'description',
                done: false,
                removed: false,
                id: null,
                parent: null
            },
        }
    },
    template: '#template-task',
    methods: {
        remove(): void {
            this.gettingTasks.removed = true;
        },
        activeEdit(stat:boolean): void {
            this.edit = stat;
        },
        descriptionSave() {
            console.log('description Save');
        },
        changeDone() {
            this.$emit('updataChildData',{id:this.id,'done': this.gettingTasks.done});
        }
    },
    computed: {
        borderStyle(): string {
            if (this.gettingTasks.removed) 
                return '2px solid red';
            if (this.gettingTasks.done)
                return '2px solid green';
            return 'none';
        },
    }
})

Vue.component('tasklist', {
    data() {
        return {
        }
    },
    props: {
        gettingTasksList: {
            default: {
                name: 'task list',
                description: 'description',
                id: null,
                parent: null,
                childs: []
            },
        }
    },
    template: '#template-task-list',
    methods: {
        init(arrayOfModel:dataMode[]): void {
            //this.tasks = arrayOfModel;
        },
        loadTasks(): void {
            //loadChildren(this.id).then(this.init);
        },
        addtask(): void {
            alert('add task');
        },
        updataChildData(d) {
            alert(d);
        }
    },
    created() {
        this.loadTasks();
    }
})
  
let currenDesk = new Vue( {
    el:'#current-desk',
    data() {
        return {
            allTasks: currenData,
        }
    },
    methods: {
        loadTaskList(arrayOfModel:dataMode[]) {
            let i:number;
            while (currenData.length > 0) {
                currenData.pop();
            }
            for (i = 0; i < arrayOfModel.length; i++) {
                let a = arrayOfModel[i];
                a.childs = [];
                currenData.push(a);
                loadChildren(a.id).then(this.loadTask); 
            }
        },
        loadTask(arrayOfModel:dataMode[]) {
            if(arrayOfModel.length)
            {
                let i: number;
                for ( i = 0; i < currenData.length; i++) {
                    if (currenData[i].id == arrayOfModel[0].parent) {
                        currenData[i].childs = arrayOfModel;
                        break;
                    }
                }
            }
        }
    },
})

let tasksNav = new Vue( {
    el: '#nav-desks',
    data() {
       return { 
           desks: []
       }
    },
    methods: {
        init(arrayOfModel: dataMode[]) {
            this.desks = arrayOfModel;
        },
        openDesks(id: number) {
            loadChildren(id).then(currenDesk.loadTaskList);
        },
        load() {
            loadChildren(null).then(this.init);
        }
    }
 });

 tasksNav.load();