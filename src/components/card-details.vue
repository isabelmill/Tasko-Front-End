<template>
    <section class="card-details-main flex">
        <section class="card-details-title flex">
            <p>{{ card.title }}</p>
            <button class="exit-btn" @click="closeModal">X</button>
        </section>
        <section class="card-details-description"></section>
        <section class="card-details-activity"></section>
        <section class="card-details-actions flex">
            <button class="card-details-btn" @click="openDetails">Open card</button>
            <button class="card-details-btn" @click="editLabels">Edit labels</button>
            <button class="card-details-btn" @click="changeMembers">Change members</button>
            <button class="card-details-btn" @click="changeCover">Channge cover</button>
            <button class="card-details-btn" @click="moveCard">Move</button>
            <button class="card-details-btn" @click="copyCard">Copy</button>
            <button class="card-details-btn" @click="editDates">Edit dates</button>
            <button class="card-details-btn" @click="deleteCard">Delete</button>
        </section>
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
    methods: {
        closeModal() {
            this.$emit('closeDialog')
        },
    }
}
</script>

<style>
.card-details-main {
    /* position: fixed; */
    /* width: 60%; */
    height: 450px;
    margin: 0;
    /* background-color: red; */
    /* top: 0; */
    display: flex;
    justify-content: center;
    /* border-radius: 2px; */
    /* margin: 48px 0 80px; */
    overflow: hidden;
    width: 718px;
    /* z-index: 25; */
    /* left: 30px; */
    /* align-self: center; */
}

.exit-btn {
    height: 48px;
    width: 48px;
}

.card-details-actions{
    flex-direction: column;
}
</style>