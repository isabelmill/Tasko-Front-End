<template>
    <section class="app-header-main">
        <router-link class="logo" to="/board">Mello</router-link>
        <router-link class="link" to="/">Workspaces</router-link>
        <router-link class="link" to="/">Recent</router-link>
        <router-link class="link" to="/">Starred</router-link>
        <router-link class="link" to="/">Templates</router-link>
        <router-link class="link" to="/">Create</router-link>
        <!-- <button class="icon-btn"><font-awesome-icon icon="fa-regular fa-plus-large" /></button> -->
        <button class="icon-btn">+</button>
        <!-- search goes here  -->
        <search />
    </section>
</template>

<script>
import search from "./search.vue" 

export default {
  name: 'app-header',
  components: {
    search,
  },
}
</script>
