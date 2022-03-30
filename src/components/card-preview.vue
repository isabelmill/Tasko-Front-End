<template>
    <section @click.stop.prevent="openDetails">
        <section ref="card-modal" class="card-preview cursor-pointer flex">
            <section v-if="card.cover.type === 'color' && card.cover.size === 'large'">
                <div
                    class="card-cover-color-large cursor-pointer"
                    v-bind:style="{ backgroundColor: card.cover.value }"
                >
                    <div class="card-title">
                        <span
                            :style="(card.cover.value === '#172B4D') ? { color: '#FFFFFF' } : { color: '#172B4D' }"
                        >{{ card.title }}</span>
                    </div>
                </div>
            </section>
            <section v-if="card.cover.type === 'attachment' && card.cover.size === 'large'">
                <div
                    class="card-cover-attachment-large cursor-pointer"
                    v-bind:style="{ backgroundImage: 'url(' + card.cover.value + ')' }"
                >
                    <img :src="card.cover.value" style="visibility:hidden" />
                    <div
                        :class="{ coverlight: card.cover.theme === 'light', coverdark: card.cover.theme === 'dark' }"
                    ></div>
                    <div
                        class="card-title"
                        :class="{ covertitlelight: card.cover.theme === 'light', covertitledark: card.cover.theme === 'dark' }"
                    >
                        <span>{{ card.title }}</span>
                    </div>
                </div>
            </section>
            <section v-if="card.cover.type === 'color' && card.cover.size === 'small'">
                <div
                    class="card-cover-color-small"
                    v-bind:style="{ backgroundColor: card.cover.value }"
                ></div>
            </section>
            <section v-if="card.cover.type === 'attachment' && card.cover.size === 'small'">
                <div
                    class="card-cover-attachment-small"
                    v-bind:style="{ backgroundImage: 'url(' + card.cover.value + ')' }"
                >
                    <img :src="card.cover.value" style="visibility:hidden" />
                </div>
            </section>
            <button class="icon-sm icon-edit" @click.stop.prevent="openMiniEdit($event)"></button>
            <section v-if="card.cover.size !== 'large'" class="card-preview-main">
                <div v-if="card.labels.length && board.labels.length" class="labels">
                    <div
                        v-for="label in card.labels"
                        :key="label"
                        class="label"
                        :class="openLabels"
                        @mouseover="darkenLabels"
                        @mouseleave="lightenLabels"
                        @click.stop.prevent="openAllLabels"
                        :style="(isLabelDark) ? { backgroundColor: lightenDarkenColor(board.labels[board.labels.findIndex(labelToFind => labelToFind.id === label)].color) } : { backgroundColor: board.labels[board.labels.findIndex(labelToFind => labelToFind.id === label)].color }"
                    >{{ board.labels[board.labels.findIndex(labelToFind => labelToFind.id === label)].title }}</div>
                </div>
                <div>
                    <p class="card-title cursor-pointer">{{ card.title }}</p>
                </div>
                <div class="card-bar">
                    <div class="card-bar-icon">
                        <div
                            v-if="card.date"
                            class="date"
                            @click.stop.prevent="onDateClicked"
                            :class="updateDateStyle"
                        >
                            <span class="icon-sm icon-clock-in-date"></span>
                            <!-- <span class="date-txt">{{ setDateFormat(card.date) }}</span> -->
                            <span class="date-txt">{{ setDateFormat }}</span>
                        </div>
                    </div>
                    <div v-if="card.attachments.length" class="attachments">
                        <span class="icon-sm icon-attachment-pre"></span>
                        <span class="attachments-length">{{ card.attachments.length }}</span>
                    </div>
                    <div v-if="card.description" class="description">
                        <span class="icon-sm icon-description"></span>
                    </div>
                    <div class="card-bar-members">
                        <div v-if="card.members.length && board.members.length" class="members">
                            <div
                                class="member"
                                v-for="member in card.members"
                                :key="member._id"
                            >{{ setMemberLetters(member.fullname) }}</div>
                        </div>
                    </div>
                </div>
            </section>
        </section>
        <section
            @click.stop.prevent="closeModal"
            class="mini-edit-modal-main flex"
            v-if="modalOpen"
        >
            <span class="icon-xl icon-close-in-pencil-modal" @click.stop.prevent="closeModal"></span>
            <section
                @click.prevent.stop
                class="mini-edit-modal-second"
                style="position:fixed;"
                :style="{ top: pos.top + 'px', left: pos.left + 'px' }"
            >
                <section class="modal-edit" @click.prevent.stop>
                    <div class="modal-card" @click.prevent.stop>
                        <div
                            v-if="cardToDisplay.cover.type === 'color'"
                            class="mini-edit-cover-color"
                            :style="{ backgroundColor: cardToDisplay.cover.value }"
                        ></div>
                        <div
                            v-if="cardToDisplay.cover.type === 'attachment'"
                            class="mini-edit-cover-attach"
                            :style="{ backgroundImage: 'url(' + cardToDisplay.cover.value + ')' }"
                        >
                            <img :src="cardToDisplay.cover.value" style="visibility:hidden" />
                        </div>
                        <div class="modal-card-main">
                            <div
                                v-if="cardToDisplay.labels.length && cardToDisplay.labels.length"
                                class="labels"
                            >
                                <div
                                    class="label"
                                    v-for="label in cardToDisplay.labels"
                                    :key="label"
                                    :style="{ 'backgroundColor': board.labels[board.labels.findIndex(labelToFind => labelToFind.id === label)].color }"
                                >{{ board.labels[board.labels.findIndex(labelToFind => labelToFind.id === label)].title }}</div>
                            </div>
                            <div>
                                <textarea
                                    @click.stop.prevent="focus()"
                                    name="mini-edit-ta"
                                    style="resize:none"
                                    v-model="cardToDisplay.title"
                                ></textarea>
                            </div>
                            <div class="card-bar">
                                <div class="card-bar-icon">
                                    <div
                                        v-if="card.date"
                                        class="date"
                                        @click.stop.prevent="onDateClicked"
                                        :class="updateDateStyle"
                                    >
                                        <span class="icon-sm icon-clock-in-date"></span>
                                        <span class="date-txt">{{ setDateFormat }}</span>
                                    </div>
                                </div>
                                <div v-if="card.attachments.length" class="attachments">
                                    <span class="icon-sm icon-attachment-pre"></span>
                                    <span class="attachments-length">{{ card.attachments.length }}</span>
                                </div>
                                <div v-if="card.description" class="description">
                                    <span class="icon-sm icon-description"></span>
                                </div>
                                <div class="card-bar-members">
                                    <div
                                        v-if="card.members.length && board.members.length"
                                        class="members"
                                    >
                                        <div
                                            class="member"
                                            v-for="member in card.members"
                                            :key="member._id"
                                        >{{ setMemberLetters(member.fullname) }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button class="mini-edit-save" @click.stop.prevent="saveCard">Save</button>
                    </div>
                </section>
                <section class="modal-actions-btns" @click.prevent.stop>
                    <button @click.stop.prevent="openDetails">
                        <span class="icon-sm icon-card-pen"></span>
                        <p>Open card</p>
                    </button>
                    <button
                        type="button"
                        ref="labelBtn"
                        @click.stop.prevent="openThisModal('labelModal', 'labelBtn')"
                    >
                        <span class="icon-sm icon-label-pen"></span>
                        <p>Edit labels</p>
                    </button>
                    <button
                        type="button"
                        ref="membersBtn"
                        @click.stop.prevent="openThisModal('membersModal', 'membersBtn')"
                    >
                        <span class="icon-sm icon-member-pen"></span>
                        <p>Change members</p>
                    </button>
                    <button
                        type="button"
                        ref="coverBtn"
                        @click.stop.prevent="openThisModal('coverModal', 'coverBtn')"
                    >
                        <span class="icon-sm icon-card-cover-pen"></span>
                        <p>Change cover</p>
                    </button>
                    <button
                        type="button"
                        ref="copyBtn"
                        @click.stop.prevent="openThisModal('copyModal', 'copyBtn')"
                    >
                        <span class="icon-sm icon-card-copy-pen"></span>
                        <p>Copy</p>
                    </button>
                    <button
                        ref="datesBtn"
                        @click.stop.prevent="openThisModal('datesModal', 'datesBtn')"
                    >
                        <span class="icon-sm icon-clock-pen"></span>
                        <p>Edit dates</p>
                    </button>
                    <button ref="deleteBtn" @click.stop.prevent="deleteWarn">
                        <span class="icon-sm icon-delete-pen"></span>
                        <p>Delete</p>
                    </button>
                </section>
            </section>
            <delete-warning
                @click.prevent.stop
                @closeDeleteWarning="closeWarning"
                @deleteConfirmed="deleteCard"
                v-if="warningOpen"
                :title="warningTitle"
                :pos="posOfEditor"
            ></delete-warning>
            <section v-if="isModalShown">
                <component
                    @click.prevent.stop
                    @cardCopySave="CopyNewCard"
                    @boardEdit="editBoard"
                    @cardEdit="showEditedCard"
                    @actionsClose="closeMenu"
                    :board="board"
                    :card="cardToDisplay"
                    :group="group"
                    :pos="posOfEditor"
                    :is="currModal"
                ></component>
            </section>
        </section>
    </section>
</template>

<script>
import { boardService } from "../services/board-service.js";
import { Container, Draggable } from "vue3-smooth-dnd";
import { applyDrag, generateItems } from '../services/dnd-service.js';
import labelModal from "./label-modal-cmp.vue";
import membersModal from "./memebers-modal-cmp.vue";
import datesModal from "./date-modal-cmp.vue";
import deleteWarning from "./delete-warning-modal-cmp.vue";
import coverModal from "./cover-modal-cmp.vue";
import copyModal from "./copy-modal-cmp.vue";
import moment from 'moment'
// import { json } from "stream/consumers";
// import { throws } from "assert";

export default {
    name: 'card-preview',
    props: {
        board: {
            type: Object
        },
        group: {
            type: Object
        },
        card: {
            type: Object,
            required: true,
        },
        isLabelOpen: {
            type: Boolean,
        },
    },
    components: {
        Container,
        Draggable,
        labelModal,
        membersModal,
        datesModal,
        moment,
        coverModal,
        deleteWarning,
        copyModal
        // throws
    },
    data() {
        return {
            currModal: null,
            isModalShown: false,
            pos: 0,
            posOfEditor: 0,
            isLabelDark: false,
            modalOpen: false,
            titleIsOpen: false,
            warningOpen: false,
            warningTitle: '',
            groupToEdit: {},
            cardToDisplay: JSON.parse(JSON.stringify(this.card)),
            cardToEdit: {
                title: "",
            },
            isActionsOpen: false,
            activeComponent: null,
            isLabelClicked: false,
            timeCalc: null,
        }
    },
    created() {
    },
    methods: {
        openThisModal(modalName, ref) {
            if (this.isModalShown === true && modalName === this.currModal) this.isModalShown = false
            else {
                const positionOfBtn = this.$refs[ref].getBoundingClientRect()
                this.posOfEditor = JSON.parse(JSON.stringify(positionOfBtn))
                this.posOfEditor.left -= 5
                this.posOfEditor.bottom -= 4
                this.isModalShown = true
                this.currModal = modalName
            }
        },
        openTitleEdit() {
            // this.titleIsOpen = true;
        },
        editBoard(editedAttribute) {
            this.$emit('boardUpdated', editedAttribute)
        },
        CopyNewCard(copy) {
            this.$emit('copyCardToGroup', copy)
            this.closeModal()
        },
        changeTitle(title) {
            this.cardToEdit = JSON.parse(JSON.stringify(this.card))
            this.cardToEdit.title = title
            this.$emit('editCard', { card: this.cardToEdit, group: this.group })
            this.titleIsOpen = false;
        },
        calcPosOfModal() {
            this.pos = this.$refs['card-modal'].getBoundingClientRect()
        },
        openMiniEdit() {
            this.calcPosOfModal()
            this.cardToDisplay = JSON.parse(JSON.stringify(this.card))
            this.modalOpen = true;
            this.$emit('toggleQuickEdit')
        },
        openDetails() {
            this.modalOpen = false;
            this.isModalShown = false
            this.$emit('openCard', { card: this.card, group: this.group })
        },
        openAllLabels() {
            this.isLabelClicked = !this.isLabelClicked
            this.$emit('openAllLabels', this.isLabelClicked)
        },
        closeModal() {
            this.modalOpen = false
            this.isModalShown = false
            this.$emit('toggleQuickEdit')

        },
        deleteWarn() {
            this.posOfEditor = this.$refs['deleteBtn'].getBoundingClientRect()
            this.warningTitle = 'card'
            this.warningOpen = true
        },
        closeWarning() {
            this.warningOpen = false
        },
        deleteCard() {
            this.groupToEdit = JSON.parse(JSON.stringify(this.group))
            const cardIdx = this.groupToEdit.cards.findIndex(cardToFind => cardToFind.id === this.card.id)
            this.groupToEdit.cards.splice(cardIdx, 1)
            this.$emit('deleteCard', this.groupToEdit)
            this.modalOpen = false;
        },
        showEditedCard(card) {
            this.cardToDisplay = card
        },
        saveCard() {
            this.$emit('editCard', { card: this.cardToDisplay, group: this.group })
            this.isModalShown = false
            this.closeModal()
        },
        setMemberLetters(fullname) {
            const firstLetters = fullname
                .split(' ')
                .map(word => word[0])
                .join('');
            return firstLetters.toUpperCase()
        },
        closeMenu() {
            this.isModalShown = false
        },
        onDateClicked() {
            this.cardToEdit = JSON.parse(JSON.stringify(this.card))
            this.cardToEdit.isComplete = !this.cardToEdit.isComplete
            this.$emit('editCard', { card: this.cardToEdit, group: this.group })
        },
        darkenLabels() {
            this.isLabelDark = true
        },
        lightenLabels() {
            this.isLabelDark = false
        },
        lightenDarkenColor(colorCode) {
            if (colorCode === '#61BD4F') return '#519839'
            if (colorCode === '#F2D600') return '#d9b51c'
            if (colorCode === '#FF9F1A') return '#cd8313'
            if (colorCode === '#EB5A46') return '#b04632'
            if (colorCode === '#C377E0') return '#89609e'
            if (colorCode === '#0079BF') return '#055a8c'
            if (colorCode === '#00C2E0') return '#0098b7'
            if (colorCode === '#51E898') return '#4bbf6b'
            if (colorCode === '#FF78CB') return '#c9558f'
            if (colorCode === '#344563') return '#091e42'
        }
    },
    computed: {
        openLabels() {
            return { labelOpen: this.isLabelOpen };
        },
        setDateFormat() {
            const timeCalc = (Date.now() - this.card.date)
            this.timeCalc = timeCalc
            const dt = new Date(this.card.date)
            const date = Intl.DateTimeFormat('en-Us', { month: 'short', day: 'numeric' }).format(dt)
            return date
        },
        updateDateStyle() {
            return { dateUncompleted: !this.cardToDisplay.isComplete, dateCompleted: this.cardToDisplay.isComplete, datePast: this.timeCalc > 0 };
        },

    },
    emits: ['copyCardToGroup', 'openCard', 'editCard', 'openAllLabels', 'deleteCard', 'boardUpdated', 'toggleQuickEdit'],
}
</script>