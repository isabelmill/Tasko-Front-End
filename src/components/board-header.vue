<template>
    <section class="board-header-main">
        <nav>
            <button>Board</button>
            <p class="board-name">Board Name</p>
            <button @click="boardStared">
                <div :class="updateStar"></div>
            </button>
            <div class="invite">
                <div class="icon-sm icon-add-member"></div> <p>Invite</p>
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
    data() {
        return {
            isStared: false,
        }
    },
    methods: {
        boardStared() {
            this.isStared = !this.isStared
            // console.log('this.isStared', this.isStared)
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