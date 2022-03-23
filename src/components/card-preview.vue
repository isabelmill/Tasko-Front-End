<template>
    <section class="card-preview cursor-pointer flex" @click="openDetails">
        <p class="card-title cursor-pointer">{{ card.title }}</p>
        <button class="mini-edit" @click="openMiniEdit($event)">edit</button>
    </section>
    <section style="position:fixed" :style="{top: distanceY+'px',left:distanceX+'px'}" v-clickOutside="closeModal" v-if="modalOpen" class="mini-edit-modal flex">
        <textarea name="mini-edit-ta" style="resize:none" v-model="cardToDisplay.title"></textarea>
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
            distanceY:0,
            distanceX:0,
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
            this.distanceX= ev.clientX-65;
            this.distanceY= ev.clientY+10;
            console.log(this.distanceY,this.distanceX)
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