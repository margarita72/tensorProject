<template>
    <div class="window" v-if="visible">
        <h2>Добавить задачу</h2>
        <table>
            <tr>
                <td><label for="add-form-name">Название задачи</label></td>
                <td><input type="text" id="add-form-name"></td>
            </tr>
            <tr>
                <td><label for="add-form-description">Описание задачи</label></td>
                <td><textarea id="add-form-description"></textarea></td>
            </tr>
            <tr>
                <td><label for="add-form-comment">Комментарий</label></td>
                <td><textarea id="add-form-comment"></textarea></td>
            </tr>
            <tr>
                <td><label for="add-form-status">Выполнено</label></td>
                <td><input type="checkbox" id="add-form-status"></td>
            </tr>
        </table>
        <div id='buttons'>
            <button @click="close">Отмена</button>
            <button >Добавить</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "add-task",
    data() {
        return {
            visible: false
        }
    },
    methods: {
        close() {
            this.visible = false;
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
    margin: 0 5px
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