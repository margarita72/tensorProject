<template>
    <div class="back" v-if="visible">
        <div class="window">
            <h2>Вход</h2>
            <label for="login">Электронная почта или имя пользователя</label>
            <input placeholder="Введите почту" id="login" type="text" v-model="username">
            <label for="pass">Пароль</label>
            <input placeholder="Введите пароль" type="password" v-model="pass">
            <p v-if="authError">Неверный пароль</p>
            <button @click="signIn">Вход</button>
        </div> 
    </div>    
</template>


<script>
import {mapGetters, mapActions} from 'vuex'
export default {
    data(){
        return {
            username: 'admin',
            pass: '1234'
        }
    },
    computed: {
        ...mapGetters({
            visible: 'userVisible',
            authError: 'userError'
        }),
    },
    methods:{
        ...mapActions({
            sign:'signIn'
        }),
        signIn(){
            this.sign({
                username: this.username,
                pass: this.pass
            });
        }
    }
    
}
</script>

<style scoped>
h2{
    text-align: center;
}
p{
    font-size: 15pt;
    color: red;
}
.back {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #696767;
}
.window {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 400px;
    height: 400px;
    background-color: aliceblue;
    border-radius: 5px;
    border: 1px solid gray;
    padding: 10px 50px;
    color: black;
    font-size: 18pt;
}
button{
    padding: 7px 20px;
    margin: 0 5px;
    border-radius: 5px;
    margin-top: 30px;
    width: 100%;
    height: 50px;
    font-size: 18pt;
}
label{
    display: block;
    font-size: 15pt;
    margin-top: 30px
}
input{
    background: #EDEFF0;
    border-radius: 4px;
    border: 1px solid #CDD2D4;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding: .5em;
    width: 100%;
    font-size: 17pt;
}
@media screen and (max-width: 500px) {
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
</style>
