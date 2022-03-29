<template>
    <div class="board-list-main">
        <board-preview
            @starredChange="onStarredChange"
            @viewedBoard="onUpdateRecentlyViewed"
            v-for="board in boards"
            :board="board"
            :key="board._id"
        />
    </div>
</template>

<script>
import boardPreview from '../components/board-preview.vue'

export default {
    props: {
        boards: {
            type: Array,
            required: true,
        },
    },
    methods: {
        onStarredChange(boardStarred) {
            this.$emit('updateStarred', boardStarred)
        },
        onUpdateRecentlyViewed(board) {
            this.$emit('updateRecentlyViewed', board)
        }
    },
    components: {
        boardPreview,
    },
    emits: ['updateStarred', 'updateRecentlyViewed']
}
</script>