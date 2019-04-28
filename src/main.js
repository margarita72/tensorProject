import Vue from 'vue'
import AddTask from './vue/AddTask.vue'
import DeskNav from './vue/DeskNav.vue'
import CurrentDesk from './vue/CurrentDesk.vue'
import Header from './vue/Header.vue'
import Trash from './vue/TrashWindow.vue'
import User from './vue/SignIn.vue'
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

let trash = new Vue({
    el: '#trash-dialog',
    store,
    render: r => r(Trash)
})

let user = new Vue({
    el: '#user-dialog',
    store,
    render: r => r(User)
})