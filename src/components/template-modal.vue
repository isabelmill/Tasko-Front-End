<template>
    <div class="template-boards-modal">
        <div class="template-boards-header">
            <div class="header-text-template-boards-modal">
                <h1>Templates</h1>
            </div>
            <div class="header-close-template-boards-modal" @click="closeModal">
                <span class="icon-sm icon-closed"></span>
            </div>
        </div>
        <div class="modal-template-boards-list">
            <div class="modal-template-board-list">
                <div
                    class="boards-render-modal-template"
                    @click="goToDetails(board)"
                    v-for="board in templateBoards"
                    :board="board"
                    :key="board"
                >
                    <div
                        class="board-background-template-modal"
                        :style="board.background ? { 'backgroundColor': board.background } : { 'background-image': `url(${board.backgroundThumb})` }"
                    ></div>

                    <div class="modal-template-board">{{ board.title }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        boards: {
            type: Array,
            required: true,
        },
    },
    methods: {
        closeModal() {
            this.$emit("close");
        },
        goToDetails(board) {
            this.$emit("close");
            // const duplicateBoard = JSON.parse(JSON.stringify(board))
            // delete duplicateBoard._id
            // this.$emit('duplicateTemplate', duplicateBoard)
            this.$router.push(`/board/${board._id}`)
        },
    },
    computed: {
        templateBoards() {
            return this.$store.getters.templates
        },
    },
}
</script>