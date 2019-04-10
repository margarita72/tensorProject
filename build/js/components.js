'use strict';

Vue.component('task', {
    data: function data() {
        return {
            description: 'описание',
            name: 'задача',
            done: false,
            removed: false,
            edit: false
        };
    },
    template: '#template-task',
    methods: {
        remove: function remove() {
            this.removed = true;
        },
        activeEdit: function activeEdit() {
            this.edit = !this.edit;
        }
    },
    computed: {
        borderStyle: function borderStyle() {
            if (this.removed) return '2px solid red';
            if (this.done) return '2px solid green';
            return 'none';
        }
    }
});
Vue.component('tasklist', {
    data: function data() {
        return {};
    },

    template: '\n        <task></task>\n    '
});
var task1 = new Vue({ el: '#components-demo' });