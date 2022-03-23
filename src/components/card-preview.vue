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
import { boardService } from "../services/board-service";
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
            cardToDisplay: null,
            _id: null,
        }
    },
    created() {
        this._id = this.$route.params
        this.cardToDisplay = this.card;
    },
    methods: {
        openTitleEdit() {
            this.titleIsOpen = true;
        },
        changeTitle() {
            const test = boardService.getById(this._id)
            .then(board=> console.log(board))
            // console.log(test)
            this.board = boardService.getById(this._id)
                .then(board => {
                    board.groups.find(group => group._id === this.groupId)
                })
                .then(group => {
                    group.cards.find(card => card._id === this.cardToDisplay._id)
                    })
                .then(card => {
                    card.title = this.cardToDisplay.title
                    this.$store.dispatch({
                        type: 'saveBoard',
                        board: this.board,
                    })
                })
            this.titleIsOpen = false;
        }
    },
}
</script>

<style>
</style>