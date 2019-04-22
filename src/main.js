import Vue from 'vue'
import tasklist from './vue/Tasklist.vue'
import AddTask from './vue/AddTask.vue'
import DeskNav from './vue/DeskNav.vue'
import store from './store/index'
import localServer from './server'


const currenData = [];

let currenDesk = new Vue( {
    el:'#current-desk',
    data() {
        return {
            allTasks: currenData,
        }
    },
    components: {
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
            if(arrayOfModel.length) {
                let i;
                for ( i = 0; i < currenData.length; i++) {
                    if (currenData[i].id == arrayOfModel[0].parent) {
                        currenData[i].childs = arrayOfModel;
                        break;
                    }
                }
            }
        },
        addNew(dat) {
            alert('new alert ' + dat.id);
        }
  },
})

let tasksNav = new Vue( {
  el: '#desk-nav',
  store,
  render: d => d(DeskNav)
});



let addWindow = new Vue( {
    el:'#task-add-dialog',
    render: r => r(AddTask),
})