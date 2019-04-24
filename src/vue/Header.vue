<template>
    <header>
        <ul class="headerButtons">
            <li id="home">
                <img 
                    :src="menuCollapsed ? './src/Imgs/menu-fill.png' : './src/Imgs/menu-thin.png'"
                    alt="menu"
                    @click="collapse"
                >
            </li>
            <li id="home">
                <img src="../Imgs/home.png" alt="home page">
            </li>
            <li id="logo">
                <img src="../Imgs/logo.png" alt="logo">
                <span>Морские котики</span>
            </li>
            <li id="info">
                <img src="../Imgs/info.png" alt="info">
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
        }
    }, 
    methods:{
        collapse(){
            this.$store.commit('navCollapse');
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

#home{
    width: 30px;
}
#home > img{
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
#info{
    width: 30px;
    margin-left:auto
}
#info > img{
    width: 20px;
    vertical-align: middle;
}

</style>
