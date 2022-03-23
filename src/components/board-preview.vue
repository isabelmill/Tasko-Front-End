<template>
<div @click="goToDetails" class="board-preview-main">
<h1>{{board.title}}</h1>
</div>
</template>

<script>
export default {
name: 'board-preview',
    props: {
        board: Object,
    },
    methods: {
        goToDetails() {
            this.$router.push(`/board/${this.board._id}`)
        },
    },
}
</script>