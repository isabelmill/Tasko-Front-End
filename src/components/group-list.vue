<!-- card preview inside group list -->
<template>
    <section class="group-list">
        <section v-for="group in groups" :key="group.id" class="group-preview">
            <p
                v-if="!titleIsOpen"
                class="group-title cursor-pointer"
                @click="openTitleEdit(group.id)"
            >{{ group.title }}</p>
            <input
                v-clickOutside="changeTitle"
                v-if="titleIsOpen"
                v-model="groupToDisplay.title"
                type="text"
                placeholder="group.title"
                @submit.prevent="changeTitle"
            />
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
import { boardService } from "../services/board-service.js";
export default {
    name: "group-list",
    components: {
        cardPreview,
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
            groupToDisplay: null,
            board: null,
            groupId: null,
        };
    },
    created() {
        const { _id } = this.$route.params
        this.board = boardService.getById(_id)
    },
    methods: {
        openTitleEdit(id) {
            this.groupId = id
            this.titleIsOpen = true;
            this.groupToDisplay = this.board.groups.find(group => group.id === this.groupId)
        },
         changeTitle() {
            this.$store.dispatch({ type: 'saveBoard', board: this.board })
            this.titleIsOpen = false;
        }
    },
}
</script>

<style>
</style>