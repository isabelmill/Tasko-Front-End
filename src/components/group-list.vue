<!-- card preview inside group list -->
<template >
    <Container
        class="group-list-main scroll-groups"
        orientation="horizontal"
        @drop="onGroupDrop($event)"
        drag-handle-selector=".group-preview-main"
    >
        <Draggable
            v-for="group in groups"
            :key="group.id"
            class="group-preview-main"
            drag-class="tilt"
            :class="{ 'no-pointer-events': pointerEvents }"
        >
            <div :class="group.props.className">
                <!-- <span class="column-drag-handle">&#x2630;</span> -->
                <toggle-input-cmp
                    class="title"
                    @groupDelete="deleteGroup"
                    @titleChange="changeTitle"
                    :title="group.title"
                    :id="group.id"
                ></toggle-input-cmp>
                <Container
                    class="scroller-group"
                    drag-class="tilt"
                    group-name="col"
                    orientation="vertical"
                    :get-child-payload="getCardPayload(group.id)"
                    @drag-start="(e) => log('drag start', e)"
                    @drag-end="(e) => log('drag end', e)"
                    @drop="(e) => onCardDrop(group.id, e)"
                >
                    <Draggable v-for="card in group.cards" :key="card.id" :class="{ 'no-pointer-events': pointerEvents }">
                        <card-preview
                            @toggleQuickEdit="toggleQuickEdit"
                            @boardUpdated="modifyBoard"
                            @deleteCard="cardDelete"
                            @openCard="openCardModal"
                            @openAllLabels="onOpenAllLabels"
                            @editCard="saveCardToBoard"
                            :group="group"
                            :card="card"
                            :board="board"
                            :isLabelOpen="isLabelOpen"
                        ></card-preview>
                    </Draggable>
                </Container>
                <add-card-cmp @cardAdd="addNewCard" :group="group"></add-card-cmp>
            </div>
        </Draggable>
        <div class="add-new-group" :style="show ? { 'height': '100px' } : null">
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
    </Container>
</template>

<script>
import cardPreview from "./card-preview.vue";
import toggleInputCmp from "./toggle-input-cmp.vue";
import addCardCmp from "./add-card-cmp.vue";
import { Container, Draggable } from "vue3-smooth-dnd";
import { applyDrag, generateItems } from '../services/dnd-service.js'

export default {
    name: "group-list",
    components: {
        cardPreview,
        toggleInputCmp,
        addCardCmp,
        Container,
        Draggable,
    },
    props: {
        groups: {
            type: Array
        },
        newGroup: {
            type: Object
        },
        board: {
            type: Object
        },
    },
    data() {
        return {
            show: false,
            groupToDisplay: {
                title: ""
            },
            groupToEdit: null,
            titleIsOpen: false,
            isLabelOpen: false,
            isQuickEditOpen: false
        };
    },
    created() {
    },
    computed: {
        boardToEdit() {
            return JSON.parse(JSON.stringify(this.board))
        },
        pointerEvents() {
            return this.isQuickEditOpen
        }
    },
    methods: {
        toggleQuickEdit() {
            this.isQuickEditOpen = !this.isQuickEditOpen
        },
        changeTitle({ txt, id }) {
            this.groupToEdit = JSON.parse(JSON.stringify(this.groups.find(group => group.id === id)))
            this.groupToEdit.title = txt
            this.$emit('groupUpdated', this.groupToEdit)
            this.groupToEdit = null
            this.titleIsOpen = false;
        },
        modifyBoard(adjustmentOfBoard) {
            this.$emit('boardModified', adjustmentOfBoard)
        },
        addNewCard({ newCard, group }) {
            this.groupToEdit = JSON.parse(JSON.stringify(this.groups.find(groupToCheck => groupToCheck.id === group.id)))
            this.groupToEdit.cards.push(newCard)
            this.$emit('groupUpdated', this.groupToEdit)
            this.groupToEdit = null
        },
        cardDelete(updatedGroup) {
            this.$emit('groupUpdated', updatedGroup)
        },
        openCardModal(info) {
            this.$emit('openCardDetails', info)
        },
        onOpenAllLabels(isLabelClicked) {
            console.log('isLabelOpen', isLabelClicked)
            this.isLabelOpen = isLabelClicked
        },
        saveCardToBoard({ card, group }) {
            this.groupToEdit = JSON.parse(JSON.stringify(group))
            console.log(card)
            const cardIdx = this.groupToEdit.cards.findIndex(cardToFind => cardToFind.id === card.id)
            this.groupToEdit.cards.splice(cardIdx, 1, card)
            this.$emit('groupUpdated', this.groupToEdit)
        },

        deleteGroup(groupId) {
            this.$emit('removeGroup', groupId)
        },
        close() {
            this.show = false;
            this.newGroup.title = ""
        },
        addNewGroup() {
            this.$emit('addGroup', this.newGroup)
        },
        onGroupDrop(dropResult) {
            this.boardToEdit.groups = applyDrag(this.boardToEdit.groups, dropResult)
            this.$emit('groupDnd', this.boardToEdit)
        },
        onCardDrop(groupId, dropResult) {
            console.log('groupId:', groupId);
            if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
                const newGroup = this.boardToEdit.groups.filter(p => p.id === groupId)[0]
                const groupIndex = this.boardToEdit.groups.indexOf(newGroup)
                const newColumn = JSON.parse(JSON.stringify(newGroup))
                newColumn.cards = applyDrag(newColumn.cards, dropResult)
                this.boardToEdit.groups.splice(groupIndex, 1, newColumn)
                this.$emit('groupDnd', this.boardToEdit)
            }
        },
        getCardPayload(groupId) {
            return index => {
                return this.boardToEdit.groups.filter(p => p.id === groupId)[0].cards[index]
            }
        },
        log(...params) {
            // console.log(...params)
        }
    },
    emits: ['openCardDetails', 'removeGroup', 'groupUpdated', 'addGroup', 'groupDnd', 'boardModified']

}
</script>

<style>
</style>