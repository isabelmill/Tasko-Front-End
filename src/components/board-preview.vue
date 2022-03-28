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
            // console.log('example:',this.boardToEdit);
            this.$router.push(`/board/${this.board._id}`)
        },
    },
}
</script>