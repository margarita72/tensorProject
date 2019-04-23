<template>
    <div class="task-list">
        <div 
            @click="loadTasks" 
            class="task-list-title" 
            :class="{ opened: isCollapsed }"
        >
            {{ gettingTasksList.name }}
        </div>
        <div class="task-list-body" :class="{ hidden: isCollapsed }">
            <task
                v-for="t in gettingTasksList.childs" 
                :getting-tasks="t"
                :key="t.id"
            ></task>
        </div>
        <div @click="addtask" class="task-list-footer" :class="{ hidden: isCollapsed }" >Добавить задачу</div>
    </div>
</template>

<script>
import Task from './Task.vue'
export default {
    name: 'tasklist', 
    data() {
        return {
            isCollapsed: true
        }
    },
    components: {
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
    methods: {
        init(arrayOfModel) {
            //this.tasks = arrayOfModel;
        },
        loadTasks() {
            this.isCollapsed = !this.isCollapsed;
        },
        addtask() {
            alert('add task');
        },
        updataChildData(d) {
            sendData(d);
        }
    },
    created() {
        //this.loadTasks();
    }
}
</script>

<style scoped>

.task-list {
    display: block;
    /* flex-direction: column; */
    width: 300px;
    min-width: 300px;
    height: max-content;
    background-color: #bebebe;
    margin: 5px;
    border-radius: 5px;
	
}
@media screen and (max-width: 1280px) {
    .task-list {
        /* flex: 1; */
    }
}
.task-list-title {
    cursor: pointer;
    background-color: #9dacb4;
    border-radius: 5px;
    width: 100%;
    padding: 15px 0;
    margin-bottom: 10px;
    transition: all ease 0.3s;
    text-align: center;
}
.task-list-body {
    width: 100%;
    flex: 1;
    overflow-y: auto;
}
.task-list-footer {
    cursor: pointer;
    background-color: #595959;
    border-radius: 5px;
    width: 100%;
    padding: 15px 0;
    margin-top: 10px;
    text-align: center;
    color: #fff;
}
.hidden{
    display: none;
}
.opened{
    height: 60px;
    margin-bottom: 0;
}
</style>