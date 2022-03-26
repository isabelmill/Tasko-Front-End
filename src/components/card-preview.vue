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
                <p>(soon...)</p>
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
                    <div v-if="card.labels.length && board.labels.length" class="labels">
                        <div
                            class="label"
                            v-for="label in card.labels"
                            :key="label"
                            :style="{ 'backgroundColor': board.labels[board.labels.findIndex(labelToFind => labelToFind.id === label)].color }"
                        >{{ board.labels[board.labels.findIndex(labelToFind => labelToFind.id === label)].title }}</div>
                    </div>
                    <div>
                        <textarea name="mini-edit-ta" style="resize:none" v-model="card.title"></textarea>
                    </div>
                </div>
                <div>
                    <button class="mini-edit-save" @click="saveCard">Save</button>
                </div>
            </section>
            <section class="modal-actions-btns">
                <button @click="openDetails">Open card</button>
                <button @click="editLabels">Edit labels</button>
                <button @click="changeMembers">Change members</button>
                <button @click="changeCover">Channge cover</button>
                <button @click="moveCard">Move</button>
                <button @click="copyCard">Copy</button>
                <button @click="editDates">Edit dates</button>
                <button @click="deleteCard">Delete</button>
            </section>
            <section class="actions-modal">
                <component v-if="isActionsOpen" :card="card" :is="activeComponent"></component>
            </section>
        </section>
    </section>
</template>

<script>
import { boardService } from "../services/board-service.js";
import { Container, Draggable } from "vue3-smooth-dnd";
import { applyDrag, generateItems } from '../services/dnd-service.js';

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
    },
    data() {
        return {
            pos: 0,
            modalOpen: false,
            titleIsOpen: false,
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
            this.$emit('openCard', { card: this.card, group: this.group })
        },
        openAllLabels() {
            this.isLabelClicked = !this.isLabelClicked
            this.$emit('openAllLabels', this.isLabelClicked)
        },
        closeModal() {
            this.modalOpen = false
        },
        saveCard() {
        },
    },
    computed: {
        openLabels() {
            return { labelOpen: this.isLabelOpen };
            // isLabelOpen = !isLabelOpen
        }
    },
    emits: ['openCard', 'editCard', 'openAllLabels'],
}
</script>