<template>
    <section class="card-preview cursor-pointer">
        <p
            v-if="!titleIsOpen"
            class="card-title cursor-pointer"
            @click="openTitleEdit"
        >{{ card.title }}</p>
        <input
            v-clickOutside="changeTitle"
            v-if="titleIsOpen"
            v-model="cardToDisplay.title"
            type="text"
            placeholder="card.title"
            @submit.prevent="changeTitle"
        />
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
            this.titleIsOpen = true;
        },
        async changeTitle() {
            const { _id } = this.$route.params
            this.board = await boardService.getById(_id)
            const group = this.board.groups.find(group => group.id === this.groupId)
            const card = await group.cards.find(card => card.id === this.cardToDisplay.id)
            card.title = this.cardToDisplay.title
            this.$store.dispatch({ type: 'saveBoard', board: this.board })
            this.titleIsOpen = false;
        }
    },
}
</script>

<style>
</style>