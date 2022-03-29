<template>
    <section>
        <section>
            <board-header
                v-if="board"
                :board="board"
                @titleChange="updateBoardTitle"
                @starredChange="isStarredBoard"
                @changeBgcColor="changeBoardBgcColor"
                @changeBoardBgc="changeBoardPhoto"
            />
        </section>
        <section
            v-if="board"
            class="board-details-main"
            :style="{ 'backgroundColor': board.background }"
        >
            <group-list
                @saveCopy="SaveCopyToBoard"
                @boardModified="updateBoard"
                @removeGroup="groupRemove"
                @openCardDetails="openCardDetailsModal"
                @groupUpdated="updateGroup"
                :board="board"
                :groups="board.groups"
                :newGroup="newGroup"
                @addGroup="addNewGroup"
                @groupDnd="updateBoardDnd"
            ></group-list>
        </section>

        <dialog ref="cardDetailsModal" class="modal">
            <card-details
                v-if="isCardOpen"
                @deleteCardFromGroup="deleteCardFromGroup"
                @boardModified="updateBoard"
                @cardModified="updateCard"
                @closeDialog="closeDiag"
                @saveCopy="SaveCopyToBoard"
                :board="board"
                :card="cardToShow"
                :group="groupToShow"
            ></card-details>
        </dialog>
    </section>
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
        // this.$store.dispatch({ type: 'saveBoard', board: this.boardToEdit })
        // this.boardToEdit = JSON.parse(JSON.stringify(this.$store.getters.board))
        // console.log('this.boardToEdit:', this.boardToEdit);
        // if (this.boardToEdit) {
        //     this.boardToEdit.lastTimeWatched = Date.now()
        // this.$store.dispatch({ type: 'saveBoard', board: this.boardToEdit })
        // }
    },

    mounted() {

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
        deleteCardFromGroup({ card, group }) {
            this.groupToEdit = JSON.parse(JSON.stringify(group))
            const cardToEditIdx = this.groupToEdit.cards.findIndex(cardToFind => cardToFind.id === card.id)
            this.groupToEdit.cards.splice(cardToEditIdx, 1)
            this.updateGroup(this.groupToEdit)
        },
        updateGroup(editedGroup) {
            this.boardToEdit = JSON.parse(JSON.stringify(this.board))
            const groupIdx = this.boardToEdit.groups.findIndex(group => group.id === editedGroup.id)
            this.boardToEdit.groups[groupIdx] = editedGroup
            this.$store.dispatch({ type: 'saveBoard', board: this.boardToEdit })
        },
        updateBoard({ key, val }) {
            this.boardToEdit = JSON.parse(JSON.stringify(this.board))
            this.boardToEdit[key] = val
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
        },
        SaveCopyToBoard(copy) {
            this.groupToEdit = JSON.parse(JSON.stringify(copy.posCopy.group))
            this.groupToEdit.cards.splice(copy.posCopy.position - 1, 0, copy.cardCopy)
            this.updateGroup(this.groupToEdit)
        },
        updateBoardDnd(newBoard) {
            this.$store.dispatch({ type: 'saveBoard', board: newBoard })
        },
        updateBoardTitle(title) {
            this.boardToEdit = JSON.parse(JSON.stringify(this.board))
            this.boardToEdit.title = title
            this.$store.dispatch({ type: 'saveBoard', board: this.boardToEdit })
        },
        isStarredBoard(isStarred) {
            this.boardToEdit = JSON.parse(JSON.stringify(this.board))
            this.boardToEdit.isStarred = isStarred
            this.$store.dispatch({ type: 'saveBoard', board: this.boardToEdit })
        },
        changeBoardBgcColor(color) {
            this.boardToEdit = JSON.parse(JSON.stringify(this.board))
            this.boardToEdit.background = color
            this.$store.dispatch({ type: 'saveBoard', board: this.boardToEdit })
        },
        changeBoardPhoto(photo) {
            this.boardToEdit = JSON.parse(JSON.stringify(this.board))
            this.boardToEdit.background = ''
            this.boardToEdit.backgroundPhoto = photo
            this.$store.dispatch({ type: 'saveBoard', board: this.boardToEdit })
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
                if (newId) this.$store.dispatch({ type: 'loadBoardById', newId })
            },
            immediate: true
        }
    }
}

</script>

<style>
.modal {
    max-height: 800px;
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