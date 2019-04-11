Vue.component('task', {
    data: function () {
      return {
        description: 'описание',
        name: 'задача',
        done: false,
        removed: false,
        edit: false,
      }
    },
    template: '#template-task',
    methods: {
        remove(){
            this.removed = true;
        },
        activeEdit(){
            this.edit = ! this.edit;
        }
    },
    computed: {
        borderStyle: function(){
            if(this.removed) 
                return '2px solid red';
            if(this.done)
                return '2px solid green';
            return 'none';
        }
    },
})


Vue.component('tasklist',{
    data() {
        return {
        }
    },
    template:`
        <task></task>
    `
})
  
let task1 = new Vue({ el: '#components-demo' });


let tasks = new Vue({
    el: '#nav-desks',
    data: {
        desks: [
            {id:1,name:'desk1'},
            {id:2,name:'desk2'}
        ]
    },
    methods:{
        fill:function(arrayOfModel:modelBuilder[]){
            let i:number;
            this.desks.clear();
            for(i = 0; i < arrayOfModel.length; i++){
                this.desks.push('arrayOfModel[i].read()');
            }
        }
    }
 });