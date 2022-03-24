<template>
    <section
        v-if="board"
        class="board-header-main"
        :style="{ 'backgroundColor': board.background }"
    >
        <nav>
            <button>Board</button>
            <div class="board-name-edit">
                <p
                 :style="updateWidth"
                    class="board-name"
                    v-if="!titleIsOpen"
                    @click="openTitleEdit"
                >{{ board.title }}</p>
                <input
                    maxlength="512"
                    v-clickOutside="changeTitle"
                    v-if="titleIsOpen"
                    v-model="boardToEdit.title"
                    type="text"
                    @submit.prevent="changeBoardTitle"
                    @keyup="calculateTxtLen"
                    :style="updateWidth"
                />
            </div>

            <button @click="boardStared">
                <div :class="updateStar"></div>
            </button>
            <div class="invite">
                <div class="icon-sm icon-add-member"></div>
                <p>Invite</p>
            </div>
        </nav>
        <nav>
            <button>
                <div class="icon-sm icon-overflow-menu-horizontal"></div>
                <p>Show menu</p>
            </button>
        </nav>
    </section>
</template>

<script>
export default {
    props: {
        board: Object,
    },
    data() {
        return {
            isStared: false,
            titleIsOpen: false,
            boardToEdit: JSON.parse(JSON.stringify(this.board)),
            titleLength: 0

        }
    },
    created() {
        this.calculateTxtLen()
    },
    methods: {
        boardStared() {
            this.isStared = !this.isStared
            this.boardToEdit.isStarred = !this.boardToEdit.isStarred
            this.$store.dispatch({ type: 'saveBoard', board: this.boardToEdit })
        },
        openTitleEdit() {
            this.titleIsOpen = true;
        },
        changeTitle() {
            if (!this.boardToEdit.title) return
            this.$store.dispatch({ type: 'saveBoard', board: this.boardToEdit })
            this.titleIsOpen = false;
        },
        calculateTxtLen() {
            this.titleLength = this.boardToEdit.title.length
            console.log(this.updateWidth)
        }
    },
    computed: {
        updateStar() {
            if ( this.board.isStarred) return `icon-sm icon-starred`
            else return `icon-sm icon-star`
        },
        updateWidth() {
            return `width: ${24 + (this.titleLength * 8) + 'px'};`
        }

    }
}
</script>