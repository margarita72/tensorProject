<template id="template-task-list">
    <div class="task-list">
        <div @click="loadTasks" class="task-list-title">{{ gettingTasksList.name }}</div>
        <div class="task-list-body">
            <task
                @updataChildData="updataChildData" 
                v-for="t in gettingTasksList.childs" 
                :getting-tasks="t"
            ></task>
        </div>
        <div @click="addtask" class="task-list-footer">Добавить задачу</div>
    </div>
</template>

<script>
import Task from './Task.vue'
export default {
    name: 'tasklist', 
    data() {
        return {
        }
    },
    components:{
        Task
    },
    props: {
        gettingTasksList: {
            default: {
                name: 'task list',
                description: 'description',
                id: null,
                parent: null,
                childs: []
            },
        }
    },
    template: '#template-task-list',
    methods: {
        init(arrayOfModel) {
            //this.tasks = arrayOfModel;
        },
        loadTasks() {
            //loadChildren(this.id).then(this.init);
        },
        addtask() {
            alert('add task');
        },
        updataChildData(d) {
            alert('eeeee ' + d);
        }
    },
    created() {
        this.loadTasks();
    }
}
</script>

<style scoped>

/*begin component taskList*/
.task-list{
    color: #000;
    display: flex;
    flex-direction: column;
    width: 300px;
    min-width: 300px;
    max-height: 85vh;
    background-color: #28f1ff;
    margin: 5px;
    border-radius: 5px;
	
}
@media screen and (max-width: 1280px){
    .task-list{
        flex: 1;
    }
}
.task-list-title{
    cursor: pointer;
    background-color: #a1a1a1;
    border-radius: 5px;
    width: 100%;
    padding: 15px 0;
    margin-bottom: 10px;
    text-align: center;
}
.task-list-body{
    width: 100%;
    flex: 1;
    overflow-y: auto;
}
.task-list-footer{
    cursor: pointer;
    background-color: #a1a1a1;
    border-radius: 5px;
    width: 100%;
    padding: 15px 0;
    margin-top: 10px;
    text-align: center;
}

</style>