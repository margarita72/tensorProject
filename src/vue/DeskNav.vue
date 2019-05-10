<template>
    <div class="root" :class="{ hidden: isHhidden }">
        <div class="desk-title">Доступные доски</div>
        <div 
            v-if="userName != ''"
            class="desk-add"
            @click="addDesk"
        >
            Добавить доску
        </div>
        <div id="nav-desks">
            <deskBtm v-for="d in desks" :key="d.id" :desk="d"></deskBtm>                
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions} from 'vuex'
import deskBtm from './DeskBtm.vue'

export default {
    data() {
        return { 
        }
    },
    components:{deskBtm},
    methods: {
        ...mapActions([
            'openDialog',
        ]),
        addDesk(){
            this.openDialog({
                id:null,
                title: 'Добавить доску',
                mutation: 'loadDesks'
            });
        },
    },
    computed: {
        ...mapGetters({
            _desks: 'Desks',
            isHhidden: 'navHidden',
            userName: 'userName'
        }),
        desks(){
            return this._desks.filter( a => !a.removed);
        } 
    }
}
</script>

<style scoped>
.root{
    width: 200px;
    min-width: 200px;
    background-color: #c1cbd1;
    height: 100%;
    transition: all ease 0.3s;
    overflow-y: auto;
    overflow-x: hidden;
}
@media screen and (max-width: 820px){
    .root{
        width: unset;
        height: unset;
    }
    .hidden{
        display: none;
    }
}
.hidden{
    min-width: 0;
    transition: all ease 0.3s;
    width: 0;
}
#desk-nav{
    min-width: 200px;    
    background-color: #6f6f74;
}

.desk-title{
    text-align: center;
    padding: 20px 10px;
    background-color: #9dacb4;
}
.desk-add{
    text-align: center;
    background-color: #abbac2;
    padding: 5px 0;
    cursor: pointer;
}
.desk-add:hover{
    background-color: #b7c5cc;
}
</style>
