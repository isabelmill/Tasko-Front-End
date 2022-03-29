<template>
    <section class="add-card-cmp">
        <button class="btn-add-card-out" v-if="!show" @click.stop.prevent="show = true">
            <span class="icon-sm icon-add-gray"></span>
            <p>Add a card</p>
        </button>

        <div v-clickOutside="addCard" v-if="show" class="add-new-card-input">
            <div class="txt-box">
                <textarea
                    v-focus
                    @keydown.enter="addCard"
                    placeholder="Enter a title for this card..."
                    type="text"
                    v-model="txt"
                />
            </div>
            <div class="btn-card-add">
                <button class="btn-add-card-in" @click.stop.prevent="addCard">Add card</button>
                <span class="icon-lg icon-close-close" @click.stop.prevent="show = false"></span>
            </div>
        </div>
    </section>
</template>

<script>
import { boardService } from '../services/board-service';
export default {
    name: "add-card",
    props: {
        group: {
            type: Object,
        }
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
            if (!this.txt) return
            this.newCard.title = this.txt;
            this.$emit('cardAdd', { newCard: this.newCard, group: this.group })
            this.txt = "";
            this.newCard = boardService.getEmptyCard()
        },
    }, unmounted() { },
    emits: ['cardAdd']
}
</script>

<style>
</style>


