<template>
    <section>
        <board-header :board="board"/>
    </section>
    <section v-if="board" class="board-details-main">
        <group-list :groups="groups"></group-list>

        <div
            class="add-new-board"
            :style="show ? { 'height': '100px', 'backgroundColor': 'white' } : null"
        >
            <button v-if="!show" @click="show = true">+ Add another list</button>
            <div v-clickOutside="close" v-if="show" class="add-new board-input">
                <input placeholder="Title" type="text" v-model="newGroup.title" />
                <button @click="addNewGroup">Add List</button>
                <button @click="show = false">X</button>
            </div>
        </div>
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
            show: false,
            board: null,
            groups: null,
            newGroup: boardService.getEmptyGroup()
        }
    },
    created() {
        const { _id } = this.$route.params
        boardService.getById(_id).then((board) => {
            this.board = board
            this.groups = this.board.groups
        })
    },
    methods: {
        addNewGroup() {
            this.board.groups.push(this.newGroup)
            this.$store.dispatch({ type: 'saveBoard', board: this.board })
            this.newGroup = boardService.getEmptyGroup()
        },
        close() {
            this.show = false;
            this.newGroup.title=""
        }
    },
}
</script>

<style>
</style>