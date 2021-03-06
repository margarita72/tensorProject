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
            visible: false,
            mode: '',
            mutation: '',
            title: 'Добавление',
            id: null,
            name: '',
            description: '',
            comment: '',
            done: false,
        },
        trash:{
            visible: false,
        },
        user:{
            id: null,
            name: "",
            visible: false,
            error: false
        }
    },
    getters:{
        Desks: state => state.Desks,
        TaskLists: state => state.TaskLists,
        Tasks: state => state.Tasks,
        navHidden: state => state.navHidden,
        currentDesk: state => state.currentDesk,
        /* adding dialog */
        dialogVisible: state => state.dialog.visible,
        dialogTitle: state => state.dialog.title,
        dialogID: state => state.dialog.id,
        addingDialog: state => state.dialog,
        /* user */
        userName: state => state.user.name,
        userVisible: state => state.user.visible,
        userError: state => state.user.error,
        /* trash */
        trashVisible: state => state.trash.visible,
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
        desksChanges(context, changes) {
            localServer.sendData(changes).then(function(data) {
                context.commit('loadDesks', data);
            });
        },
        taskListChanges(context, changes) {
            localServer.sendData(changes).then(function(data) {
                context.commit('loadTasksList', data);
            });
        },
        taskChanges(context, changes) {
            localServer.sendData(changes).then(function(data) {
                context.commit('loadTasks', data);
            });
        },
        openDialog(context,param) {
            context.commit('openDialog', param);
        },
        dialogComplete(context,param) {
            if (param.id) {
                localServer.sendData(param).then(function(data) {
                    context.commit('dialogClose');
                    context.commit(context.state.dialog.mutation, data);
                });
            } else {
                localServer.newRecord(param).then(function(data) {
                    context.commit('dialogClose');
                    context.commit(context.state.dialog.mutation, data);
                });
            }
        },
        signIn(context,userInfo) {
            localServer.logIn(userInfo).then(function(user) {
                context.commit('signInVisible',false);
                context.commit('initUser', user);
                context.dispatch('loadDesks');
            }, function() {
                context.commit('authError');
            });
        }

    },
    mutations: {
        loadDesks(state, data) {
            if(data.length == 0) {
                return;
            }
            state.Desks = unicue(state.Desks.concat(data));
        },
        loadTasksList(state, data) {
            if(data.length == 0) {
                return;
            }
            state.TaskLists = unicue(state.TaskLists.concat(data));
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
            state.dialog.mutation =  param.mutation;
            state.dialog.title =  param.title || "Добавление";
            state.dialog.id = param.id || null;
            state.dialog.name = param.name;
            state.dialog.description = param.description;
            state.dialog.comment = param.comment;
            state.dialog.done = param.done;

            state.dialog.mode = param.mode || 'insert';
        },
        setCurrentDesk(state,id){
            state.currentDesk = id;
        },
        setTrashVisible(state, val){
            state.trash.visible = val;
        },
        signInVisible(state, val){
            state.user.visible = val;
        },
        initUser(state, user){
            state.user.id = user.id;
            state.user.name = user.name;
        },
        authError(state){
            state.user.error = true;
        }
    }
});