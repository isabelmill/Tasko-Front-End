<template>
    <!-- <section class="board-header">      
    </section>-->
    <section v-if="board" class="board-details-main">
        <group-list :groups="groups"></group-list>
    </section>
</template>

<script>
import groupList from "../components/group-list.vue"
import { boardService } from "../services/board-service.js"
export default {
    components: {
        groupList,
    },
    data() {
        return {
            board: null,
            groups:null,
        }
    },
    created() {
        const { _id } = this.$route.params
        boardService.getById(_id).then((board) => {
            this.board = board
            this.groups = this.board.groups
        })
    },
}
</script>

<style>
</style>