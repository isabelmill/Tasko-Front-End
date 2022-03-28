<template>
    <div class="board-preview-main">
        <h1 @click="goToDetails()">{{ board.title }}</h1>
        <!-- <div v-if="border.isStarred"> -->
            <span class="icon-sm icon-starred-boards"></span>
        <!-- </div> -->
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