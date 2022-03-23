<template>
    <section class="add-card-cmp">
        <button v-if="!show" @click="show = true">
            <span class="icon-sm icon-add-dark"></span>
            <p>Add card</p>
        </button>
        <div v-clickOutside="addCard" v-if="show" class="add-new board-input">
            <input placeholder="Title" type="text" v-model="txt" />
            <button @click="addCard">Add Card</button>
            <button @click="show = false">X</button>
        </div>
    </section>
</template>

<script>
import { boardService } from '../services/board-service';
export default {
    name: "add-card",
    props: {
        id: {
            type: String
        },
    },
    data() {
        return {
            txt: "",
            show: false,
            newCard: boardService.getEmptyCard(),
        }
    },
    created() {
    },
    methods: {
        addCard() {
            this.show = false;
            this.newCard.title = this.txt;
            this.$emit('cardAdd', this.newCard)
            this.txt = "";
        },
    }, unmounted() { },
    emits: ['cardAdd']
}
</script>

<style>
</style>