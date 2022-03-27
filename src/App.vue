<template>
  <section
    class="app-main"
    :style=" board && isOnBoard  && board.backgroundPhoto ? { 'background-image': `url(${board.backgroundPhoto})`, 'background-repeat': 'no-repeat', 'background-size': 'cover' } : null"
  >
    <app-header />
    <router-view />
  </section>
</template>

<script>
import appHeader from './components/app-header.vue'
export default {
  name: 'app',
  async created() {
    await this.$store.dispatch({ type: 'loadBoards' })

  },

  methods: {
  },
  computed: {
    boards() {
      return this.$store.getters.boards
    },
    board() {
      return this.$store.getters.board
    },
    isOnBoard() {
      const { boardId } = this.$route.params
      return boardId
    }
  },
    watch: {
    "$route.params.boardId": {
      async handler(newId) {
        this.$store.dispatch({ type: 'loadBoardById', newId })
      },
      immediate: true

    }
  },
  components: {
    appHeader,
  },
}
</script>