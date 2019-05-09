<template>
    <div class="table-layer-2" :style="{border: borderStyle}">
        <div class="table-layer-2-head" @click="collapse">
            <span class="list-open"> {{ gettingTasks.name }} </span>
            <input
                :disabled="gettingTasks.removed"
                type="checkbox"
                v-model="gettingTasks.done"
                @click.stop="changeDone"
                class="check"
            >
            <div class="img-back">
                <img src="../Imgs/remove.png" class="del-btn" @click.stop="remove">
            </div>
        </div>
        <textarea 
            :disabled="gettingTasks.removed"
            v-model="gettingTasks.description" 
            class="description" 
            v-on:blur="descriptionSave"
            :class="{ hidden: isCollapsed }"
            placeholder="Введите описание"
        ></textarea>
    </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    data: function () {
      return {
            isCollapsed: true,
            once: true
      }
    },
    name: 'task',
    props: {
        gettingTasks: {
            default: {
                name: 'task',
                description: 'description',
                done: false,
                removed: false,
                id: null,
                parent: null
            },
        }
    },
    methods: {
        ...mapActions(['taskChanges']),
        remove() {
            if(this.gettingTasks.removed){
                return;
            }
            this.taskChanges({
                id: this.gettingTasks.id,
                removed: true
            });
        },
        activeEdit(stat) {
            this.edit = stat;
        },
        descriptionSave(val) {
            if(this.gettingTasks.description !== undefined){
                this.taskChanges({
                    id: this.gettingTasks.id,
                    description: this.gettingTasks.description
                });
            }
        },
        changeDone() {
            this.taskChanges({
                id: this.gettingTasks.id,
                done: !this.gettingTasks.done
            });
        },
        collapse(){
            this.isCollapsed = ! this.isCollapsed;
        }
    },
    computed: {
        borderStyle() {
            if (this.gettingTasks.removed) {
                return '2px solid red';
            }
            if (this.gettingTasks.done) {
                return '2px solid green';
            }
            return 'none';
        },
    }
}
</script>

<style scoped>
    .table-layer-2 {
        display: block;
        margin: 5px 10px 0;
        padding: 10px 20px;
        transition: 0.5s;
        background-color: #f3f3f3;
        border-radius: 6px;
        text-align: left;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', 'Geneva', 'Verdana', 'sans-serif';
    }
    .table-layer-2-head {
        display: flex;
    }
    .description {
        border: 1px solid #630f5f;
        resize: none;
        margin-top: 10px;
        height: 4em;
        width: 100%;
        font-size: 12pt;
        color: #545454;
        background-color: transparent;
        border: none;
        cursor: pointer;
    }
    .description:focus {
        color: #000;
        background-color: #fff;
        cursor: unset;
    }
    .check {
        width: 16px;
        height: 16px;
        transform: scale(1.5);
        margin: 6px;
        margin-left: auto; 
    }
    .del-btn {
        width: 16px;
        height: 16px;
        margin: 5px;
    }
    .del-btn:hover {
        background-color: #b9d8c2;
    }
    .hidden{
        display: none;
    }
    .img-back{
        cursor: pointer;
        width: 24px;
        border-radius: 5px;
    }
    .img-back:hover{
        background-color: #b9d8c2;
    }
</style>
