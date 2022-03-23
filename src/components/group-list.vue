<!-- card preview inside group list -->
<template >
    <section class="group-list-main">
        <section v-for="group in groups" :key="group.id" class="group-preview-main">
            <toggle-input-cmp
                class="title"
                @titleChange="changeTitle"
                :title="group.title"
                :id="group.id"
            ></toggle-input-cmp>

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
        };
    },
    created() {
    },
    methods: {
        changeTitle(editedCard) {
            const group = JSON.parse(JSON.stringify(this.board.groups.find(group => group.id === answer.id)))
            group.title = answer.txt
            this.$store.dispatch({ type: 'saveBoard', board: this.board })
            this.titleIsOpen = false;
        },
        close() {
            this.show = false;
        },
        addNewCard(newCard) {
            this.groupToEdit = JSON.parse(JSON.stringify(this.groups.find(group => group.id === id)))
            this.groupToEdit.cards.push(newCard)
            this.$emit('groupUpdated', this.groupToEdit)
        }
    },
    mounted() {
    },

}
</script>

<style>
</style>