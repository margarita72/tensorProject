'use strict';

Vue.component('task-v', {
    data: function data() {
        return {
            description: 'описание',
            name: 'задача',
            done: false,
            removed: false,
            edit: true
        };
    },
    template: '\n        <div class="table-layer-2">\n            <span class="list-open">\n                {{ name }}\n            </span>\n            <img src="Imgs/remove.png" class="del-btn" @click="remove">\n            <input v-bind:disabled="removed" type="checkbox" v-model="done" class="check">\n            <textarea v-bind:disabled="removed || !edit" v-model="description" class="description"></textarea>\n        </div>\n    ',
    methods: {
        remove: function remove() {
            this.taskBorder = '1px solid red';
            this.removed = true;
        }
    }
});
var task1 = new Vue({ el: '#components-demo' });