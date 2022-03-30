<template>
    <div class="board-list-main">
        <board-preview
            @starredChange="onStarredChange"
            v-for="board in boards"
            :board="board"
            :key="board._id"
        ></board-preview>
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

    },
    components: {
        boardPreview,
    },
    emits: ['updateStarred']
}
</script>