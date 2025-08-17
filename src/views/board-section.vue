<template>
  <div class="border-list">
    <div class="header" v-if="title">
      <span v-if="icon" :class="`icon-lg ${icon}`"></span>
      <p>{{ title }}</p>
    </div>

    <div v-if="boards && boards.length">
      <div
        class="boards-render"
        v-for="board in boards"
        :key="board._id"
        @click="goToDetails(board)"
      >
        <div
          class="board-background"
          :style="boardStyle(board)"
        ></div>
        <div class="board-title">{{ board.title }}</div>
        <span
          v-if="showStar && board.isStarred"
          class="icon-sm icon-star-home-board"
        ></span>
      </div>
    </div>

    <p v-else class="no-boards">No boards to display</p>
  </div>
</template>

<script>
export default {
  name: 'BoardSection',
  props: {
    title: { type: String, default: '' },
    icon: { type: String, default: '' },
    boards: { type: Array, required: true },
    showStar: { type: Boolean, default: false } // optional for home starred boards
  },
  methods: {
    goToDetails(board) {
      this.$emit('goToDetails', board)
    },
    boardStyle(board) {
      return board.background
        ? { backgroundColor: board.background }
        : board.backgroundPhoto
        ? { backgroundImage: `url(${board.backgroundPhoto})` }
        : {}
    }
  }
}
</script>

<style scoped>
.border-list {
  margin-bottom: 1.5rem;
}
.header {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}
.header p {
  margin-left: 0.5rem;
  font-weight: bold;
}
.boards-render {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 0.5rem;
}
.board-background {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  margin-right: 0.5rem;
  background-size: cover;
  background-position: center;
}
.board-title {
  font-size: 0.9rem;
  flex-grow: 1;
}
.no-boards {
  font-size: 0.8rem;
  color: #888;
}
</style>
