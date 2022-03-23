<template>
    <section class="card-preview cursor-pointer">
        <p v-if="!titleIsOpen" class="card-title cursor-pointer" @click="openTitleEdit">{{ card.title }}</p>
        <input v-model="cardToDisplay.title" type="text" placeholder="card.title" @submit.prevent="changeTitle"> 
        </section>
</template>

<script>
import { boardService } from "../services/board-service";
export default {
    name: 'card-preview',
    props: {
        boardId:{
          type: String,
          required: true,  
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
        }
    },
    created(){
        this.cardToDisplay=this.card;
    },
    methods: {
        openTitleEdit() {
            this.titleIsOpen=true;
        },
        changeTitle(){
            this.board = boardService.getById(this.boardId)
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