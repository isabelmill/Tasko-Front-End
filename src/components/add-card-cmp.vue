<template>
    <section class="add-card-cmp">
        <button v-if="!show" @click="show = true">+ Add card</button>
        <div v-clickOutside="addCard" v-if="show" class="add-new board-input">
            <input placeholder="Title" type="text" v-model="txt" />
            <button @click="addCard">Add Card</button>
            <button @click="show = false">X</button>
        </div>
    </section>
</template>

<script>
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
        }
    },
    created() {
    },
    methods: {
        addCard() {
            this.show = false;
            this.$emit('cardAdd', { txt: this.txt, id: this.id })
            this.txt="";
        },
    },unmounted(){},
    emits: ['cardAdd']
}
</script>

<style>
</style>