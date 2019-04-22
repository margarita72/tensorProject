import Vue from "vue"
import Vuex from "vuex"
import localServer from '../server'

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        Desks:[],
        TaskLists:[
            {id: 4, parent: 1, name: "Список задач 1.1", hasChildren: true},
            {id: 5, parent: 1, name: "Список задач 1.2", hasChildren: true},
            {id: 6, parent: 1, name: "Список задач 1.3"},
            {id: 7, parent: 1, name: "Список задач 1.4"},
            {id: 8, parent: 2, name: "Список задач 2.1"},
        ],
        Tasks:[
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
        ]
    },
    actions:{
        loadDesks(context){
            localServer.loadChildren(null).then(
                function(data){
                    context.commit('loadDesks', data);
                }
            );
        }
    },
    mutations:{
        loadDesks(state, data){
            state.Desks = data;
        },
        loadDesksList(state, data){
            state.TaskLists = data;
        }
    }
});