<template>
    <section>
        <section
            v-if="card.cover.value"
            class="coverOfCardDetails"
            ref="headerCover"
            :class="{ color: card.cover.type === 'color', attachmentofdetails: card.cover.type === 'attachment' }"
            v-bind:style="[(card.cover.type === 'color') ? { backgroundColor: card.cover.value } : { backgroundImage: 'url(' + card.cover.value + ')' }]"
        ></section>
        <section class="card-details-container flex">
            <div class="card-details-header">
                <div class="card-details-header-icon">
                    <span class="icon-lg icon-card"></span>
                    <div class="card-details-title flex">
                        <p>{{ card.title }}</p>
                    </div>
                </div>
                <div class="card-details-icon">
                    <span class="icon-md icon-closed" @click.stop.prevent="closeModal"></span>
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
                                            <div
                                                class="member"
                                            >{{ setMemberLetters(member.fullname) }}</div>
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
                                            <p>
                                                {{
                                                    board.labels[board.labels.findIndex(labelToFind => labelToFind.id ===
                                                        label)].title
                                                }}
                                            </p>
                                        </div>
                                    </section>
                                </div>
                            </div>

                            <div class="card-detail-date-container-main">
                                <label v-if="card.date" for>Due date</label>
                                <div class="card-details-dates-container" v-if="card.date" for>
                                    <section class="card-details-dates">
                                        <div
                                            v-if="!card.isComplete"
                                            @click.stop.prevent="toggleCardComplete"
                                            class="checkbox"
                                        ></div>

                                        <img
                                            v-if="card.isComplete"
                                            @click.stop.prevent="toggleCardComplete"
                                            class="done-img"
                                            src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23fff' viewBox='-3 -4 16 16'%3E%3Cpath d='M1.49 3.215a.667.667 0 0 0-.98.903l2.408 2.613c.358.351.892.351 1.223.02l.243-.239a1689.645 1689.645 0 0 0 2.625-2.589l.027-.026a328.23 328.23 0 0 0 2.439-2.429.667.667 0 1 0-.95-.936c-.469.476-1.314 1.316-2.426 2.417l-.027.026a1368.126 1368.126 0 0 1-2.517 2.482L1.49 3.215z'/%3E%3C/svg%3E"
                                            alt
                                        />
                                        <!-- <input @click="toggleCardComplete"  type="checkbox" /> -->

                                        <div class="card-details-date">
                                            <p>{{ setDateFormat(card.date) }} at {{ setHourFormat(card.date) }}</p>

                                            <span
                                                v-if="card.date < Date.now() && !card.isComplete"
                                                class="overdue"
                                            >overdue</span>
                                            <span v-if="card.isComplete" class="complete">complete</span>

                                            <svg
                                                class="down"
                                                width="20"
                                                height="20"
                                                role="presentation"
                                                focusable="false"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>

                        <!-- Description adding area  -->
                        <section v-clickOutside="closeTextArea">
                            <div class="card-details-description">
                                <span class="icon-lg icon-desc"></span>
                                <h3>Description</h3>
                                <button
                                    @click.stop.prevent="openTextArea"
                                    v-if="card.description"
                                >Edit</button>
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
                                    @click.stop.prevent="openTextArea"
                                    class="open-input-btn"
                                >Add a more detailed description...</div>
                                <div
                                    class="card-description"
                                    @click.stop.prevent="openTextArea"
                                    v-if="!showDesc"
                                >
                                    {{
                                        card.description
                                    }}
                                </div>
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
                                    <button @click.stop.prevent="updateCardDesc">Save</button>
                                    <span
                                        @click.stop.prevent="closeTextArea"
                                        class="icon-xl icon-closed"
                                    ></span>
                                </div>
                            </div>
                        </section>

                        <!-- Attachments area  -->
                        <div
                            v-if="isLoading || card.attachments.length > 0"
                            class="card-details-activity-show-attachments"
                        >
                            <div class="card-details-attachments">
                                <span class="icon-lg icon-attachment"></span>
                                <h3>Attachments</h3>
                            </div>
                            <div v-if="isLoading" class="loading-attachment">
                                <div class="loading-container">
                                    <img class="loading-svg"
                                        src="https://res.cloudinary.com/dw85wdwsw/image/upload/v1648563503/dlcjcnpz0afvbj2mgrqj.svg"
                                    />
                                    processing...
                                </div>
                            </div>
                            <div v-if="card.attachments.length">
                                <div
                                    v-for="attachment in card.attachments"
                                    class="card-attachments-area"
                                    :key="attachment.link"
                                >
                                    <img
                                        @vnode-mounted="attachmentBGC($event)"
                                        :src="attachment.link"
                                        alt
                                    />
                                    <div class="card-attachment-area-main">
                                        <div class="card-attachment-area-header">
                                            <p>{{ attachment.name }}</p>
                                            <span class="icon-sm icon-link-arrow"></span>
                                        </div>
                                        <div class="attachment-area-body flex">
                                            <p>When added... -</p>
                                            <a>Comment</a>
                                            <span>-</span>
                                            <a>Delete</a>
                                            <span>-</span>
                                            <a>Edit</a>
                                        </div>
                                        <div class="attachment-area-footer">
                                            <span class="icon-sm icon-cover"></span>
                                            <p>Make cover</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Activity Area  -->
                        <div class="card-details-activity-show-details">
                            <div class="card-details-activity">
                                <span class="icon-lg icon-activity"></span>
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
                                @click.stop.prevent="showInput = true"
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

                    <button
                        ref="membersBtn"
                        class="card-details-btn"
                        @click.stop.prevent="changeMembers"
                    >
                        <span class="icon-sm icon-member"></span>
                        Members
                    </button>

                    <button
                        ref="labelBtn"
                        class="card-details-btn"
                        @click.stop.prevent="editLabels"
                    >
                        <span class="icon-sm icon-label"></span>
                        Labels
                    </button>

                    <button ref="checklistBtn" class="card-details-btn">
                        <span class="icon-sm icon-checklist"></span>
                        Checklist
                    </button>

                    <button ref="datesBtn" class="card-details-btn" @click.stop.prevent="editDates">
                        <svg
                            class="date-svg"
                            width="16"
                            height="16"
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

                    <button
                        ref="attachmentBtn"
                        class="card-details-btn"
                        @click.stop.prevent="addAttachment"
                    >
                        <span class="icon-sm icon-attachment"></span>
                        Attachment
                    </button>

                    <button
                        ref="coverBtn"
                        class="card-details-btn"
                        @click.stop.prevent="changeCover"
                    >
                        <span class="icon-sm icon-cover"></span>
                        Cover
                    </button>

                    <label for>Actions</label>

                    <button ref="moveBtn" class="card-details-btn" @click.stop.prevent="moveCard">
                        <span class="icon-sm icon-move"></span>
                        Move
                    </button>

                    <button ref="copyBtn" class="card-details-btn" @click.stop.prevent="copyCard">
                        <span class="icon-sm icon-copy"></span>
                        Copy
                    </button>

                    <button
                        ref="shareBtn"
                        class="card-details-btn last"
                        @click.stop.prevent="shareCard"
                    >
                        <span class="icon-sm icon-share"></span>
                        Share
                    </button>

                    <button
                        ref="deleteBtn"
                        class="card-details-btn"
                        @click.stop.prevent="deleteWarn"
                    >
                        <span class="icon-sm icon-archive"></span>
                        Delete
                    </button>
                </section>
            </section>
        </section>
        <section v-if="shown">
            <component
                @uploadComplete="notifyComplete"
                @uploading="notifyUploading"
                @boardEdit="editBoard"
                @cardEdit="editCard"
                @actionsClose="closeMenu"
                @cardCopySave="sendCardCopyTo"
                :board="board"
                :card="card"
                :group="group"
                :pos="pos"
                :is="currModal"
            ></component>
        </section>
        <delete-warning
            @closeDeleteWarning="closeWarning"
            @deleteConfirmed="deleteCard"
            v-if="warningOpen"
            :title="warningTitle"
            :pos="pos"
        ></delete-warning>
    </section>
