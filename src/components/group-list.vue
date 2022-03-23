<!-- card preview inside group list -->
<template>
    <section @titleChange="changeTitle"  class="group-list">
        <section v-for="group in groups" :key="group.id" class="group-preview">
            <toggle-input-cmp :title="group.title" :id="group.id"></toggle-input-cmp>
            <card-preview
                v-for="card in group.cards"
                :key="card.id"
                :groupId="group.id"
                :card="card"
            ></card-preview>
        </section>
    </section>
</template>

<script>
import cardPreview from "./card-preview.vue";
import toggleInputCmp from "./toggle-input-cmp.vue";
import { boardService } from "../services/board-service.js";
export default {
    name: "group-list",
    components: {
        cardPreview,
        toggleInputCmp
    },
    props: {
        groups: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            titleIsOpen: false,
            groupToDisplay: {
                title: ""
            },
            board: null,
        };
    },
    async created() {
        const { _id } = this.$route.params
        this.board = await boardService.getById(_id)
    },
    methods: {
        changeTitle(answer) {
            console.log(answer)
            const group = this.board.groups.find(group => group.id === answer.id)
            group.title = answer.txt
            // console.log(group.title)
            this.$store.dispatch({ type: 'saveBoard', board: this.board })
            this.titleIsOpen = false;
        },
    },
    mounted() {
    },

}
</script>

<style>
</style>