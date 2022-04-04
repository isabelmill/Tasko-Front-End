<template>
  <section
    class="app-main"
    :style=" board && isOnBoard  && board.backgroundPhoto ? { 'background-image': `url(${board.backgroundPhoto})`, 'background-repeat': 'no-repeat', 'background-size': 'cover' } : null"
  >
    <app-header v-if="this.$route.name !== 'home' && this.$route.name !== 'login' && this.$route.name !== 'signup'" />
    <router-view />
  </section>
</template>

<script>
import appHeader from './components/app-header.vue'

export default {
  name: 'app',
  async created() {
    await this.$store.dispatch({ type: 'loadBoards' })
    // await this.$store.dispatch({ type: 'login', user: this.user })
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
    },
  },
  components: {
    appHeader,
  },
}
</script>