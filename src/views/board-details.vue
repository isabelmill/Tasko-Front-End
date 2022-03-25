<template>
    <section>
        <board-header v-if="board" :board="board" />
    </section>
    <section
        v-if="board"
        class="board-details-main"
        :style="{ 'backgroundColor': board.background }"
    >
        <group-list
            @removeGroup="groupRemove"
            @openCardDetails="openCardDetailsModal"
            @groupUpdated="updateGroup"
            :board="board"
            :groups="board.groups"
            :newGroup="newGroup"
            @addGroup="addNewGroup"
        ></group-list>


    </section>
    <dialog ref="cardDetailsModal" class="modal">
        <card-details
            v-if="isCardOpen"
            @boardModified="updateBoard"
            @cardModified="updateCard"
            @closeDialog="closeDiag"
            :board="board"
            :card="cardToShow"
            :group="groupToShow"
        ></card-details>
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

            isCardOpen: false,
            selectedCardIdx: null,
            selectedCardGroupIdx: null,
            boardToEdit: null,
            groupToEdit: null,
            newGroup: boardService.getEmptyGroup(),
        }
    },
    created() {

    },
    methods: {
        groupRemove(groupId) {
            this.boardToEdit = JSON.parse(JSON.stringify(this.board))
            const idx = this.boardToEdit.groups.findIndex((group) => group.id === groupId)
            this.boardToEdit.groups.splice(idx, 1)
            this.$store.dispatch({ type: 'saveBoard', board: this.boardToEdit })
        },
        addNewGroup(newGroup) {
            if (!newGroup.title) return
            this.boardToEdit = JSON.parse(JSON.stringify(this.board))
            this.boardToEdit.groups.push(newGroup)
            this.$store.dispatch({ type: 'saveBoard', board: this.boardToEdit })
            this.newGroup = boardService.getEmptyGroup()
            this.show = false;
        },
        close() {
            this.show = false;
            this.newGroup.title = ""
        },
        updateCard({ card, group }) {
            this.groupToEdit = JSON.parse(JSON.stringify(group))
            const cardToEditIdx = this.groupToEdit.cards.findIndex(cardToFind => cardToFind.id === card.id)
            this.groupToEdit.cards[cardToEditIdx] = card
            this.updateGroup(this.groupToEdit)
        },
        updateGroup(editedGroup) {
            this.boardToEdit = JSON.parse(JSON.stringify(this.board))
            const groupIdx = this.boardToEdit.groups.findIndex(group => group.id === editedGroup.id)
            this.boardToEdit.groups[groupIdx] = editedGroup
            this.$store.dispatch({ type: 'saveBoard', board: this.boardToEdit })
        },
        updateBoard({key,val}){
            this.boardToEdit = JSON.parse(JSON.stringify(this.board))
            this.boardToEdit[key]=val
            this.$store.dispatch({ type: 'saveBoard', board: this.boardToEdit })
        },
        openCardDetailsModal(info) {
            this.isCardOpen = true
            this.selectedCardIdx = this.board.groups.find(group => group.id === info.group.id).cards.findIndex(card => card.id === info.card.id)
            this.selectedCardGroupIdx = this.board.groups.findIndex(group => group.id === info.group.id)
            this.$refs.cardDetailsModal.showModal()
        },
        closeDiag() {
            this.isCardOpen = false
            this.$refs.cardDetailsModal.close()
        }
    },
    computed: {
        board() {
            return this.$store.getters.board
        },
        cardToShow() {
            return this.board.groups[this.selectedCardGroupIdx].cards[this.selectedCardIdx]
        },
        groupToShow() {
            return this.board.groups[this.selectedCardGroupIdx]
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
.modal {
    max-height: 600px;
    margin-top: 80px;
    border-radius: 2px;
    max-width: 768px;
    border: 0;
    box-shadow: 0 0 1em rgb(0, 0, 0/0.3);
}

.modal::backdrop {
    background: black;
    opacity: 0.3;
}
</style>