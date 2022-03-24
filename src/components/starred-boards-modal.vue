<template>
    <div class="starred-boards-modal">
        <div class="starred-boards-header">
            <h1>Starred boards</h1>
            <button @click="closeModal">X</button>
        </div>
        <div class="modal-starred-boards-list">
            <ul v-for="board in boards" :board="board" :key="board">
                <li v-if="board.isStarred">{{board.title}}</li>
            </ul>
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
    },
}
</script>