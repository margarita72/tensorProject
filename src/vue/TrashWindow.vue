<template>
    <div class="back" v-if="visible">
        <div class="window">
            <h2>Корзина</h2>
            <div class="desk" v-for="desk in desks" :key="desk.id">
                <div id="name">{{ desk.name }} </div>
                <div class="btms">
                    <img src="../Imgs/remove.png" alt="remove"> 
                </div>
                <div class="btms" @click="restore(desk.id)">
                    <img src="../Imgs/restore.png" alt="restore"> 
                </div>
            </div>
            <button @click="close">Выход</button>
        </div>
    </div>
</template>

<script>
export default {
    computed:{
        desks(){
            let desks = this.$store.state.Tasks.filter( a => a.removed);
            return  desks;
        },
        visible(){
            return this.$store.state.trash.visible;
        }
    },
    methods:{
        close(){
            this.$store.commit('setTrashVisible',false);
        },
        restore(id){
            this.$store.dispatch('taskChanges', {
                id: id,
                removed: false
            });
        }
    }
}
</script>

<style scoped>
h2{
    text-align: center;
}
.back {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #0000009c;
}
.window {
    display: block;
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
.desk {
    display: flex;
    justify-content: flex-end;
    margin: 5px;
    padding: 5px;
    border-radius: 5px;
    background-color: #c1cbd1;
}
#name{
    margin-right: auto;
}
.btms{
    text-align: center;
    height: 30px;
    width: 30px;
    border-radius: 3px;
    margin: 5px;
    display: inline-block;
    background: #9dacb4;
    cursor: pointer;
}
img{
    margin: 5px;
    width: 20px;
    vertical-align: middle;
}
button{
    position: absolute;
    right: 5px;
    bottom: 6px;
    padding: 7px 20px;
    margin: 0 5px;
    border-radius: 5px;
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
