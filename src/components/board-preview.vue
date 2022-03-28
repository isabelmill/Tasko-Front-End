<template>
    <div class="board-preview-main">
        <h1 @click.stop.prevent="goToDetails()">{{ board.title }}</h1>
        <span class="icon-sm icon-starred-boards"></span>
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
        }
    },
    methods: {
        goToDetails() {
            this.boardToEdit = JSON.parse(JSON.stringify(this.board))
            this.boardToEdit.lastTimeWatched = Date.now()
            // console.log('example:',this.boardToEdit);
            this.$emit('updateBoard', this.boardToEdit)
            this.$router.push(`/board/${this.board._id}`)
        },
    },
}
</script>