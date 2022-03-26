<template>
    <div class="starred-boards-modal">
        <div class="starred-boards-header">
            <div class="header-text-starred-boards-modal">
                <h1>Starred boards</h1>
            </div>
            <div class="header-close-starred-boards-modal" @click="closeModal">
                <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M5.58579 7L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683418 0.292893 0.292893C0.683418 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7 5.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893C14.0976 0.683418 14.0976 1.31658 13.7071 1.70711L8.41421 7L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L7 8.41421L1.70711 13.7071C1.31658 14.0976 0.683418 14.0976 0.292893 13.7071C-0.0976311 13.3166 -0.0976311 12.6834 0.292893 12.2929L5.58579 7Z"
                        fill="currentColor"
                    />
                </svg>
            </div>
        </div>
        <div class="modal-starred-boards-list">
            <div class="modal-starred-board-list">
                <div
                    class="boards-render-modal-starred"
                    @click="goToDetails(board)"
                    v-for="board in boards"
                    :board="board"
                    :key="board"
                >
                    <div
                        v-if="board.isStarred"
                        class="board-background-starred-modal"
                        :style="{ 'backgroundColor': board.background }"
                    ></div>

                    <div class="modal-starred-board" v-if="board.isStarred">{{ board.title }}</div>
                </div>
            </div>
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
        goToDetails(board) {
            this.$emit("close");
            this.$router.push(`/board/${board._id}`)
        },
    },
}
</script>