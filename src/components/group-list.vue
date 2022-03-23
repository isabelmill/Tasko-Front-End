<!-- card preview inside group list -->
<template>
  <section class="group-list">
      <section v-for="group in groups" :key="group._id" class="group-preview">
          <card-preview v-for="card in group.cards" :key="card._id" :card="card" :boardId="this.boardId"></card-preview>
      </section>
  </section>
</template>

<script>
import cardPreview from "./card-preview.vue"
export default {
name: 'group-list',
components:{
    cardPreview,
},
props:{
    boardId:{
        type: String,
        required: true,
    },
    groups:{
        type: Array,
        required: true,
    }
},
data(){
    return{}
},
}
</script>

<style>

</style>