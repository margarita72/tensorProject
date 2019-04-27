<template>
    <header>
        <ul class="headerButtons">
            <li id="points" @click="collapse">
                <img 
                    :src="menuCollapsed ? './src/Imgs/menu-fill.png' : './src/Imgs/menu-thin.png'"
                    alt="menu"
                >
            </li>
            <li id="home" @click="homeDir">
                <img src="../Imgs/home.png" alt="home page">
            </li>
            <li id="logo">
                <img src="../Imgs/logo.png" alt="logo">
                <span>Котики</span>
            </li>
            <li @click="showTrash" id="trash">
                <img src="../Imgs/trash.png" alt="trash">
            </li>
            <li @click="signIn" id="login">
                <img 
                    :src=" nameOfUser == '' ? './src/Imgs/log-in.png' : './src/Imgs/user.png'"
                    alt="login"
                >
                <span>{{ nameOfUser }}</span>
            </li>
        </ul>
    </header>
</template>

<script>
export default {
    data(){
        return{
        }
    },
    computed:{
        menuCollapsed(){
            return this.$store.state.navHidden;
        },
        nameOfUser(){
            return this.$store.state.user.name;
        }
    }, 
    methods:{
        collapse(){
            this.$store.commit('navCollapse');
        },
        homeDir(){
            this.$store.dispatch('loadTasksList',0);
        },
        showTrash(){
            this.$store.commit('setTrashVisible',true);
        },
        signIn(){
            if(this.nameOfUser == ''){
                this.$store.commit('signInVisible',true);
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
</style>