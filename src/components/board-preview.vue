<template>
    <div
        class="board-preview-main"
        :style="board.background ? { 'backgroundColor': board.background } : { 'background-image': `url(${board.backgroundPhoto})` }"
    >
        <h1 @click.stop.prevent="goToDetails()">{{ board.title }}</h1>
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
            console.log('this.board._id:', this.board._id);
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
    emits: ['starredChange', 'viewedBoard']
}
</script>