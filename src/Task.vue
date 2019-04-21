<template id="template-task">
    <div class="table-layer-2" :style="{border: borderStyle}">
        <div class="table-layer-2-head">
            <span class="list-open"> {{ gettingTasks.name }} </span>
            <input 
                :disabled="gettingTasks.removed" 
                type="checkbox" 
                v-model="gettingTasks.done" 
                @click="changeDone"
                class="check">
            <img src="./Imgs/remove.png" class="del-btn" @click="remove">
        </div>
        <textarea 
            :disabled="gettingTasks.removed"
            v-model="gettingTasks.description" 
            class="description" 
            v-on:blur="descriptionSave"
        ></textarea>
    </div>
</template>

<script>

export default {
    data: function () {
      return {
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
    template: '#template-task',
    methods: {
        remove() {
            this.gettingTasks.removed = true;
        },
        activeEdit(stat) {
            this.edit = stat;
        },
        descriptionSave() {
            console.log('description Save');
        },
        changeDone() {
            this.$emit('updataChildData',{id:this.id,'done': this.gettingTasks.done});
        }
    },
    computed: {
        borderStyle() {
            if (this.gettingTasks.removed) 
                return '2px solid red';
            if (this.gettingTasks.done)
                return '2px solid green';
            return 'none';
        },
    }
}
</script>

<style scoped>
.table-layer-2 {
    display: block;
    margin: 5px auto 0;
    padding: 10px 20px;
    transition: 0.5s;
    background-color: #f3f3f3;
    border-radius: 6px;
    text-align: left;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', 'Geneva', 'Verdana', 'sans-serif';
  }
  .table-layer-2-head{
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
    background-color: #EBEBE4;
  }
  .description:focus{
    color: #000;
    background-color: #fff;
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
    cursor: pointer;
  }
  .del-btn:hover {
    background-color: #b9d8c2;
  }
</style>
