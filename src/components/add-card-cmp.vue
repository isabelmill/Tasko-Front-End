<template>
    <section class="add-card-cmp">
        <button class="btn-add-card-out" v-if="!show" @click="show = true">
            <span class="icon-sm icon-add-gray"></span>
            <p>Add card</p>
        </button>

        <div v-clickOutside="addCard" v-if="show" class="add-new-card-input">
            <textarea
                v-focus
                @keydown.enter="addCard"
                placeholder="Enter a title for this card..."
                type="text"
                v-model="txt"
            />
            <div>
                <button class="btn-add-card-in" @click="addCard">Add card</button>
                <span class="icon-lg icon-close" @click="show = false"></span>
            </div>
        </div>
    </section>
</template>

<script>
import { boardService } from '../services/board-service';
export default {
    name: "add-card",
    props: {
        groupId: {
            type: String,
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
            this.$emit('cardAdd', { newCard: this.newCard, groupId: this.groupId })

            this.txt = "";
        },
    }, unmounted() { },
    emits: ['cardAdd']
}
</script>

<style>
</style>


