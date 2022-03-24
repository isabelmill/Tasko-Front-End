<!-- card preview inside group list -->
<template >
    <section class="group-list-main">
        <section v-for="group in groups" :key="group.id" class="group-preview-main">
            <toggle-input-cmp
                class="title"
                @groupDelete="deleteGroup"
                @titleChange="changeTitle"
                :title="group.title"
                :id="group.id"
            ></toggle-input-cmp>
            <section class="scroller-group">
                <card-preview
                @openCard="openCardModal"
                    v-for="card in group.cards"
                    :key="card.id"
                    :groupId="group.id"
                    :card="card"
                ></card-preview>
            </section>
            <add-card-cmp @cardAdd="addNewCard" :groupId="group.id"></add-card-cmp>
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
        changeTitle({ txt, id }) {
            this.groupToEdit = JSON.parse(JSON.stringify(this.groups.find(group => group.id === id)))
            this.groupToEdit.title = txt
            this.$emit('groupUpdated', this.groupToEdit)
            this.groupToEdit = null
            this.titleIsOpen = false;
        },
        close() {
            this.show = false;
        },
        addNewCard({ newCard, groupId }) {
            this.groupToEdit = JSON.parse(JSON.stringify(this.groups.find(group => group.id === groupId)))
            this.groupToEdit.cards.push(newCard)
            this.$emit('groupUpdated', this.groupToEdit)
            this.groupToEdit = null
        },
        openCardModal(info) {
            this.$emit('openCardDetails', info)
        },
        deleteGroup(groupId){
            this.$emit('removeGroup',groupId)
        }
    },
    mounted() {
    },
    emits: ['openCardDetails','removeGroup']

}
</script>

<style>
</style>