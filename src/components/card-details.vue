<template>
    <section class="card-details-container flex">
        <!-- Header  -->
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
            <p>in list {{ group.title }}</p>
        </div>

        <!-- Lables members and date adding area  -->
        <section class="card-details-actions-container-edit-btns flex">
            <section class="card-details-actions-container">
                <section class="card-details-main flex">
                    <div class="card-details-members-labels-date">
                        <div class="card-detail-member-container-main">
                            <label v-if="card.members.length > 0" for>Members</label>
                            <div
                                class="card-details-members-container"
                                v-if="card.members.length > 0"
                                for
                            >
                                <section
                                    class="card-details-members"
                                    v-for="member in card.members"
                                    :key="member._id"
                                >
                                    <div class="card-details-member-img">
                                        <div class="member">{{setMemberLetters(member.fullname)}}</div>
                                    </div>
                                    
                                </section>
                            </div>
                        </div>

                        <div class="card-detail-labels-container-main">
                            <label v-if="card.labels.length > 0" for>Labels</label>
                            <div
                                class="card-details-labels-container"
                                v-if="card.labels.length > 0"
                                for
                            >
                                <section
                                    class="card-details-labels"
                                    v-for="label in card.labels"
                                    :key="label"
                                >
                                    <div
                                        class="card-details-label"
                                        :style="{ 'backgroundColor': board.labels[board.labels.findIndex(labelToFind => labelToFind.id === label)].color }"
                                    >
                                        <p>{{ board.labels[board.labels.findIndex(labelToFind => labelToFind.id === label)].title }}</p>
                                    </div>
                                </section>
                            </div>
                        </div>

                        <label for>Due date</label>
                    </div>

                    <!-- Description adding area  -->
                    <section v-clickOutside="closeTextArea">
                        <div class="card-details-description">
                            <span class="icon-xl icon-desc"></span>
                            <h3>Description</h3>
                            <button @click="openTextArea" v-if="card.description">Edit</button>
                        </div>

                        <div
                            class="card-details-input"
                            :style="showDesc ? {
                                'padding-left': '42px',
                                'padding-top': '18px'
                            } : null"
                        >
                            <div
                                v-if="!showDesc && !card.description"
                                @click="openTextArea"
                                class="open-input-btn"
                            >Add a more detailed description...</div>
                            <div
                                class="card-description"
                                @click="openTextArea"
                                v-if="!showDesc"
                            >{{ card.description }}</div>
                            <textarea
                                v-focus
                                placeholder="Add a more detailed description..."
                                v-if="showDesc"
                                v-model="description"
                                name="description"
                                id
                                cols="60"
                                rows="4"
                            ></textarea>
                            <div v-if="showDesc" class="card-details-text-add-btn">
                                <button @click="updateCardDesc">Save</button>
                                <span @click="closeTextArea" class="icon-xl icon-close"></span>
                            </div>
                        </div>
                    </section>

                    <div class="card-details-activity-show-details">
                        <div class="card-details-activity">
                            <span class="icon-xl icon-activity"></span>
                            <h3>Activity</h3>
                        </div>
                        <button>Show details</button>
                    </div>

                    <!-- comment adding area  -->
                    <div class="card-details-input-user-comment">
                        <div class="card-details-user-avatar member">
                            <div>AB</div>
                        </div>
                        <div
                            @click="showInput = true"
                            v-clickOutside="closeInput"
                            class="card-details-input-comment"
                            :style="showInput ? {
                                'padding-bottom': '56px',
                                'margin-top': '38px', 'padding-top': '18px',
                                'cursor': 'default'
                            } : null"
                        >
                            <div
                                class="input-icon-btns"
                                :style="showInput ? { 'padding-top': '50px' } : null"
                            >
                                <input
                                    :style="showInput ? null : { 'padding-top': '10px' }"
                                    placeholder="Write a comment..."
                                    type="text"
                                />
                                <div class="card-details-all-btns">
                                    <button v-if="showInput" class="card-details-save-btn">Save</button>
                                    <div
                                        v-if="showInput"
                                        :style="showInput ? { 'padding-top': '20px' } : null"
                                        class="icon-btns-inside-input"
                                    >
                                        <span class="icon-smd icon-attachment"></span>
                                        <span class="icon-smd icon-shtrudel"></span>
                                        <span class="icon-smd icon-smiley"></span>
                                        <span class="icon-smd icon-card"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </section>

            <!-- the side-bar with all btn actions and editing  -->
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
            @boardEdit="editBoard"
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
import memebersModal from "./memebers-modal-cmp.vue";
import dateModal from "./date-modal-cmp.vue";
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
        labelModal,
        memebersModal,
        dateModal
    },
    created() {
        this.description = this.card.description
    },
    data() {
        return {
            currModal: null,
            shown: false,
            pos: 0,
            showInput: false,
            showDesc: false,
            description: ''
        }
    },
    computed: {
        cardToEdit() {
            return JSON.parse(JSON.stringify(this.card))
        }
    },
    methods: {
        setMemberLetters(fullname) {
            const firstLetters = fullname
                .split(' ')
                .map(word => word[0])
                .join('');
            console.log(firstLetters)
            return firstLetters.toUpperCase()
        },
        closeModal() {
            this.$emit('closeDialog')
        },
        closeMenu() {
            this.shown = false;
        },
        changeMembers() {
            this.pos = this.$refs['membersBtn'].getBoundingClientRect()
            this.shown = true
            this.currModal = "memebersModal"
        },
        editLabels() {
            this.pos = this.$refs['labelBtn'].getBoundingClientRect()
            this.shown = true
            this.currModal = "labelModal"
        },
        editDates() {
            this.pos = this.$refs['datesBtn'].getBoundingClientRect()
            this.currModal = "dateModal"
            this.shown = true
        },
        editCard(card) {
            this.$emit('cardModified', { card, group: this.group })
        },
        closeInput() {
            this.showInput = false
        },
        closeTextArea() {
            this.showDesc = false
        },
        openTextArea() {
            this.showDesc = true
        },
        editBoard(editedAttribute) {
            this.$emit('boardModified', editedAttribute)
        },
        updateCardDesc() {
            this.cardToEdit.description = this.description
            this.$emit('cardModified', { card: this.cardToEdit, group: this.group })
            this.showDesc = false
        },

    },
    emits: ['closeDialog', 'cardModified', 'boardModified']

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