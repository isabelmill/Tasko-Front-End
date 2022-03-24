<template>
    <section class="card-details-container flex">
        <button class="exit-btn" @click="closeModal">X</button>
        <section class="card-details-main flex">
            <section class="card-details-title flex">
                <p>{{ card.title }}</p>
            </section>
            <section class="card-details-description">Description</section>
            <section class="card-details-activity">Activity</section>
        </section>
        <section class="card-details-actions flex">
            <button class="card-details-btn" @click="editLabels">Edit labels</button>
            <button class="card-details-btn" @click="changeMembers">Change members</button>
            <button class="card-details-btn" @click="changeCover">Channge cover</button>
            <button class="card-details-btn" @click="moveCard">Move</button>
            <button class="card-details-btn" @click="copyCard">Copy</button>
            <button class="card-details-btn" @click="editDates">Edit dates</button>
            <button class="card-details-btn" @click="deleteCard">Delete</button>
        </section>
    </section>
    <section v-if="shown">
        <component :board="board" :card="card" :groupId="groupId" :is="currModal"></component>
    </section>
</template>

<script>
import labelModal from "./label-modal-cmp.vue";
export default {

    name: 'card-details',
    props: {
        card: {
            type: Object
        },
        groupId: {
            type: String
        },
        board: {
            type: Object
        }
    },
    components: {
        labelModal
    },
    created() {
    },
    data() {
        return {
            currModal: null,
            shown: false,
            distanceX: 0,
            distanceY: 0,
        }
    },
    methods: {
        closeModal() {
            this.$emit('closeDialog')
        },
        editLabels() {
            this.shown = !this.shown
            this.currModal = "labelModal"
        }
    },
    emits: ['closeDialog']

}

</script>

<style>
.card-details-container {
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

.card-details-main {
    flex-direction: column;
    justify-content: space-around;
}

.exit-btn {
    position: reltaive;
    right: 5px;
    top: 5px;
    height: 48px;
    width: 48px;
    border: 0;
    border-radius: 2px;
}

.exit-btn:hover {
    background-color: grey;
}
.card-details-btn {
    margin-bottom: 8px;
    padding: 12px, 6px;
    border: 0;
    border-radius: 2px;
}

.card-details-btn:hover {
    background-color: grey;
}
.card-details-actions {
    flex-direction: column;
}
</style>