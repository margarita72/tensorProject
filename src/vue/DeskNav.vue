<template>
    <div class="root" :class="{ hidden: isHhidden }">
        <div class="desk-title">Доступные доски</div>
        <div id="nav-desks">
            <div>
                <div 
                    class="desk-list"
                    @click="openDesks(desk.id)"
                    :id="'desk' + desk.id"
                    v-for="desk in desks"
                    :key="desk.id"
                    :class="curId == desk.id ? 'selected': ''"
                    >
                        {{ desk.name }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions} from 'vuex'

export default {
    data() {
        return { 
            
        }
    },
    methods: {
        ...mapActions([
            'loadTasksList',
        ]),
        init(arrayOfModel) {
            this.desks = arrayOfModel;
        },
        openDesks(id) {
            this.loadTasksList(id);
        },
    },
    computed: {
        ...mapGetters({
            desks: 'Desks',
            isHhidden: 'navHidden',
            curId: 'currentDesk'
        })
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
        overflow: unset;
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
.desk-list{
    display: block;
    margin: 10px;
    padding: 15px 10px;
    text-align: center;
    background: #dfdfdf;
    border-radius: 5px;
    /* font-family: @fonts; */
    cursor: pointer;
}
.desk-title{
    text-align: center;
    padding: 20px 10px;
    background-color: #9dacb4;
}
.selected{
    background-color: #6f6f74;
}
</style>
