<template>
    <section class="card-preview cursor-pointer">
        <p v-if="!titleIsOpen" class="card-title cursor-pointer" @click="openTitleEdit">{{ card.title }}</p>
        <input v-if="titleIsOpen" v-model="cardToDisplay.title" type="text" placeholder="card.title" @submit.prevent="changeTitle"> 
        </section>
</template>

<script>
import { boardService } from "../services/board-service";
export default {
    name: 'card-preview',
    props: {
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
            _id:null,
        }
    },
    created(){
        this._id = this.$route.params
        this.cardToDisplay=this.card;
    },
    methods: {
        openTitleEdit() {
            this.titleIsOpen=true;
        },
        changeTitle(){
            this.
            this.board = boardService.getById(this._id)
            .then(board =>{
                board.groups.cards.find(card => card._id === this.cardToDisplay._id)
            })
            .then(card=> {
                card.title = this.cardToDisplay.title
                this.$store.dispatch({
                    type: 'saveBoard',
                    board: this.board,
                })
                })
            this.titleIsOpen=false;
        }
    },
}
</script>

<style>
</style>