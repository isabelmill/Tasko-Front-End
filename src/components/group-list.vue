<!-- card preview inside group list -->
<template >
    <Container
        class="group-list-main scroll-groups"
        orientation="horizontal"
        @drop="onGroupDrop($event)"
        drag-handle-selector=".group-preview-main"
        @drag-start="dragStart"
        :drop-placeholder="upperDropPlaceholderOptions"
    >
        <Draggable v-for="group in groups" :key="group.id" class="group-preview-main">
            <!-- <span class="column-drag-handle">&#x2630;</span> -->
            <toggle-input-cmp
                class="title"
                @groupDelete="deleteGroup"
                @titleChange="changeTitle"
                :title="group.title"
                :id="group.id"
            ></toggle-input-cmp>
            <section class="scroller-group">
                <card-preview
                    @openCard="openCardModal"
                    v-for="card in group.cards"
                    :key="card.id"
                    :group="group"
                    :card="card"
                    :board="board"
                ></card-preview>
            </section>
            <add-card-cmp @cardAdd="addNewCard" :group="group"></add-card-cmp>
        </Draggable>
            <div class="add-new-group" :style="show ? { 'height': '100px' } : null">
                <button class="add-another-list-btn" v-if="!show" @click="show = true">
                    <span class="icon-sm icon-add-light"></span>Add another list
                </button>
                <div v-clickOutside="close" v-if="show" class="add-new-group-in">
                    <textarea
                        @keyup.enter="addNewGroup"
                        placeholder="Enter list title..."
                        type="text"
                        v-model="newGroup.title"
                    />
                    <div class="controls-add-list">
                        <button class="btn-add-card-in" @click="addNewGroup">Add List</button>
                        <span class="icon-lg icon-close" @click="show = false"></span>
                    </div>
                </div>
            </div>
    </Container>
</template>

<script>
import cardPreview from "./card-preview.vue";
import toggleInputCmp from "./toggle-input-cmp.vue";
import addCardCmp from "./add-card-cmp.vue";
import { Container, Draggable } from "vue3-smooth-dnd";
import { applyDrag, generateItems } from '../services/dnd-service.js'

export default {
    name: "group-list",
    components: {
        cardPreview,
        toggleInputCmp,
        addCardCmp,
        Container,
        Draggable,
    },
    props: {
        groups: {
            type: Array
        },
        newGroup: {
            type: Object
        },
        board: {
            type: Object
        },
    },
    data() {
        return {
            groupToEdit: null,
            titleIsOpen: false,
            show: false,
            groupToDisplay: {
                title: ""
            },
            show: false,
            upperDropPlaceholderOptions: {
                className: 'cards-drop-preview',
                animationDuration: '150',
                showOnTop: true
            },
            dropPlaceholderOptions: {
                className: 'drop-preview',
                animationDuration: '150',
                showOnTop: true
            }
        };
    },
    created() {
    },
    methods: {
        changeTitle({ txt, id }) {
            this.groupToEdit = JSON.parse(JSON.stringify(this.groups.find(group => group.id === id)))
            this.groupToEdit.title = txt
            this.$emit('groupUpdated', this.groupToEdit)
            this.groupToEdit = null
            this.titleIsOpen = false;
        },
        addNewCard({ newCard, group }) {
            console.log(group)
            this.groupToEdit = JSON.parse(JSON.stringify(this.groups.find(groupToCheck => groupToCheck.id === group.id)))
            this.groupToEdit.cards.push(newCard)
            this.$emit('groupUpdated', this.groupToEdit)
            this.groupToEdit = null
        },
        openCardModal(info) {
            this.$emit('openCardDetails', info)
        },
        deleteGroup(groupId) {
            this.$emit('removeGroup', groupId)
        },
        close() {
            this.show = false;
            this.newGroup.title = ""
        },
        addNewGroup() {
            this.$emit('addGroup', this.newGroup)
        },
        onGroupDrop(dropResult) {
            const boardToEdit = Object.assign({}, this.board)
            boardToEdit.groups = applyDrag(boardToEdit.groups, dropResult)
            this.$emit('groupDnd', boardToEdit)
        },
        dragStart() {
            console.log('drag started')
        },
    },
    mounted() {
    },
    emits: ['openCardDetails', 'removeGroup', 'groupUpdated', 'addGroup','groupDnd']

}
</script>

<style>
</style>