<template>
    <div class="board-preview-main">
        <h1 @click="goToDetails()">{{ board.title }}</h1>
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
        }
    },
    methods: {
        goToDetails() {
            this.$router.push(`/board/${this.board._id}`)
        },
    },
}
</script>