<template>
  <section class="app-main">
    <app-header />
    <router-view />
  </section>
</template>

<script>
import appHeader from './components/app-header.vue'
export default {
  name: 'app',
  methods: {
  },
  components: {
    appHeader,
  },
}
</script>