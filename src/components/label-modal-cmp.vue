<template>
    <section class="label-modal">
        <p class="main-title">Labels</p>
        <hr />
        <search></search>
        <p class="mini-title">Labels</p>
        <section :v-for="label in board.labels" :key="label.id" class="label-container flex">
            <div :style="{backgroundColor:'label.color'}"></div>
            <button>edit</button>
        </section>
    </section>
</template>

<script>
import search from './search.vue'
export default {
    components: { search },
    name: 'label-modal',
    props: {
        board:{
            type: Object
        },
        card: {
            type: Object
        },
        groupId:{
            type: String
        },
    },
    data() {
        return {
        }
    },
    created(){
        console.log(this.board)
    }

}
</script>

<style>
.label-modal{
    position: fixed;
}
</style>