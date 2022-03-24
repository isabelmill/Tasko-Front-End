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
                <span class="icon-md icon-close" @click="closeModal"></span>
            </div>
        </div>

        <div class="card-details-list-name">
            <p>in list Group 1</p>
            <!-- <p>{{group.title}}</p> -->
        </div>

        <section class="card-details-actions-container-edit-btns flex">
            <section class="card-details-actions-container">
                <section class="card-details-main flex">
                    <div class="card-details-members-labels-date">
                        <label for>Members</label>
                        <label for>
                            {Labels}
                            <section v-for="label in card.labels" :key="label.id">{{ label.color }}</section>
                        </label>
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

                    <div class="card-details-activity-show-details">
                        <div class="card-details-activity">
                            <span class="icon-xl icon-activity"></span>
                            <h3>Activity</h3>
                        </div>
                        <button>Show details</button>
                    </div>

                    <div class="card-details-input-user-comment">
                        <div class="card-details-user-avatar">
                            <div>I</div>
                        </div>
                        <div class="card-details-input-comment">
                            <input placeholder="Write a comment..." type="text" />
                        </div>
                    </div>
                </section>
            </section>

            <section class="card-details-edit">
                <label for>Add to card</label>

                <button ref="membersBtn" class="card-details-btn" @click="changeMembers">
                    <span class="icon-smd icon-member"></span>
                    Members
                </button>

                <button ref="labelBtn" class="card-details-btn" @click="editLabels">
                    <span class="icon-smd icon-label"></span>
                    Labels
                </button>

                <button ref="checklistBtn" class="card-details-btn">
                    <span class="icon-smd icon-checklist"></span>
                    Checklist
                </button>

                <button ref="datesBtn" class="card-details-btn" @click="editDates">
                    <svg
                        class="date-svg"
                        width="18"
                        height="18"
                        role="presentation"
                        focusable="false"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M13 6C13 5.44772 12.5523 5 12 5C11.4477 5 11 5.44772 11 6V12C11 12.2652 11.1054 12.5196 11.2929 12.7071L13.7929 15.2071C14.1834 15.5976 14.8166 15.5976 15.2071 15.2071C15.5976 14.8166 15.5976 14.1834 15.2071 13.7929L13 11.5858V6Z"
                            fill="currentColor"
                        />
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"
                            fill="currentColor"
                        />
                    </svg>
                    Dates
                </button>

                <button ref="attachmentBtn" class="card-details-btn" @click="editDates">
                    <span class="icon-smd icon-attachment"></span>
                    Attachment
                </button>

                <button ref="coverBtn" class="card-details-btn" @click="changeCover">
                    <span class="icon-smd icon-cover"></span>
                    Cover
                </button>

                <label for>Actions</label>

                <button ref="moveBtn" class="card-details-btn" @click="moveCard">
                    <span class="icon-smd icon-move"></span>
                    Move
                </button>

                <button ref="copyBtn" class="card-details-btn" @click="copyCard">
                    <span class="icon-smd icon-copy"></span>
                    Copy
                </button>

                <!-- <button ref="archiveBtn" class="card-details-btn" >Archive</button> -->

                <button ref="deleteBtn" class="card-details-btn" @click="deleteCard">
                    <span class="icon-smd icon-archive"></span>
                    Delete
                </button>

                <button ref="shareBtn" class="card-details-btn last" @click="deleteCard">
                    <span class="icon-smd icon-share"></span>
                    Share
                </button>
            </section>
        </section>
    </section>
    <section v-if="shown">
        <component
            @cardEdit="editCard"
            @actionsClose="closeMenu"
            :board="board"
            :card="card"
            :group="group"
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
        editCard(card) {
            this.$emit('cardModified', { card, group: this.group })
        }
    },
    emits: ['closeDialog', 'cardModified']

}

</script>

<style>
.card-details-container {
    margin: 0;
    display: flex;
    justify-content: center;
    overflow: hidden;
    /* width: 771px; */
}

.card-details-main {
    flex-direction: column;
    justify-content: space-around;
}

/* .exit-btn {
    position: reltaive;
    right: 5px;
    top: 5px;
    height: 48px;
    width: 48px;
    border: 0;
    border-radius: 2px;
} */

/* .exit-btn:hover {
    background-color: grey;
} */
/* .card-details-btn {
    margin-bottom: 8px;
    padding: 12px, 6px;
    border: 0;
    border-radius: 2px;
} */

/* .card-details-btn:hover {
    background-color: grey;
} */
/* .card-details-actions {
    flex-direction: column;
} */
</style>