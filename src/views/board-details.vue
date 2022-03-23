<template>
  <!-- <section class="board-header">      
  </section> -->
  <section class="board-main">
      <group-list :boardId="board._id" :groups="board.groups"></group-list>
  </section>
</template>

<script>
import groupList from "../components/group-list.vue"
export default {
components:{
    groupList,
},
props:{
    board:{
        type: Object,
        required: true,
    }
},
}
</script>

<style>

</style>