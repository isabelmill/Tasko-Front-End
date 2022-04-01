<template>
    <div class="search-boards-modal">
        <div class="search-boards-header">
            <div class="header-text-search-boards-modal">
                <h1>Boards</h1>
            </div>
            <div class="header-close-search-boards-modal" @click="closeModal">
                <span class="icon-sm icon-closed"></span>
            </div>
        </div>
        <div class="modal-search-boards-list">
            <div
                class="boards-render-modal-search"
                @click="goToDetails(board)"
                v-for="board in boards"
                :key="board._id"
            >
                <div
                    class="board-background-search-modal"
                    :style="board.background ? { 'backgroundColor': board.background } : { 'background-image': `url(${board.backgroundThumb})` }"
                ></div>

                <div class="modal-search-board">{{ board.title }}</div>
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
            this.$router.push(`/board/${board._id}`)
        },
    },
}
</script>