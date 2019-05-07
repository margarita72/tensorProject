<template>
    <div class="task-list" @click="menuIsOpen = false" >
        <div 
            
            class="task-list-head" 
            :class="{ opened: isCollapsed }"
        >
            <div @click="loadTasks" class="task-list-title" >
                {{ gettingTasksList.name }}
            </div>
            <div class="task-list-menu" @click.stop="openMenu">
                <img class="task-list-menu-img" src="../Imgs/menu.png" alt="">
                
                <ul class="menu-btms" v-if="menuIsOpen">
                    <li @click.stop="remove">Удалить</li>
                    <li @click.stop="edit">Редактировать</li>
                </ul>
                
            </div>
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
import {mapGetters, mapActions} from 'vuex'
export default {
    name: 'tasklist', 
    data() {
        return {
            isCollapsed: true,
            once: true,
            menuIsOpen: false
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
        ...mapActions({
            loadTask: 'loadTasks',
            openDialog: 'openDialog',
            sendChanges: 'taskListChanges'
        }),
        loadTasks() {
            this.isCollapsed = !this.isCollapsed;
            if(this.once) {
                this.loadTask(this.gettingTasksList.id);
                this.once = false;
            }
        },
        addtask(id) {
            this.openDialog({
                id:id,
                title: 'Добавить задачу',
                mutation: 'loadTasks'
            });
        },
        openMenu(){
            this.menuIsOpen = !this.menuIsOpen;
        },
        remove(){
            this.menuIsOpen = false;
            this.sendChanges({
                id: this.gettingTasksList.id,
                removed: true
            })
        },
        edit(){
            this.menuIsOpen = false;
        }
    },
    computed: {
        ...mapGetters({
            allTasks: 'Tasks'
        }),
        tasks(){
            let t = this.allTasks;
            return t.filter(task => task.parent == this.gettingTasksList.id && !task.removed);
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
.task-list-head {
    background-color: #9dacb4;
    border-radius: 5px;
    width: 100%;
    padding: 15px 0;
    margin-bottom: 10px;
    transition: all ease 0.3s;
    text-align: center;
    display: flex;
    justify-content: flex-end;
}
.task-list-title{
    cursor: pointer;
    margin-left: auto;
    margin-right: auto;
}
.task-list-menu{
    background-color: #c1cbd1;
    height: 30px;
    width: 30px;
    border-radius: 5px;
    margin-right: 2px;
    cursor: pointer;
}
.menu-btms{
    position: absolute;
    background-color: #dae0e6;
    border-radius: 5px;
}
li{
    min-width: 150px;
    display: block;
    text-align: left;
    margin-left: 5px;
    transition: all ease 0.3s;
}
li:hover{
    margin-left: 0;
    border-radius: 5px;
    background-color: #c1cbd1;
}
.task-list-menu:hover{
    background-color: #a0d9f3;
}
.task-list-menu-img{
    width: 20px;
    margin-top: 4px;
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