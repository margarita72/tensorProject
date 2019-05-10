<template>
    <header>
        <ul class="headerButtons">
            <li id="points" @click="collapse">
                <img 
                    :src="menuCollapsed ? './src/Imgs/menu-fill.png' : './src/Imgs/menu-thin.png'"
                    alt="menu"
                >
            </li>
            <li id="home" @click="homeDir(0)">
                <img src="../Imgs/home.png" alt="home page">
            </li>
            <li id="logo">
                <img src="../Imgs/logo.png" alt="logo">
                <span>Котики</span>
            </li>
            <li @click="showTrash(true)" id="trash">
                <img src="../Imgs/trash.png" alt="trash">
            </li>
            <li @click="signIn" id="login">
                <img 
                    :src=" nameOfUser == '' ? './src/Imgs/log-in.png' : './src/Imgs/user.png'"
                    alt="login"
                >
                <span class="username">{{ nameOfUser }}</span>
            </li>
        </ul>
    </header>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex'
export default {
    data(){
        return{
        }
    },
    computed:{
        ...mapGetters({
            menuCollapsed: 'navHidden',
            nameOfUser: 'userName'
        }),
    }, 
    methods:{
        ...mapMutations({
            collapse: 'navCollapse',
            showTrash: 'setTrashVisible',
            signInVisible: 'signInVisible'
        }),
        ...mapActions({
            homeDir: 'loadTasksList'
        }),
        signIn(){
            if(this.nameOfUser == ''){
                this.signInVisible(true);
            }
        }
    }
}
</script>

<style scoped>
/*Header*/
header{
    height: 40px;
    background: #dae0e6;
}
.headerButtons{
    display: flex;
    width: 100%;
}    

.headerButtons > li{
    text-align: center;
    height: 30px;
    border-radius: 3px;
    margin: 5px;
    display: inline-block;
    background:#9dacb4;
    cursor: pointer;
    /* font-family: @fonts; */
}

#home, #points{
    width: 30px;
}
#home > img, #points > img {
    margin: 5px;
    width: 20px;
    vertical-align: middle;
}
#logo{
    padding: 0 10px;
    margin: auto;
}
#logo > img{
    width: 20px;
    vertical-align: middle;
}
#logo > span{
    vertical-align: middle;
}
#trash{
    width: 30px;
    margin-left:auto
}
 #trash > img, #login > img{
    width: 20px;
    vertical-align: middle;
}
#login{
    /* width: 30px; */
    padding: 0 5px;
}
@media screen and (max-width: 500px){
    .username{
        display: none;
    }
}
</style>