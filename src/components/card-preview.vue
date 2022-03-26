<template>
    <section ref="card-modal" class="card-preview cursor-pointer flex">
        <div v-if="card.labels.length && board.labels.length" class="labels">
            <div
                class="label"
                :class="openLabels"
                @click="openAllLabels"
                v-for="label in card.labels"
                :key="label"
                :style="{ 'backgroundColor': board.labels[board.labels.findIndex(labelToFind => labelToFind.id === label)].color }"
            >{{ board.labels[board.labels.findIndex(labelToFind => labelToFind.id === label)].title }}</div>
        </div>
        <div>
            <p class="card-title cursor-pointer" @click="openDetails">{{ card.title }}</p>
        </div>
        <div class="card-bar">
            <div class="card-bar-icon">
                <p>(soon...)</p>
            </div>
            <div class="card-bar-members">
                <div v-if="card.members.length && board.members.length" class="members">
                    <div
                        class="member"
                        v-for="member in card.members"
                        :key="member._id"
                    >{{ setMemberLetters(member.fullname) }}</div>
                </div>
            </div>
        </div>
        <button class="icon-sm icon-edit" @click="openMiniEdit($event)"></button>
    </section>

    <section class="mini-edit-modal-main flex" v-if="modalOpen">
        <span class="icon-xl icon-close-in-pencil-modal" @click="closeModal"></span>
        <section
            class="mini-edit-modal-second"
            style="position:fixed;"
            :style="{ top: pos.top + 'px', left: pos.left + 'px' }"
        >
            <section class="modal-edit">
                <div class="modal-card">
                    <div
                        v-if="cardToDisplay.labels.length && cardToDisplay.labels.length"
                        class="labels"
                    >
                        <div
                            class="label"
                            v-for="label in cardToDisplay.labels"
                            :key="label"
                            :style="{ 'backgroundColor': board.labels[board.labels.findIndex(labelToFind => labelToFind.id === label)].color }"
                        >{{ board.labels[board.labels.findIndex(labelToFind => labelToFind.id === label)].title }}</div>
                    </div>
                    <div>
                        <textarea
                            name="mini-edit-ta"
                            style="resize:none"
                            v-model="cardToDisplay.title"
                        ></textarea>
                    </div>
                </div>
                <div>
                    <button class="mini-edit-save" @click="saveCard">Save</button>
                </div>
            </section>
            <section class="modal-actions-btns">
                <button @click="openDetails">Open card</button>
                <button ref="labelBtn" @click="editLabels">Edit labels</button>
                <button ref="membersBtn" @click="changeMembers">Change members</button>
                <button @click="changeCover">Channge cover</button>
                <button @click="moveCard">Move</button>
                <button @click="copyCard">Copy</button>
                <button ref="datesBtn" @click="editDates">Edit dates</button>
                <button @click="deleteCard">Delete</button>
            </section>
        </section>
        <section v-if="shown">
            <!-- @boardEdit="editBoard"
           
            -->
            <component
                @boardEdit="editBoard"
                @cardEdit="showEditedCard"
                @actionsClose="closeMenu"
                :board="board"
                :card="cardToDisplay"
                :group="group"
                :pos="posOfEditor"
                :is="currModal"
            ></component>
        </section>
    </section>
</template>

<script>
import { boardService } from "../services/board-service.js";
import { Container, Draggable } from "vue3-smooth-dnd";
import { applyDrag, generateItems } from '../services/dnd-service.js';
import labelModal from "./label-modal-cmp.vue";
import memebersModal from "./memebers-modal-cmp.vue";
import datesModal from "./date-modal-cmp.vue";
// import { throws } from "assert";

export default {
    name: 'card-preview',
    props: {
        board: {
            type: Object
        },
        group: {
            type: Object
        },
        card: {
            type: Object,
            required: true,
        },
        isLabelOpen: {
            type: Boolean,
        },
    },
    components: {
        Container,
        Draggable,
        labelModal,
        memebersModal,
        datesModal,
        // throws
    },
    data() {
        return {
            currModal: null,
            shown: false,
            pos: 0,
            posOfEditor: 0,
            modalOpen: false,
            titleIsOpen: false,
            groupToEdit: {},
            cardToDisplay: JSON.parse(JSON.stringify(this.card)),
            cardToEdit: {
                title: "",
            },
            isActionsOpen: false,
            activeComponent: null,
            isLabelClicked: false,
        }
    },
    created() {
    },
    methods: {
        openTitleEdit() {
            // this.titleIsOpen = true;
        },
        editBoard(editedAttribute) {
            this.$emit('boardUpdated', editedAttribute)
        },
        changeMembers() {
            // this.modalOpen = false;
            this.posOfEditor = this.$refs['membersBtn'].getBoundingClientRect()
            this.shown = !this.shown
            this.currModal = "memebersModal"
        },
        editLabels() {
            // this.modalOpen = false;
            this.posOfEditor = this.$refs['labelBtn'].getBoundingClientRect()
            this.shown = !this.shown
            this.currModal = "labelModal"
        },
        editDates() {
            // this.modalOpen = false;
            this.posOfEditor = this.$refs['datesBtn'].getBoundingClientRect()
            this.currModal = "datesModal"
            this.shown = !this.shown
        },
        changeTitle(title) {
            this.cardToEdit = JSON.parse(JSON.stringify(this.card))
            this.cardToEdit.title = title
            this.$emit('editCard', { card: this.cardToEdit, group: this.group })
            this.titleIsOpen = false;
        },
        calcPosOfModal() {
            this.pos = this.$refs['card-modal'].getBoundingClientRect()
        },
        openMiniEdit() {
            this.calcPosOfModal()
            this.modalOpen = true;
        },
        openDetails() {
            this.modalOpen = false;
            this.shown = false
            this.$emit('openCard', { card: this.card, group: this.group })
        },

        openAllLabels() {
            this.isLabelClicked = !this.isLabelClicked
            this.$emit('openAllLabels', this.isLabelClicked)
        },
        closeModal() {
            this.modalOpen = false
        },
        deleteCard() {
            this.groupToEdit = JSON.parse(JSON.stringify(this.group))
            const cardIdx = this.groupToEdit.cards.findIndex(cardToFind => cardToFind.id === this.card.id)
            this.groupToEdit.cards.splice(cardIdx, 1)
            this.$emit('deleteCard', this.groupToEdit)
        },
        showEditedCard(card) {
            this.cardToDisplay = card
        },
        saveCard() {
            this.$emit('editCard', { card: this.cardToDisplay, group: this.group })
            this.closeModal()
        },
        setMemberLetters(fullname) {
            const firstLetters = fullname
                .split(' ')
                .map(word => word[0])
                .join('');
            return firstLetters.toUpperCase()
        },
        closeMenu() {
            this.shown = false
        }
    },
    computed: {
        openLabels() {
            return { labelOpen: this.isLabelOpen };
            // isLabelOpen = !isLabelOpen
        },
    },
    emits: ['openCard', 'editCard', 'openAllLabels', 'deleteCard','boardUpdated'],
}
</script>