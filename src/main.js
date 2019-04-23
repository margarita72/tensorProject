import Vue from 'vue'
//import tasklist from './vue/Tasklist.vue'
import AddTask from './vue/AddTask.vue'
import DeskNav from './vue/DeskNav.vue'
import CurrentDesk from './vue/CurrentDesk.vue'
import store from './store/index'
//import localServer from './server'


let currenDesk = new Vue( {
    el:'#current-desk',
    store,
    render: d => d(CurrentDesk)
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