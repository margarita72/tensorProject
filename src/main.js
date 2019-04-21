import Vue from 'vue'
import tasklist from './Tasklist.vue'

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

const currenData = [];

/**
 * @description Mock-функция, эмулирующая работу запроса к серверу. Получает дочерние элементы по идентификатору объекта и передает в callback.
 * @param {number} id Номер доски.
 * @name loadChildren
 * @function
 * @returns {Promise<dataMode[]>}
 */
function loadChildren(id){
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
function sendData(obj) {
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

let currenDesk = new Vue( {
  el:'#current-desk',
  data() {
      return {
          allTasks: currenData,
      }
  },
  components:{
      tasklist
    },
  methods: {
      loadTaskList(arrayOfModel) {
          let i;
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
      loadTask(arrayOfModel) {
          if(arrayOfModel.length)
          {
              let i;
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
         desks: [
            {id: 1, name: "Доска 1", hasChildren:true},
            {id: 2, name: "Доска 2"},
            {id: 3, name: "Доска 3"},
         ]
     }
  },
  methods: {
      init(arrayOfModel) {
          this.desks = arrayOfModel;
      },
      openDesks(id) {
          loadChildren(id).then(currenDesk.loadTaskList);
      },
      load() {
          loadChildren(null).then(this.init);
      }
  }
});

tasksNav.load();
