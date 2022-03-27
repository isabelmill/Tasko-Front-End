<template>
  <section class="app-main"  >
<!-- :style="{'background-image': 'url(https://images.unsplash.com/photo-1456677698485-dceeec22c7fc?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max)', 'background-repeat': 'no-repeat','background-size': 'cover'}" -->
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
  components: {
    appHeader,
  },
}
</script>