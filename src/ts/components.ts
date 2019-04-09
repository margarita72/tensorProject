Vue.component('task-v', {
    data: function () {
      return {
        description: 'описание',
        name: 'задача',
        done: false,
        removed: false,
        edit: true
      }
    },
    template: `
        <div class="table-layer-2">
            <span class="list-open">
                {{ name }}
            </span>
            <img src="Imgs/remove.png" class="del-btn" @click="remove">
            <input v-bind:disabled="removed" type="checkbox" v-model="done" class="check">
            <textarea v-bind:disabled="removed || !edit" v-model="description" class="description"></textarea>
        </div>
    `,
    methods: {
        remove(){
            this.taskBorder = '1px solid red';
            this.removed = true;
        }   
    }
})

let task1 = new Vue({ el: '#components-demo' });