<template>
    <div class="task-body">
        <div class="head">
            <h2 
                @dblclick="editStart"
                :class="edit?'hidden':''"
                id="desk-title"
            > {{ title }}</h2>
            <input 
                v-on:blur="edit = false; update($event);"
                :value="title"
                :class="!edit?'hidden':''"
                class="desk-title-edit"
                type="text"
                ref="search"
            >
            <div class="img-back" @click="editDesk" v-if="title!=''">
                <img class="img-share" src="../Imgs/share.png" alt="">
            </div>
        </div>
        <div class="task-list">
            <tasklist 
                v-for="task in allTasks"
                :key="task.id"
                :getting-tasks-list="task"
            ></tasklist>
            <div 
                v-if="title!=''"
                id="new-task-list" 
                @click="addTaskList()"
            >
                Добавить список
            </div>
        </div>
    </div>
</template>


<script>
import tasklist from './Tasklist.vue'
import localServer from '../server'
import {mapGetters, mapActions} from 'vuex'
export default {
    name: "currentDesk",
    data() {
        return {
            edit: false
        }
    },
    components: {
        tasklist
    },
    methods: {
        ...mapActions({
            openDialog: 'openDialog',
            sendChanges: 'desksChanges'
        }),
        addTaskList(dat) {
            this.openDialog({
                id: this.currentDesk,
                title: 'Добавить список задач',
                mutation: 'loadTasksList'
            });
        },
        editStart(){
            this.edit = true;
            setTimeout(function(el){
                el.focus();
            },0,this.$refs.search)
        },
        update(ev){
            if(ev.target.value == ''){
                alert('a-ta-ta');
                this.editStart();
            } else {
                this.sendChanges({
                    id: this.currentDesk,
                    name: ev.target.value
                });
            }
        },
        editDesk(){
            this.openDialog({
                mode: 'edit',
                mutation: 'loadDesks',
                title: 'Доска',
                id: this.currentDesk,
                name: this.title,
                description: this.curData.description,
                comment: this.curData.comment,
                done: this.curData.done,
            });
        }
    }, 
    computed: {
        ...mapGetters([
            'Desks',
            'TaskLists',
            'currentDesk'
        ]),
        allTasks(){
            let id = this.currentDesk;
            let desks = this.TaskLists.filter( a => a.parent == id && !a.removed);
            return desks;
        },
        title(){
            //it's work )))
            let id = this.currentDesk;
            let desks = this.Desks.filter( a => a.id == id);
            return  desks.length ? desks[0].name : '';
        },
        curData(){
            let id = this.currentDesk;
            let desks = this.Desks.filter( a => a.id == id);
            return  desks.length ? desks[0] : '';
        }
    }   
}
</script>

<style scoped>
    .task-body{
        overflow: hidden;
        display: flex;
        flex-direction: column;
        width: 100%;
    }
    #desk-title{
        margin: 20px;
        display: inline-block;
        width: 500px;
        cursor: pointer;
        flex: 1;
    }
    .desk-title-edit{
        margin: 20px;
        font-size: 21pt;
        font-weight: bold;
        font-family: 'Times New Roman', Times, serif;
        border: none;
        background-color: #e9e9e9;
        cursor: text;
        flex: 1;
    }
    .task-list{
        margin: 10px;
        background-color: #e9e9e9;
        /* width: 100%; */
        display: flex;
        overflow-x: auto;
        flex: 1;
    }

    @media screen and (max-width: 820px){
        .task-list{
            /* overflow-x: unset; */
            flex-flow: wrap;
            margin: 10px 0;
            flex: 1;
        }
        #new-task-list{
            text-align: center;
            height: unset!important;
            margin: 5px!important;
            flex: auto;
        }
        .task-body{
            flex: unset;
        }
    }
    #new-task-list{
        cursor: pointer;
        background-color: #9dacb4;
        min-width: 135px;
        height: 50px; 
        margin: 5px 0;
        padding: 10px 20px;
        border-radius: 5px;
    }
    .hidden{
        display: none!important;
    }
    .img-back{
        display: inline-block;
        background-color: #dae0e6;
        width: 30px;
        height: 30px;
        border-radius: 5px;
        margin: 20px 20px 20px auto;
    }
    .img-back:hover{
        background-color: #c1cbd1;
    }
    .img-share{
        width: 20px;
        margin: 5px;
        cursor: pointer;        
    }
    .head{
        display: flex;
    }
</style>
