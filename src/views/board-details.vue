<template>
    <section>
        <board-header v-if="board" :board="board" />
    </section>
    <section v-if="board" class="board-details-main">
        <group-list
            @openCardDetails="openCardDetailsModal"
            @groupUpdated="updateGroup"
            :groups="board.groups"
        ></group-list>

        <div
            class="add-new-board"
            :style="show ? { 'height': '100px', 'backgroundColor': 'white' } : null"
        >
            <button v-if="!show" @click="show = true">
                <span class="icon-sm icon-add-light"></span>Add another list
            </button>
            <div v-clickOutside="close" v-if="show" class="add-new board-input">
                <input
                    @keyup.enter="addNewGroup"
                    placeholder="Title"
                    type="text"
                    v-model="newGroup.title"
                />
                <button @click="addNewGroup">Add List</button>
                <button @click="show = false">X</button>
            </div>
        </div>
    </section>
    <dialog ref="cardDetailsModal" class="modal">
        <card-details :card="cardToOpen" :GroupId="cardToOpenGroupId"></card-details>
    </dialog>
</template>

<script>
import groupList from "../components/group-list.vue"
import { boardService } from "../services/board-service.js"
import boardHeader from "../components/board-header.vue"
import cardDetails from "../components/card-details.vue"

export default {
    components: {
        groupList,
        boardHeader,
        cardDetails
    },
    data() {
        return {
            show: false,
            isCardOpen: false,
            cardToOpen: {},
            cardToOpenGroupId: null,
            boardToEdit: null,
            groupToEdit: null,
            newGroup: boardService.getEmptyGroup(),
        }
    },
    created() {
    },
    methods: {
        addNewGroup() {
            if (!this.newGroup.title) return
            this.boardToEdit = JSON.parse(JSON.stringify(this.board))
            this.boardToEdit.groups.push(this.newGroup)
            this.$store.dispatch({ type: 'saveBoard', board: this.boardToEdit })
            this.newGroup = boardService.getEmptyGroup()
            this.show = false;
        },
        close() {
            this.show = false;
            this.newGroup.title = ""
        },
        updateGroup(editedGroup) {
            this.boardToEdit = JSON.parse(JSON.stringify(this.board))
            const groupIdx = this.boardToEdit.groups.findIndex(group => group.id === editedGroup.id)
            this.boardToEdit.groups[groupIdx] = editedGroup
            this.$store.dispatch({ type: 'saveBoard', board: this.boardToEdit })
        },
        openCardDetailsModal(info) {
            this.cardToOpen = info.card
            this.cardToOpenGroupId = info.groupId
            this.$refs.cardDetailsModal.showModal()
        },
    },
    computed: {
        board() {
            return this.$store.getters.board
        }
    },
    watch: {
        "$route.params.boardId": {
            async handler(newId) {
                this.$store.dispatch({ type: 'loadBoardById', newId })
            },
            immediate: true
        
        }
        // "$store.getters.selectedBoard": {
        //     handler(newBoard) {
        //         this.board = newBoard
        //     }
        // }
    }
}

</script>

<style>
</style>