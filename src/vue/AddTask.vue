<template>
    <div class="window" v-if="visible">
        <h2>{{ title }}</h2>
        <table>
            <tr>
                <td><label for="add-form-name">Название</label></td>
                <td><input type="text" id="add-form-name" v-model="name"></td>
            </tr>
            <tr>
                <td><label for="add-form-description">Описание</label></td>
                <td><textarea id="add-form-description" v-model="description"></textarea></td>
            </tr>
            <tr>
                <td><label for="add-form-comment">Комментарий</label></td>
                <td><textarea id="add-form-comment" v-model="comment"></textarea></td>
            </tr>
            <tr>
                <td><label for="add-form-status">Выполнено</label></td>
                <td><input type="checkbox" id="add-form-status" v-model="done"></td>
            </tr>
        </table>
        <div id='buttons'>
            <button @click="close">Отмена</button>
            <button @click="addData">Добавить</button>
        </div>
    </div>
</template>

<script>

import localServer from '../server'

export default {
    name: "add-task",
    data() {
        return {
            name: '',
            description: '',
            comment: '',
            done: ''
        }
    },
    methods: {
        close() {
            this.$store.commit('dialogClose');
            this.name = '';
            this.description = '';
            this.done = false;
            this.comment = '';
        },
        addData(){
            let sendData = {
                name: this.name,
                description: this.description,
                comment: this.comment,
                done: this.comment,
                parent: this.$store.state.dialog.id
            }
            let context = this;
            localServer.newRecord(sendData).then(function(data){
                context.$store.dispatch('addData', data);
                context.close();
            });
        }
    },
    computed:{
        visible(){
            return this.$store.state.dialog.visible;
        },
        title(){
            return this.$store.state.dialog.title;
        }
    }
    
}
</script>

<style scoped>
h2 {
    text-align: center;
    padding-bottom: 30px;
}
.window {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 500px;
    height: 500px;
    background-color: aliceblue;
    border-radius: 5px;
    border: 1px solid gray;
    padding: 10px;
    color: black;
    font-size: 18pt;
}
table, input, textarea {
    width: 100%;
    margin-top: 5px;
}
textarea {
    height: 90px;
    resize: none;
}
button {
    padding: 7px 20px;
    margin: 0 5px;
    border-radius: 5px;
}
#buttons {
    width: 100%;
    display: flex;
    flex-direction:row-reverse;
    margin-top: auto;
}
input[type="checkbox"] {
    height: 19px;
    width: 19px;
}

</style>