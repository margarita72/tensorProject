<template>
    <div class="root">
        <div class="desk-title">Доступные доски</div>
        <div id="nav-desks">
            <div>
                <div 
                    class="desk-list"
                    @click="openDesks(desk.id)"
                    :id="'desk' + desk.id"
                    v-for="desk in desks"
                    :key="desk.id"
                    >
                        {{ desk.name }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return { 
            
        }
    },
    methods: {
        init(arrayOfModel) {
            this.desks = arrayOfModel;
        },
        openDesks(id) {
            
            //loadChildren(id).then(currenDesk.loadTaskList);
        },
        load() {
            this.$store.dispatch('loadDesks');
        },
    },
    mounted() {
        this.load();
    },
    computed: {
        desks() {
            return this.$store.state.Desks;
        }
    }
}
</script>

<style scoped>
.root{
    background-color: gray;
    height: 100%;
    overflow-y: auto;
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
    background: #a1a1a1;
    border-radius: 5px;
    /* font-family: @fonts; */
    cursor: pointer;
}
.desk-title{
    text-align: center;
    padding: 20px 10px;
    background-color: #003f4e;
}
</style>
