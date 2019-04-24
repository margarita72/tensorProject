<template>
    <div class="task-body">
        <h2 id="desk-title"> {{ title }}</h2>
        <div class="task-list">
            <tasklist 
                v-for="task in allTasks"
                :key="task.id"
                :getting-tasks-list="task"
            ></tasklist>
            <div id="new-task-list" @click="addTaskList()">Добавить список</div>
        </div>
    </div>
</template>


<script>
import tasklist from './Tasklist.vue'
import localServer from '../server'

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
        addTaskList(dat) {
            this.$store.dispatch('openDialog',{
                id: this.$store.state.currendDesk,
                title: 'Добавить доску'
            });
        }
    }, 
    computed: {
        allTasks(){
            return this.$store.state.TaskLists;
        },
        title(){
            //don't work (((
            let desls = this.$store.state.Desks.filter( a => a == this.$store.state.currendDesk);
            console.log(desls);
            return  desls.length ? desls[0].name : '';
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
        width: 100%;
        display: flex;
        overflow-x: auto;
        flex: 1;
    }

    @media screen and (max-width: 820px){
        .task-list{
            overflow-x: unset;
            flex-flow: wrap;
            margin: 10px 0;
            flex: 1;
        }
    }
    #new-task-list{
        cursor: pointer;
        background-color: #9dacb4;
        border-radius: 5px;
        width: 140px;
        height: 50px;    
        margin: 5px;
        padding: 10px 20px;
    }

</style>
