<template>
    <section class="card-details-main">
            <section class="card-details-title"></section>
            <section class="card-details-description"></section>
            <section class="card-details-activity"></section>
            <section class="card-details-actions"></section>
    </section>
</template>

<script>
export default {
    name: 'card-details',
    props:{
        card:{
            type: Object
        },
        GroupId:{
            type: String
        }
    },
    created() {
    },
}
</script>

<style>
</style>