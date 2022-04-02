<template>
    <div
        class="board-preview-main"
        @click.stop.prevent="goToDetails()"
        :style="board.background ? { 'backgroundColor': board.background } : { 'background-image': `linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)) , url(${board.backgroundThumb})`, 'background-size': 'cover' }"
    >
        <h1>{{ board.title }}</h1>
        <span
            v-if="board.isStarred"
            class="icon-sm icon-starred-boards"
            @click.stop.prevent="boardStared"
        ></span>
    </div>
</template>

<script>

export default {
    name: 'board-preview',
    props: {
        board: Object,
    },
    data() {
        return {
            boardToEdit: null,
            isStarred: false,
        }
    },
    methods: {
        goToDetails() {
            // if (this.board.isTemplate) {
            //     const duplicateBoard = JSON.parse(JSON.stringify(this.board))
            //     delete duplicateBoard._id
            //     this.$emit('duplicateTemplate', duplicateBoard)
            //     // this.$router.push(`/board`)
            //     return
            // }
            this.$router.push(`/board/${this.board._id}`)
            this.$emit('viewedBoard', this.board)
        },
        boardStared() {
            this.isStarred = !this.isStarred
            const starredBoard = JSON.parse(JSON.stringify(this.board))
            starredBoard.isStarred = this.isStarred
            this.$emit('starredChange', starredBoard)
        },
    },
    emits: ['starredChange', 'viewedBoard', 'duplicateTemplate']
}
</script>