<template>
    <section class="card-details-main">
        <section class="card-details-title">AIFSH[saifds[gikndflksmvb</section>
        <section class="card-details-description"></section>
        <section class="card-details-activity"></section>
        <section class="card-details-actions"></section>
    </section>
</template>

<script>
export default {
    name: 'card-details',
    props: {
        card: {
            type: Object
        },
        GroupId: {
            type: String
        }
    },
    created() {
    },
}
</script>

<style>
.card-details-main {
    /* position: fixed;
    width: 60%;
    height: 500px;
    background-color: red;
    top: 0;
    display: flex;
    justify-content: center;
    border-radius: 2px;
    margin: 48px 0 80px;
    overflow: hidden;
    width: 768px;
    z-index: 25;
    left: 30px;
    align-self: center; */
}
</style>