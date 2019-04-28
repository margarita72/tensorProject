<template>
    <div class="back" v-if="visible">
        <div class="window">
            <h2>{{ title }}</h2>
            <table>
                <tr>
                    <td><label for="add-form-name">Название *</label></td>
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
    </div>
</template>

<script>

import localServer from '../server'
import {mapGetters, mapMutations, mapActions} from 'vuex'

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
        ...mapMutations([
            'dialogClose'
        ]),
        ...mapActions({
            sendData: 'addData'
        }),
        close() {
            this.dialogClose();
            this.name = '';
            this.description = '';
            this.done = false;
            this.comment = '';
        },
        addData(){
            if(this.name == ''){
                alert('Название обязательное поле!');
                return;
            }
            let context = this;
            let dat = {
                name: this.name,
                description: this.description,
                comment: this.comment,
                done: this.done,
                parent: context.dialogID,
                removed: false
            }
            localServer.newRecord(dat).then(function(data){
                context.sendData(data);
                context.close();
            });
        }
    },
    computed:{
        ...mapGetters({
            visible: 'dialogVisible',
            title: 'dialogTitle',
            dialogID: 'dialogID'
        }),
    }
    
}
</script>

<style scoped>
.back{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #0000009c;
}
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
    height: 400px;
    background-color: aliceblue;
    border-radius: 5px;
    border: 1px solid gray;
    padding: 10px;
    color: black;
    font-size: 18pt;
}
@media screen and (max-width: 500px){
    .window {
        width: 100%;
        height: 100%;
        position: unset;
        top: unset;
        left: unset;
        transform: unset;
        border: unset;
        border-radius: unset;
        padding: unset;
        overflow: hidden;
    }
}
table {
    margin: 5px;
}
textarea {
    width: 100%;
    margin: 5px 0;
    height: 90px;
    resize: none;
}
input {
    width: 100%;
    margin: 5px 0;
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