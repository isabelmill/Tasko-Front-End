<!-- card preview inside group list -->
<template >
    <section class="group-list-main">
        <section v-for="group in groups" :key="group.id" class="group-preview-main">
            <toggle-input-cmp class="title" @titleChange="changeTitle" :title="group.title" :id="group.id"></toggle-input-cmp>

            <card-preview
                v-for="card in group.cards"
                :key="card.id"
                :groupId="group.id"
                :card="card"
            ></card-preview>
            <add-card-cmp @cardAdd="addNewCard" :id="group.id"></add-card-cmp>
        </section>
    </section>
</template>

<script>
import cardPreview from "./card-preview.vue";
import toggleInputCmp from "./toggle-input-cmp.vue";
import addCardCmp from "./add-card-cmp.vue";
import { boardService } from "../services/board-service.js";

export default {
    name: "group-list",
    components: {
        cardPreview,
        toggleInputCmp,
        addCardCmp
    },
    props: {
        groups: {
            type: Array
        }
    },
    data() {
        return {
            groupToEdit: null,
            titleIsOpen: false,
            show: false,
            groupToDisplay: {
                title: ""
            },
            newCard: boardService.getEmptyCard(),
        };
    },
    async created() {
        const { _id } = this.$route.params
        this.board = await boardService.getById(_id)
        this.groupsToShow = this.groups
    },
    methods: {
        changeTitle(answer) {
            const group = JSON.parse(JSON.stringify(this.board.groups.find(group => group.id === answer.id)))
            group.title = answer.txt
            this.$store.dispatch({ type: 'saveBoard', board: this.board })
            this.titleIsOpen = false;
        },
        close() {
            this.show = false;
        },
        addNewCard({txt, id}) {
            this.groupToEdit = JSON.parse(JSON.stringify(this.board.groups.find(group => group.id === id)))
            this.newCard.title = txt
            this.groupToEdit.cards.push(this.newCard)
            // this.groupsToShow = this.board.groups
            this.$emit('groupUpdated', this.groupToEdit)
            // this.$store.dispatch({ type: 'saveBoard', board: this.board })
            this.newCard = boardService.getEmptyCard()
        }
    },
    mounted() {
    },

}
</script>

<style>
</style>