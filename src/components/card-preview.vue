<template>
    <section class="card-preview cursor-pointer flex" @click="openDetails">
        <p class="card-title cursor-pointer">{{ card.title }}</p>
        <button class="icon-sm icon-edit" @click="openMiniEdit($event)"></button>
    </section>
    <section
        style="position:fixed"
        :style="{ top: distanceY + 'px', left: distanceX + 'px' }"
        v-clickOutside="closeModal"
        v-if="modalOpen"
        class="mini-edit-modal flex"
    >
        <textarea name="mini-edit-ta" style="resize:none" v-model="cardToDisplay.title"></textarea>
        <button class="mini-edit-card-details" @click="openDetails">Open card</button>
        <button class="mini-edit-labels" @click="editLabels">Edit labels</button>
        <button class="mini-edit-members" @click="openDetails">Change members</button>
        <button class="mini-edit-cover" @click="openDetails">Channge cover</button>
        <button class="mini-edit-move" @click="openDetails">Move</button>
        <button class="mini-edit-copy" @click="openDetails">Copy</button>
        <button class="mini-edit-dates" @click="openDetails">Edit dates</button>
        <button class="mini-edit-delete" @click="openDetails">Delete</button>

        <button class="mini-edit-save" @click="saveCard"></button>
    </section>
</template>

<script>
import { boardService } from "../services/board-service.js";
export default {
    name: 'card-preview',
    props: {
        groupId: {
            type: String
        },
        card: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            distanceY: 0,
            distanceX: 0,
            modalOpen: false,
            board: null,
            titleIsOpen: false,
            cardToDisplay: {
                title: "",
            },
        }
    },
    created() {
        this.cardToDisplay = this.card;
    },
    methods: {
        openTitleEdit() {
            // this.titleIsOpen = true;
        },
        async changeTitle() {
            const { _id } = this.$route.params
            this.board = await boardService.getById(_id)
            const group = this.board.groups.find(group => group.id === this.groupId)
            const card = await group.cards.find(card => card.id === this.cardToDisplay.id)
            card.title = this.cardToDisplay.title
            this.$store.dispatch({ type: 'saveBoard', board: this.board })
            this.titleIsOpen = false;
        },
        openMiniEdit(ev) {
            this.distanceX = ev.clientX - 65;
            this.distanceY = ev.clientY + 10;
            this.modalOpen = true;
        },
        openDetails() {
            // this.$router.push('/card/')
        },
        closeModal() {
            this.modalOpen = false
        },
        saveCard() {

        },
    },
}
</script>

<style>
</style>