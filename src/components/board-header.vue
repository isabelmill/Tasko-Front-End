<template>
    <section v-if="board" class="board-header-main">
        <nav>
            <button>Board</button>
            <div class="board-name-edit">
                <p class="board-name" v-if="!titleIsOpen" @click="openTitleEdit">{{ board.title }}</p>
                <input
                    maxlength="512"
                    v-clickOutside="changeTitle"
                    v-if="titleIsOpen"
                    v-model="board.title"
                    type="text"
                    @submit.prevent="changeBoardTitle"
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
        }
    },
    methods: {
        boardStared() {
            this.isStared = !this.isStared
            // console.log('this.isStared', this.isStared)
        },
        openTitleEdit() {
            this.titleIsOpen = true;
        },
        changeTitle() {
            if(!this.board.title) return
            console.log('board.title:', this.board.title);
            this.$store.dispatch({ type: 'saveBoard', board: this.board })
            this.titleIsOpen = false;
        }
    },
    computed: {
        updateStar() {
            if (this.isStared) return `icon-sm icon-starred`
            else return `icon-sm icon-star`
        },
    }
}
</script>