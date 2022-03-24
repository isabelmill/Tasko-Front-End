<template>
    <section class="card-details-container flex">
        <div class="card-details-header">
            <div class="card-details-header-icon">
                <span class="icon-xl icon-card"></span>
                <div class="card-details-title flex">
                    <p>{{ card.title }}</p>
                </div>
            </div>
            <div class="card-details-icon">
                <span class="icon-lg icon-close" @click="closeModal"></span>
            </div>
        </div>

        <div class="card-details-list-name">
            <p>in list Group 1</p>
        </div>

        <section class="card-details-actions-container">
            <section class="card-details-main flex">
                <div class="card-details-members-labels-date">
                    <label for>Members</label>
                    <label for>Labels</label>
                    <label for>Due date</label>
                </div>

                <div class="card-details-description">
                    <span class="icon-xl icon-desc"></span>
                    <h3>Description</h3>
                </div>

                <div class="card-details-input">
                    <div class="open-input-btn">Add a more detailed description...</div>
                    <!-- <input type="text" /> -->
                </div>

                <div class="card-details-activity">
                    <span class="icon-xl icon-activity"></span>
                    <h3>Activity</h3>
                </div>
            </section>
        </section>

        <section class="card-details-actions flex">
            <button ref="labelBtn" class="card-details-btn" @click="editLabels">Edit labels</button>
            <button ref="membersBtn" class="card-details-btn" @click="changeMembers">Change members</button>
            <button ref="coverBtn" class="card-details-btn" @click="changeCover">Channge cover</button>
            <button ref="moveBtn" class="card-details-btn" @click="moveCard">Move</button>
            <button ref="copyBtn" class="card-details-btn" @click="copyCard">Copy</button>
            <button ref="datesBtn" class="card-details-btn" @click="editDates">Edit dates</button>
            <button ref="deleteBtn" class="card-details-btn" @click="deleteCard">Delete</button>
        </section>
    </section>
    <section v-if="shown">
        <component
            @cardEdit="editCard"
            @actionsClose="closeMenu"
            :board="board"
            :card="card"
            :groupId="groupId"
            :pos="pos"
            :is="currModal"
        ></component>
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
        group: {
            type: Object
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
            pos: 0,
        }
    },
    methods: {
        closeModal() {
            this.$emit('closeDialog')
        },
        closeMenu() {
            this.shown = false;
        },
        editLabels() {
            this.pos = this.$refs['labelBtn'].getBoundingClientRect()
            this.shown = !this.shown
            this.currModal = "labelModal"
        },
        cardEdit(card) {
            this.$emit('cardModified', { card, groupId: this.group.id })
        }
    },
    emits: ['closeDialog', 'cardModified']

}

</script>

<style>
.card-details-container {
    /* position: fixed; */
    /* width: 60%; */
    /* height: 450px; */
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