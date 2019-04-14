/**
 * @file script.ts
 * @version 1.0.0
 * @author Морские котики
 */

 interface dataMode{
    id:number,
    name:string,
    parent?:number,
    hasChildren?:boolean,
    done?:boolean,
    description?:string,
    removed?:boolean
 }

/** 
 * @description Демо-данные для выполнения задачи
 * @type {Object}
 * @name data
 */
let data:dataMode[] = [
    {id:1,name:"Доска 1",hasChildren:true},
    {id:2,name:"Доска 2"},
    {id:3,name:"Доска 3"},
    {id:4,parent:1,name:"Список задач 1.1",hasChildren:true},
    {id:5,parent:1,name:"Список задач 1.2",hasChildren:true},
    {id:6,parent:1,name:"Список задач 1.3"},
    {id:7,parent:1,name:"Список задач 1.4"},
    {id:8,parent:2,name:"Список задач 2.1"},
    {id:9,parent:4,name:"Задача 1.1.1",done:true,description:"Programmers never sleep"},
    {id:10,parent:4,name:"Задача 1.1.2"},
    {id:11,parent:5,name:"Задача 1.2.1"},
    {id:11,parent:5,name:"Задача 1.2.2"},
    {id:12,parent:8,name:"Задача 2.1.1"},
];

/**
 * @description Mock-функция, эмулирующая работу запроса к серверу. Получает дочерние элементы по идентификатору объекта и передает в callback.
 * @param {Object} dataList Объект (ассоциативный массив), где будут храниться все объекты из списка.
 * @param {number} id Номер доски.
 * @name loadChildren
 * @function
 * @returns {Promise<dataMode[]>}
 */
function loadChildren(id:number):Promise<dataMode[]>{
    return new Promise<dataMode[]>(function(resolve){
        let res:dataMode[] = [];  //Пустой массив.   
        for (let i = 0; i < data.length; i++) {
            if(data[i].parent == id){  //Цикл перебирает элемент data и если находит схожий id, то создаётся objectik и обновляется с добавленным значением.
                res.push(data[i]);
            }
        }
        resolve(res);
    })
}

$("#info").click(function(): void{
    $(".information").toggle();
});
$('#desks').bind('click', function (): void {
    $("#desk-nav").toggle();
});

/*components */
Vue.component('task', {
    data: function () {
      return {
        name: this.gettingTasks.name,
        description: this.gettingTasks.description,
        done: this.gettingTasks.done,
        removed: this.gettingTasks.removed,
        edit: this.gettingTasks.edit,
        id: this.gettingTasks.id,
        parent: this.gettingTasks.parent,
      }
    },
    props:{
        gettingTasks: {
            default: {
                name: 'task',
                description: 'description',
                done: false,
                edit: false,
                removed: false,
                id: null,
                parent: null
            },
        }
    },
    template: '#template-task',
    methods: {
        remove():void{
            this.removed = true;
        },
        activeEdit():void{
            this.edit = ! this.edit;
        }
    },
    computed: {
        borderStyle():string{
            if(this.removed) 
                return '2px solid red';
            if(this.done)
                return '2px solid green';
            return 'none';
        }
    },
})

Vue.component('tasklist',{
    data() {
        return {
            description: this.gettingTasksList.description,
            name: this.gettingTasksList.name,
            id: this.gettingTasksList.id,
            parent: this.gettingTasksList.parent,
            tasks: [],
        }
    },
    props:{
        gettingTasksList: {
            default: {
                name: 'task list',
                description: 'description',
                id: null,
                parent: null,
            },
        }
    },
    template:'#template-task-list',
    methods: {
        init(arrayOfModel:dataMode[]):void{
            this.tasks = arrayOfModel;
        },
        loadTasks():void{
            loadChildren(this.id).then(this.init);
        },
        addtask():void{
            alert('add task');
        }
    },
})
  
let currenDesk = new Vue({
    el:'#main-list',
    data() {
        return {
            allTasks: [],
        }
    },
    methods: {
        init(arrayOfModel:dataMode[]){
            let i:number;
            this.allTasks = [];
            for(i = 0; i < arrayOfModel.length; i++){
                let a = arrayOfModel[i];
                this.allTasks.push(a)
            }
        },
        loadTaskList(id:number = null){
            loadChildren(id).then(this.init);
        }
    },
})

let tasksNav = new Vue({
    el: '#nav-desks',
    data(){
       return{ 
           desks: []
       }
    },
    methods:{
        init(arrayOfModel:dataMode[]){
            let i:number;
            this.desks = [];
            for(i = 0; i < arrayOfModel.length; i++){
                let a = arrayOfModel[i];
                this.desks.push(a)
            }
        },
        openDesks(id:number){
            loadChildren(id).then(currenDesk.init);
        },
        load(){
            loadChildren(null).then(this.init);
        }
    }
 });

 tasksNav.load();