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
var tasks = new Vue({
    el: '#nav-desks',
    data: {
        desks: [{ id: 1, name: 'desk1' }, { id: 2, name: 'desk2' }]
    },
    methods: {
        fill: function fill(arrayOfModel) {
            var i = void 0;
            this.desks.clear();
            for (i = 0; i < arrayOfModel.length; i++) {
                this.desks.push('arrayOfModel[i].read()');
            }
        }
    }
});