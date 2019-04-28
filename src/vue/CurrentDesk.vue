<template>
    <div class="task-body">
        <h2 id="desk-title"> {{ title }}</h2>
        <div class="task-list">
            <tasklist 
                v-for="task in allTasks"
                :key="task.id"
                :getting-tasks-list="task"
            ></tasklist>
            <div 
                :hidden="title==''" 
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
        }
    },
    components: {
        tasklist
    },
    methods: {
        ...mapActions([
            'openDialog'
        ]),
        addTaskList(dat) {
            this.openDialog({
                id: this.currentDesk,
                title: 'Добавить список задач',
                mutation: 'loadTasksList'
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
            let desks = this.TaskLists.filter( a => a.parent == id);
            return desks;
        },
        title(){
            //it's work )))
            let id = this.currentDesk;
            let desks = this.Desks.filter( a => a.id == id);
            return  desks.length ? desks[0].name : '';
        }
    }   
}
</script>

<style scoped>
    .task-body{
        overflow: hidden;
        display: flex;
        flex-direction: column;
    }
    #desk-title{
        margin: 20px;
        display:inline-block;
        width: 500px;
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

</style>
