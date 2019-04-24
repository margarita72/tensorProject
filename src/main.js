import Vue from 'vue'
//import tasklist from './vue/Tasklist.vue'
import AddTask from './vue/AddTask.vue'
import DeskNav from './vue/DeskNav.vue'
import CurrentDesk from './vue/CurrentDesk.vue'
import Header from './vue/Header.vue'
import store from './store/index'


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
    el: '#task-add-dialog',
    store,
    render: r => r(AddTask)
})

let header = new Vue({
    el: 'header',
    store,
    render: r => r(Header)
})