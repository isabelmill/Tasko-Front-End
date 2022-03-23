<!-- card preview inside group list -->
<template>
    <section class="group-list">
        <section v-for="group in groups" :key="group._id" class="group-preview">
            {{group.title}}
            <card-preview v-for="card in group.cards" :key="card._id" :card="card"></card-preview>
        </section>
    </section>
</template>

<script>
import cardPreview from "./card-preview.vue"
export default {
    name: 'group-list',
    components: {
        cardPreview,
    },
    props: {
        groups: {
            type: Array,
            required: true,
        }
    },
    data() {
        return {
            // cards: null,
            // groups: null,
        }
    },
    created() {
        // this.cards = this.group.cards
        // console.log(this.group.cards)
    },
}
</script>

<style>
</style>