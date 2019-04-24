import Vue from "vue"
import Vuex from "vuex"
import localServer from '../server'

Vue.use(Vuex);

function unicue(baseData){
    let comp = function(a,b){return a.id - b.id;}
    baseData.sort(comp);
    let i, res = [];
    for (i = 0; i < baseData.length - 1; i++) {
        if(baseData[i].id != baseData[i+1].id){
            res = res.concat(baseData[i]);
        }
    }
    res = res.concat(baseData[i]);
    return res;
}

export default new Vuex.Store({
    state:{
        Desks:[],
        TaskLists:[],
        Tasks:[],
        navHidden: false
    },
    actions: {
        loadDesks(context) {
            localServer.loadChildren(null).then(
                function(data) {
                    context.commit('loadDesks', data);
                }
            );
        },
        loadTasksList(context, id) {
            localServer.loadChildren(id).then(
                function(data) {
                    context.commit('loadTasksList', data);
                }
            );
        },
        loadTasks(context, id) {
            localServer.loadChildren(id).then(
                function(data) {
                    context.commit('loadTasks', data);
                }
            );
        },
        taskChanges(context, changes) {
            console.log(changes);
        }
    },
    mutations: {
        loadDesks(state, data) {
            state.Desks = data;
        },
        loadTasksList(state, data) {
            state.TaskLists = data;
        },
        loadTasks(state, data) {
            if(data.length == 0) {
                return;
            }
            state.Tasks = unicue(state.Tasks.concat(data));
        }
    }
});