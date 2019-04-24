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
            <div>
                <task
                    v-for="t in tasks" 
                    :getting-tasks="t"
                    :key="t.id"
                ></task>
            </div>
        </div>
        <div 
            @click="addtask(gettingTasksList.id)"
            class="task-list-footer" 
            :class="{ hidden: isCollapsed }"
            >
                Добавить задачу
            </div>
    </div>
</template>

<script>
import Task from './Task.vue'
export default {
    name: 'tasklist', 
    data() {
        return {
            isCollapsed: true,
            once: true
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
            if(this.once) {
                this.$store.dispatch('loadTasks', this.gettingTasksList.id);
                this.once = false;
            }
        },
        addtask(id) {
            this.$store.dispatch('openDialog', {
                id:id,
                title: 'Добавить задачу'
            });
        },
        updataChildData(d) {
            sendData(d);
        }
    },
    computed: {
        tasks(){
            let t = this.$store.state.Tasks;
            return t.filter(task => task.parent == this.gettingTasksList.id );
        }
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
    max-height: 90%;
    background-color: #bebebe;
    margin: 5px;
    border-radius: 5px;
	overflow: auto;
}
/* @media screen and (max-width: 1280px) {
    .task-list {
        flex: 1; 
    }
} */
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
    /* max-height: 100%; */
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