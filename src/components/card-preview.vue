<template>
    <section class="card-preview cursor-pointer flex">
        <div v-if="card.labels.length && board.labels.length" class="labels">
            <div
                class="label"
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
    <section
        style="position:fixed"
        :style="{top: distanceY + 'px', left: distanceX + 'px' }"
        v-clickOutside="closeModal"
        v-if="modalOpen"
        class="mini-edit-modal flex"
    >
        <section class="mini-edit-main">
            <div class="card-modal-edit">
                <div>
                    <textarea name="mini-edit-ta" style="resize:none" v-model="card.title"></textarea>
                </div>
            </div>
            <button class="mini-edit-save" @click="saveCard">Save</button>
        </section>
        <section class="mini-edit-actions">
            <button class="mini-edit-btn" @click="openDetails">Open card</button>
            <button class="mini-edit-btn" @click="editLabels">Edit labels</button>
            <button class="mini-edit-btn" @click="changeMembers">Change members</button>
            <button class="mini-edit-btn" @click="changeCover">Channge cover</button>
            <button class="mini-edit-btn" @click="moveCard">Move</button>
            <button class="mini-edit-btn" @click="copyCard">Copy</button>
            <button class="mini-edit-btn" @click="editDates">Edit dates</button>
            <button class="mini-edit-btn" @click="deleteCard">Delete</button>
        </section>
        <section class="actions-modal">
            <component v-if="isActionsOpen" :card="card" :is="activeComponent"></component>
        </section>
    </section>
</template>

<script>
import { boardService } from "../services/board-service.js";
import { Container, Draggable } from "vue3-smooth-dnd";
import { applyDrag, generateItems } from '../services/dnd-service.js'

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
    },
    components: {
        Container,
        Draggable,
    },
    data() {
        return {
            distanceY: 0,
            distanceX: 0,
            modalOpen: false,
            titleIsOpen: false,
            cardToEdit: {
                title: "",
            },
            isActionsOpen: false,
            activeComponent: null,
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
        openMiniEdit(ev) {


            //To edit quick modal edit position//
            this.distanceX = ev.clientX - 65;
            this.distanceY = ev.clientY + 10;
            this.modalOpen = true;
        },
        openDetails() {
            this.$emit('openCard', { card: this.card, group: this.group })
        },
        closeModal() {
            this.modalOpen = false
        },
        saveCard() {
        },
    },
    emits: ['openCard', 'editCard'],
}
</script>

<style>
/* TO ADD TO SCSS!!!!!!!!! */
/* .mini-edit-main {
    display: flex;
    flex-direction: column;
}

.mini-edit-actions {
    display: flex;
    flex-direction: column;
}

.mini-edit-btn {
    background: #0009;
    border-radius: 3px;
    clear: both;
    color: #e6e6e6;
    display: block;
    float: left;
    margin: 0 0 4px 8px;
    padding: 6px 12px 6px 8px;
    text-decoration: none;
    transition: transform 85ms ease-in;
    opacity: 60%;
}
.mini-edit-modal {
    display: flex;
    flex-direction: row;
    position: fixed;
    width: rem(304px);
    top: rem(184px);
    left: rem(650px);
    color: #172b4d;
    font-size: rem(14px);
    background-color: #ffffff;
    border-radius: rem(3px);
    box-shadow: 0 8px 16px -4px rgb(9 30 66 / 25%), 0 0 0 1px rgb(9 30 66 / 8%);
    box-sizing: border-box;
    outline: 0;
    overflow: hidden;
    gap: 20px;
    z-index: 20;
}
.card-title {
    width: 230px;
} */
</style>