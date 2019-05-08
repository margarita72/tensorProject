<template>
        <div 
            class="desk-list"
            @click="openDesks(desk.id)"
            :class="curId == desk.id ? 'selected': ''"
            >
            <div @dblclick="edit = true" class="name" v-if="!edit">{{ desk.name }}</div>
            <input v-on:blur="edit = false; update($event);" v-else class="name" :value="desk.name" type="text">
            <div class="img-back">
                <img 
                    @click.stop="remove"
                    class="img-remove" 
                    src="../Imgs/remove.png" alt=""
                >
            </div>
        </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'

export default {
    data(){
        return {
            edit: false
        }
    },
    props:['desk'],
    methods:{
        ...mapActions({
            loadTasksList: 'loadTasksList',
            sendChanges: 'desksChanges'
        }),
        ...mapMutations({
            setCurrentDesk: 'setCurrentDesk'
        }),
        openDesks(id) {
            this.loadTasksList(id);
        },
        remove(){
            this.sendChanges({
                id: this.desk.id,
                removed: true
            });
            this.setCurrentDesk(0);
        },
        update(ev){
             this.sendChanges({
                id: this.desk.id,
                name: ev.target.value
            });
        }
    },
    computed:{
        ...mapGetters({
            curId: 'currentDesk',
        })
            
    }
}
</script>

<style scoped>
.desk-list{
    display: flex;
    margin: 10px;
    padding: 15px 10px;
    text-align: center;
    background: #dfdfdf;
    border-radius: 5px;
    /* font-family: @fonts; */
    cursor: pointer;
}
.name{
    width: 100%;
    font-size: 15pt;
    border: none;
    text-align: center;
}
.name:focus{
    cursor: text;  
}
.img-remove{
    width: 16px;
    height: 16px;
}
.img-back{
    width: 24px;
    border-radius: 5px;
}
.img-back:hover{
    background-color: #b9d8c2;
}
.selected{
    background-color: #6f6f74;
}
</style>
