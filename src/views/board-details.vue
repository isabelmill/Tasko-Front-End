<template>
    <section>
        <board-header />
    </section>
    <section v-if="board" class="board-details-main">
        <group-list :groups="groups"></group-list>
    </section>
</template>

<script>
import groupList from "../components/group-list.vue"
import { boardService } from "../services/board-service.js"
import boardHeader from "../components/board-header.vue"

export default {
    components: {
        groupList,
        boardHeader
    },
    data() {
        return {
            board: null,
            groups: null,
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