</template>

<script>
import labelModal from "./label-modal-cmp.vue";
import memebersModal from "./memebers-modal-cmp.vue";
import datesModal from "./date-modal-cmp.vue";
import coverModal from "./cover-modal-cmp.vue";
import attachmentModal from "./attachment-modal-cmp.vue";
import deleteWarning from "./delete-warning-modal-cmp.vue";
import FastAverageColor from 'fast-average-color';
import copyModal from "./copy-modal-cmp.vue";

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
        datesModal,
        deleteWarning,
        coverModal,
        attachmentModal,
        copyModal,
    },
    created() {
        this.description = this.card.description
    },
    mounted() {

    },
    data() {
        return {
            currModal: null,
            shown: false,
            warningOpen: false,
            warningTitle: '',
            pos: 0,
            showInput: false,
            showDesc: false,
            description: '',
            isLoading: false
        }
    },
    computed: {
        cardToEdit() {
            return JSON.parse(JSON.stringify(this.card))
        },
        async backgroundCoverColor() {
            if (this.card.cover.type === 'attachment') {
                const fac = new FastAverageColor()
                try {
                    const color = await fac.getColorAsync(this.card.cover.value)
                    this.$refs['headerCover'].style.backgroundColor = color.hex
                    return color.hex
                }
                catch (err) {
                    console.log(err)
                }
            }
        }
    },
    watch: {
        backgroundCoverColor: {
            async handler(newColor) {
                this.$refs['headerCover'].style.backgroundColor = newColor
            }
        }
    },
    methods: {
        setMemberLetters(fullname) {
            const firstLetters = fullname
                .split(' ')
                .map(word => word[0])
                .join('');
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
        changeCover() {
            this.pos = this.$refs['coverBtn'].getBoundingClientRect()
            this.shown = true
            this.currModal = "coverModal"
        },
        addAttachment() {
            this.pos = this.$refs['attachmentBtn'].getBoundingClientRect()
            this.shown = true
            this.currModal = "attachmentModal"
        },
        editDates() {
            this.pos = this.$refs['datesBtn'].getBoundingClientRect()
            this.currModal = "datesModal"
            this.shown = true
        },
        editCard(card) {
            this.$emit('cardModified', { card, group: this.group })
        },
        async attachmentBGC(el) {
            console.log(el)
            const fac = new FastAverageColor()
            const img = el.props.src
            // var color= '';\
            try {
                const color = await fac.getColorAsync(img)
                console.log(color)
                el.props['background-color'] = color.hex
            }
            catch (err) {
                console.log(err)
            }
            // // console.log(color.hex)
            //     return color

        },
        copyCard() {
            this.pos = this.$refs['copyBtn'].getBoundingClientRect()
            this.shown = true
            this.currModal = "copyModal"
        },
        sendCardCopyTo(copy) {
            this.$emit('saveCopy', copy)
        },
        deleteWarn() {
            this.pos = this.$refs['deleteBtn'].getBoundingClientRect()
            this.warningTitle = 'card'
            this.warningOpen = true
        },
        closeWarning() {
            this.warningOpen = false
        },
        deleteCard() {
            this.$emit('deleteCardFromGroup', { card: this.cardToEdit, group: this.group })
            this.closeModal()
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
        setDateFormat(timestamp) {
            let dt = new Date(timestamp)
            const date = Intl.DateTimeFormat('en-Us', { month: 'short', day: 'numeric' }).format(dt)
            return date
        },
        setHourFormat(timestamp) {
            let hr = new Date(timestamp)
            const hour = hr.toLocaleTimeString().replace(/(.*)\D\d+/, '$1');
            return hour
        },
        toggleCardComplete() {
            this.cardToEdit.isComplete = !this.cardToEdit.isComplete
            this.$emit('cardModified', { card: this.cardToEdit, group: this.group })
        },
        notifyUploading() {
            this.isLoading = true
        },
        notifyComplete() {
            this.isLoading = false
        },
    },
    emits: ['cardCopySave', 'closeDialog', 'cardModified', 'boardModified', 'deleteCardFromGroup', 'saveCopy']
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
</style>