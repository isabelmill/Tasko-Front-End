<template>
    <section>
        <board-header v-if="board" :board="board" />
    </section>
    <section v-if="board" class="board-details-main" :style="{ 'backgroundColor': board.background }">
        <group-list
            @openCardDetails="openCardDetailsModal"
            @groupUpdated="updateGroup"
            :groups="board.groups"
        ></group-list>

        <div
            class="add-new-group"
            :style="show ? { 'height': '100px', 'backgroundColor': 'white' } : null"
        >
            <button class="add-another-list-btn" v-if="!show" @click="show = true">
                <span class="icon-sm icon-add-light"></span>Add another list
            </button>
            <div v-clickOutside="close" v-if="show" class="add-new-group-in">
                <textarea
                    @keyup.enter="addNewGroup"
                    placeholder="Enter list title..."
                    type="text"
                    v-model="newGroup.title"
                />
                <div class="controls-add-list">
                    <button class="btn-add-card-in" @click="addNewGroup">Add List</button>
                    <span class="icon-lg icon-close" @click="show = false"></span>
                </div>
            </div>
        </div>
    </section>
    <dialog ref="cardDetailsModal" class="modal">
        <card-details v-if="isCardOpen" @cardModified="updateCard" @closeDialog="closeDiag" :board="board" :card="cardToOpen" :groupId="cardToOpenGroupId"></card-details>
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
        updateCard({card,groupId}){
            this.groupToEdit = JSON.parse(JSON.stringify(this.board)).groups.find(group=> group.id === groupId)
            const cardToEditIdx = this.groupToEdit.cards.findIndex(cardToFind=> cardToFind.id === card.id)
            this.groupToEdit.cards[cardToEditIdx] = card
            this.updateGroup(this.groupToEdit)            
        },
        updateGroup(editedGroup) {
            this.boardToEdit = JSON.parse(JSON.stringify(this.board))
            const groupIdx = this.boardToEdit.groups.findIndex(group => group.id === editedGroup.id)
            this.boardToEdit.groups[groupIdx] = editedGroup
            this.$store.dispatch({ type: 'saveBoard', board: this.boardToEdit })
        },
        openCardDetailsModal(info) {
            this.isCardOpen = true
            this.cardToOpen = info.card
            this.cardToOpenGroupId = info.groupId
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
    max-height: 500px;
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