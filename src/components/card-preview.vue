<template>
    <section class="card-preview">
        <p v-if="!titleIsOpen" class="card-title" @click="openTitleEdit">{{ card.title }}</p>
        <input v-model="cardToDisplay.title" type="text" placeholder="card.title" @submit.prevent="changeTitle"> 
        </section>
</template>

<script>
export default {
    name: 'card-preview',
    props: {
        card: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            titleIsOpen: false,
            cardToDisplay: null,
        }
    },
    created(){
        this.cardToDisplay=this.card;
    },
    methods: {
        openTitleEdit() {
            this.titleIsOpen=true;
        },
        changeTitle(){
            
            this.titleIsOpen=false;
        }
    },
}
</script>

<style>
</style>