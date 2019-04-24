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
        navHidden: false,
        currentDesk: null,
        dialog:{
            visible: true,
            id: null,
            title: 'Добавление'
        }
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
            context.commit('setCurrentDesk',id);
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
            localServer.sendData(changes).then(function(data) {
                console.log(data);
                context.commit('loadTasks', data);
            });
        },
        openDialog(context,param){
            context.commit('openDialog', param);
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
        },
        navCollapse(state){
            state.navHidden = !state.navHidden;
        },
        dialogClose(state){
            state.dialog.visible = false;
        },
        openDialog(state,param){
            state.dialog.visible = true;
            state.dialog.id = param.id || null;
            state.dialog.title =  param.title || "Добавление";
        },
        setCurrentDesk(state,id){
            state.currentDesk = id;
        }
    }
});