
<template>
    <div class="starred-boards-modal">
        <div class="starred-boards-header">
            <div class="header-text-starred-boards-modal">
                <h1>Recent boards</h1>
            </div>
            <div class="header-close-starred-boards-modal" @click="closeModal">
                <span class="icon-sm icon-closed"></span>
            </div>
        </div>
        <div class="modal-starred-boards-list">
            <div class="modal-starred-board-list">
                <div
                    class="boards-render-modal-starred"
                    @click="goToDetails(board)"
                    v-for="board in recentBoardsForDisplay"
                    :board="board"
                    :key="board"
                >
                    <div
                        class="board-background-starred-modal"
                        :style="board.background ? { 'backgroundColor': board.background } : { 'background-image': `url(${board.backgroundThumb})` }"
                    ></div>

                    <div class="modal-starred-board">{{ board.title }}</div>
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
            this.$router.push(`/board/${board._id}`)
        },
    },
    computed: {
        recentBoardsForDisplay() {
            let newBoards = []
            newBoards = JSON.parse(JSON.stringify(this.boards))
            newBoards.sort(function (a, b) {
                return b.lastTimeWatched - a.lastTimeWatched;
            });
            return newBoards
        },
    },

}
</script>